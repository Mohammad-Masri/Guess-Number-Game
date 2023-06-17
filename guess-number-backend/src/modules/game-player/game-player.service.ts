/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames, PlayerTypes } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IGamePlayer from './game-player.interface';
import IPlayer from '../player/player.interface';
import IGame from '../game/game.interface';

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
}
