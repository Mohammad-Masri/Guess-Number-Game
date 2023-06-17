/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import GameSchema from './game.schema';
import { GameService } from './game.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.GAME,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [GameService],
})
export class GameModule {}
