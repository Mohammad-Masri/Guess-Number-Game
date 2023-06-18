/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetGameMessagesParamsInput {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  game_id: string;
}
