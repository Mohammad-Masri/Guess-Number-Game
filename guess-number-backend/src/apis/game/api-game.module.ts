/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApiGameController } from './api-game.controller';
import { GameService } from 'src/modules/game/game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import GameSchema from 'src/modules/game/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.GAME,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [ApiGameController],
  providers: [GameService],
})
export class ApiGameModule {}
