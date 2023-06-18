/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import IRound from './round.interface';
import { PlayerResponse } from '../player/player.dto';
import { PlayerGuessStatuses } from 'src/utils/config/server.config';

export class RoundPlayerResultResponse {
  @ApiProperty({ type: PlayerResponse })
  player: PlayerResponse;

  @ApiProperty({ type: Number, nullable: true })
  multiplier: number | null;

  @ApiProperty({ type: Number, nullable: true })
  points: number | null;
  @ApiProperty({ enum: PlayerGuessStatuses, nullable: true })
  status: PlayerGuessStatuses | null;
  @ApiProperty({ type: Number, nullable: true })
  score: number | null;

  constructor(
    player: PlayerResponse,
    multiplier: number | null,
    points: number | null,
    status: PlayerGuessStatuses | null,
    score: number | null,
  ) {
    this.player = player;
    this.multiplier = multiplier;
    this.points = points;
    this.status = status;
    this.score = score;
  }
}

export class RoundResponse {
  @ApiProperty({ type: Number, nullable: true })
  round_multiplier: number | null;

  @ApiProperty({ type: RoundPlayerResultResponse, isArray: true })
  round_results: RoundPlayerResultResponse[];

  constructor(
    round: IRound | null,
    round_results: RoundPlayerResultResponse[],
  ) {
    if (round) {
      this.round_multiplier = round.round_multiplier;
    }
    this.round_results = round_results;
  }
}
