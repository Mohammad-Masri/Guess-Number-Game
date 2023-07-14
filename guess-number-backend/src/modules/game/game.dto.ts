/* eslint-disable prettier/prettier */
import { YouPlayerResponse } from '../player/player.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoundResponse } from '../round/round.dto';
import { PlayerResultInGameResponse } from '../game-player/game-player.dto';
import IGame from './game.interface';

export class GameResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  game_id: string;

  @ApiProperty({ type: YouPlayerResponse })
  you: YouPlayerResponse;

  @ApiProperty({ type: RoundResponse })
  current_round: RoundResponse;

  @ApiProperty({ type: PlayerResultInGameResponse, isArray: true })
  players_result: PlayerResultInGameResponse[];

  constructor(
    game: IGame,
    you: YouPlayerResponse,
    current_round: RoundResponse,
    players_result: PlayerResultInGameResponse[],
  ) {
    this.id = game.id + '';
    this.game_id = game.game_id;
    this.you = you;
    this.current_round = current_round;
    this.players_result = players_result;
  }
}
