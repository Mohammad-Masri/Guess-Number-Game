/* eslint-disable prettier/prettier */
import { YouPlayerResponse } from '../player/player.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoundResponse } from '../round/round.dto';
import { PlayerResultInGameResponse } from '../game-player/game-player.dto';

export class GameResponse {
  @ApiProperty({ type: YouPlayerResponse })
  you: YouPlayerResponse;

  @ApiProperty({ type: RoundResponse })
  current_round: RoundResponse;

  @ApiProperty({ type: PlayerResultInGameResponse, isArray: true })
  players_result: PlayerResultInGameResponse[];

  constructor(
    you: YouPlayerResponse,
    current_round: RoundResponse,
    players_result: PlayerResultInGameResponse[],
  ) {
    this.you = you;
    this.current_round = current_round;
    this.players_result = players_result;
  }
}
