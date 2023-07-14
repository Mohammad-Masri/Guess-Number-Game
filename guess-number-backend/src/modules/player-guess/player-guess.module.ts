/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { PlayerGuessService } from './player-guess.service';
import PlayerGuessSchema from './player-guess.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.PLAYER_GUESS,
        schema: PlayerGuessSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [PlayerGuessService],
})
export class PlayerGuessModule {}
