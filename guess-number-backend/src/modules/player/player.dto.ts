/* eslint-disable prettier/prettier */
import IGamePlayer from '../game-player/game-player.interface';
import { ApiProperty } from '@nestjs/swagger';
import IPlayer from './player.interface';
import { PlayerTypes } from 'src/utils/config/server.config';

export class YouPlayerResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: Number })
  points: number;

  constructor(game_player: IGamePlayer) {
    this.id = game_player.player.id + '';
    this.username = game_player.player.username;
    this.points = game_player.points;
  }
}

export class PlayerResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ enum: PlayerTypes })
  type: PlayerTypes;
  @ApiProperty({ type: Boolean })
  is_you: boolean;

  constructor(player: IPlayer) {
    this.id = player.id + '';
    this.username = player.username;
    this.type = player.type;
    this.is_you = player.type == PlayerTypes.HUMAN ? true : false;
  }
}
