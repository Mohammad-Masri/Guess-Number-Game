/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class StartNewRoundParamsInput {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  game_id: string;
}

export class StartNewRoundInput {
  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  points: number;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  multiplier: number;
}
