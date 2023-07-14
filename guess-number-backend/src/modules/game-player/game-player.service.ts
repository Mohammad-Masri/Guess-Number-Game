/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames, PlayerTypes } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IGamePlayer from './game-player.interface';
import IPlayer from '../player/player.interface';
import IGame from '../game/game.interface';
import { PlayerResponse } from '../player/player.dto';
import { PlayerResultInGameResponse } from './game-player.dto';
import { ServerError } from 'src/utils/config/server-response.config';

@Injectable()
export class GamePlayerService {
  constructor(
    @InjectModel(ModuleNames.GAME_PLAYER)
    private readonly GamePlayerModel: Model<IGamePlayer>,
  ) {}

  async create(player: IPlayer, rank: number, points: number) {
    const new_game_player = new this.GamePlayerModel({
      player,
      rank,
      points,
    });
    return new_game_player;
  }

  async getHumanPlayerInGame(game: IGame) {
    const player = game.players.find((p) => p.player.type == PlayerTypes.HUMAN);
    return player;
  }

  async getCPUPlayersInGame(game: IGame) {
    const players = game.players.filter(
      (p) => p.player.type == PlayerTypes.CPU,
    );
    return players;
  }

  async makePlayerResultInGameResponse(game: IGame, player: PlayerResponse) {
    const game_player = game.players.find((p) => p.player.id + '' == player.id);
    return new PlayerResultInGameResponse(game_player, player);
  }

  async makePlayersResultInGameResponse(
    game: IGame,
    players: PlayerResponse[],
  ) {
    const game_players_result: PlayerResultInGameResponse[] = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const game_player_result = await this.makePlayerResultInGameResponse(
        game,
        player,
      );
      // sort insert
      const index = game_players_result.findIndex(
        (gpr) => gpr.rank > game_player_result.rank,
      );
      if (index === -1) {
        game_players_result.push(game_player_result);
      } else {
        game_players_result.splice(index, 0, game_player_result);
      }
    }
    return game_players_result;
  }

  async checkPlayerHasPoints(game_player: IGamePlayer, points: number) {
    if (game_player.points < points) {
      throw new ServerError(
        HttpStatus.BAD_REQUEST,
        `you don't have ${points} points, your points is ${game_player.points}`,
      );
    }
  }
}
