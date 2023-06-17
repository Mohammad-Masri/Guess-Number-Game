/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { GamePlayerService } from './game-player.service';
import GamePlayerSchema from './game-player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.GAME_PLAYER,
        schema: GamePlayerSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [GamePlayerService],
})
export class GamePlayerModule {}
