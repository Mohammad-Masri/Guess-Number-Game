/* eslint-disable prettier/prettier */
import { YouPlayerResponse } from '../player/player.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoundResponse } from '../round/round.dto';

export class GameResponse {
  @ApiProperty({ type: YouPlayerResponse })
  you: YouPlayerResponse;

  @ApiProperty({ type: RoundResponse })
  current_round: RoundResponse;

  constructor(you: YouPlayerResponse, current_round: RoundResponse) {
    this.you = you;
    this.current_round = current_round;
  }
}
