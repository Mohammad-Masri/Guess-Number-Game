/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CPUPlayers,
  ModuleNames,
  PlayerTypes,
} from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IPlayer from './player.interface';
import IGame from '../game/game.interface';
import { PlayerResponse, YouPlayerResponse } from './player.dto';
import IGamePlayer from '../game-player/game-player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(ModuleNames.PLAYER)
    private readonly PlayerModel: Model<IPlayer>,
  ) {}

  private async findOne(additional_where_cluster: any = {}) {
    return await this.PlayerModel.findOne(additional_where_cluster);
  }

  async findByUsername(username: string, additional_where_cluster: any = {}) {
    return await this.findOne({ username, ...additional_where_cluster });
  }

  async create(username: string, type: PlayerTypes) {
    const new_player = new this.PlayerModel({
      username,
      type,
    });

    return await new_player.save();
  }

  async findByUsernameOrCreate(
    username: string,
    type: PlayerTypes = PlayerTypes.HUMAN,
  ) {
    let player = await this.findByUsername(username, { type });
    if (player == null) {
      player = await this.create(username, type);
    }

    return player;
  }

  async createDummyCPUPlayers() {
    const players: IPlayer[] = [];
    for (let i = 0; i < CPUPlayers.length; i++) {
      const CPUPlayer = CPUPlayers[i];
      const player = await this.findByUsernameOrCreate(
        CPUPlayer.username,
        PlayerTypes.CPU,
      );
      players.push(player);
    }
    return players;
  }

  async makeYouPlayerResponse(game_player: IGamePlayer) {
    return new YouPlayerResponse(game_player);
  }

  async makePlayerResponse(player: IPlayer) {
    return new PlayerResponse(player);
  }

  async makePlayersResponse(players: IPlayer[]) {
    const players_response: PlayerResponse[] = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const player_response = await this.makePlayerResponse(player);
      players_response.push(player_response);
    }
    return players_response;
  }

  async getAllPlayersInTheGame(game: IGame) {
    const players: IPlayer[] = [];
    for (let i = 0; i < game.players.length; i++) {
      players.push(game.players[i].player);
    }
    return players;
  }
}
