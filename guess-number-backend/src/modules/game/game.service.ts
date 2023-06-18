/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames, MultiplierValues } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IGame from './game.interface';
import IPlayer from '../player/player.interface';
import { GamePlayerService } from '../game-player/game-player.service';
import IGamePlayer from '../game-player/game-player.interface';
import { generateRandomString } from 'src/utils/helpers/string';
import { PlayerService } from '../player/player.service';
import { GameResponse } from './game.dto';
import { RoundService } from '../round/round.service';
import { ServerError } from 'src/utils/config/server-response.config';
import { getRandomNumberBetweenTwoNumber } from 'src/utils/helpers/number';
import { PlayerGuessService } from '../player-guess/player-guess.service';
import IRound from '../round/round.interface';

@Injectable()
export class GameService {
  INIT_POINT = 1000;

  constructor(
    @InjectModel(ModuleNames.GAME)
    private readonly GameModel: Model<IGame>,
    private readonly gamePlayerService: GamePlayerService,
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService,
    private readonly playerGuessService: PlayerGuessService,
  ) {}

  async findOne(additional_where_cluster: any = {}) {
    return await this.GameModel.findOne(additional_where_cluster);
  }

  async findByGameId(game_id: string) {
    return await this.findOne({ game_id });
  }

  async checkFindByGameId(game_id: string) {
    const game = await this.findByGameId(game_id);

    if (game == null) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        `game with this game id ${game_id} not found`,
      );
    }
    return game;
  }

  async create(players: IPlayer[]) {
    const game_players: IGamePlayer[] = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const rank = i + 1;
      const game_player = await this.gamePlayerService.create(
        player,
        rank,
        this.INIT_POINT,
      );
      game_players.push(game_player);
    }

    const new_game = new this.GameModel({
      players: game_players,
      game_id: generateRandomString(),
    });

    return await new_game.save();
  }

  async makeGameResponse(game: IGame) {
    const human_game_player = await this.gamePlayerService.getHumanPlayerInGame(
      game,
    );
    const you_player_response = await this.playerService.makeYouPlayerResponse(
      human_game_player,
    );

    const all_players_in_game = await this.playerService.getAllPlayersInTheGame(
      game,
    );

    const all_players_in_game_response =
      await this.playerService.makePlayersResponse(all_players_in_game);

    const current_round = await this.roundService.getCurrentRoundInGame(game);

    const current_round_response = await this.roundService.makeRoundResponse(
      current_round,
      all_players_in_game_response,
    );

    const players_result =
      await this.gamePlayerService.makePlayersResultInGameResponse(
        game,
        all_players_in_game_response,
      );

    return new GameResponse(
      game,
      you_player_response,
      current_round_response,
      players_result,
    );
  }

  async generateNewRoundMultiplier() {
    return await getRandomNumberBetweenTwoNumber(
      MultiplierValues.MIN,
      MultiplierValues.MAX,
    );
  }

  async recalculatePlayerRanks(game: IGame) {
    const sorted_game_players = game.players.sort((a, b) => b.score - a.score);
    sorted_game_players.forEach((game_player, index) => {
      game_player.rank = index + 1;
    });
    game.players = sorted_game_players;
    return game;
  }

  async registerGameRound(game: IGame, round: IRound) {
    const round_multiplier = round.round_multiplier;
    for (let i = 0; i < game.players.length; i++) {
      const game_player = game.players[i];
      const player_guess = round.player_guesses.find(
        (pg) => pg.player.id + '' == game_player.player.id + '',
      );
      if (player_guess != null) {
        game_player.points -= player_guess.points;
        if (player_guess.multiplier <= round_multiplier) {
          const score = player_guess.points * player_guess.multiplier;
          game_player.points += score;
          game_player.score = score;
        }
      }
    }

    return await this.recalculatePlayerRanks(game);
  }

  async startNewGameRound(
    game: IGame,
    human_game_player: IGamePlayer,
    human_game_player_points: number,
    human_game_player_multiplier: number,
  ) {
    // check human player has this amount of points
    await this.gamePlayerService.checkPlayerHasPoints(
      human_game_player,
      human_game_player_points,
    );

    const round_multiplier = await this.generateNewRoundMultiplier();

    const human_player_guess = await this.playerGuessService.create(
      human_game_player.player,
      human_game_player_multiplier,
      human_game_player_points,
    );

    const cpu_game_players = await this.gamePlayerService.getCPUPlayersInGame(
      game,
    );

    const cpu_player_guesses =
      await this.playerGuessService.createRandomGuessesForPlayers(
        cpu_game_players,
      );

    const player_guesses = [human_player_guess, ...cpu_player_guesses];

    const round = await this.roundService.create(
      player_guesses,
      round_multiplier,
    );

    game = await this.registerGameRound(game, round);

    game.rounds.push(round);

    return await (game as any).save();
  }
}
