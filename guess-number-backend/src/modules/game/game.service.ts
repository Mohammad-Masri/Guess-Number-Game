/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
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

@Injectable()
export class GameService {
  INIT_POINT = 1000;

  constructor(
    @InjectModel(ModuleNames.GAME)
    private readonly GameModel: Model<IGame>,
    private readonly gamePlayerService: GamePlayerService,
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService,
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
}
