/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { RoundService } from './round.service';
import RoundSchema from './round.schema';
import PlayerGuessSchema from '../player-guess/player-guess.schema';
import { PlayerGuessService } from '../player-guess/player-guess.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.ROUND,
        schema: RoundSchema,
      },
      {
        name: ModuleNames.PLAYER_GUESS,
        schema: PlayerGuessSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [RoundService, PlayerGuessService],
})
export class RoundModule {}
