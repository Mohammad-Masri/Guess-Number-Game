/* eslint-disable prettier/prettier */
import { PlayerResponse } from '../player/player.dto';
import IGamePlayer from './game-player.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerResultInGameResponse {
  @ApiProperty({ type: PlayerResponse })
  player: PlayerResponse;
  @ApiProperty({ type: Number })
  rank: number;
  @ApiProperty({ type: Number })
  points: number;
  @ApiProperty({ type: Number })
  score: number;

  constructor(game_player: IGamePlayer | null, player: PlayerResponse) {
    this.player = player;

    this.rank = null;
    this.points = null;
    this.score = null;

    if (game_player != null) {
      this.rank = game_player.rank;
      this.points = Number(game_player.points.toFixed(2));
      this.score = Number(game_player.score.toFixed(2));
    }
  }
}
