/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class StartNewGameInput {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  username: string;
}
