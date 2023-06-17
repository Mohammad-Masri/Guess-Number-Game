/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApiGameController } from './api-game.controller';
import { GameService } from 'src/modules/game/game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import GameSchema from 'src/modules/game/game.schema';
import PlayerSchema from 'src/modules/player/player.schema';
import { PlayerService } from 'src/modules/player/player.service';
import GamePlayerSchema from 'src/modules/game-player/game-player.schema';
import { GamePlayerService } from 'src/modules/game-player/game-player.service';
import RoundSchema from 'src/modules/round/round.schema';
import { RoundService } from 'src/modules/round/round.service';
import PlayerGuessSchema from 'src/modules/player-guess/player-guess.schema';
import { PlayerGuessService } from 'src/modules/player-guess/player-guess.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.GAME,
        schema: GameSchema,
      },
      {
        name: ModuleNames.PLAYER,
        schema: PlayerSchema,
      },
      {
        name: ModuleNames.GAME_PLAYER,
        schema: GamePlayerSchema,
      },
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
  controllers: [ApiGameController],
  providers: [
    GameService,
    PlayerService,
    GamePlayerService,
    RoundService,
    PlayerGuessService,
  ],
})
export class ApiGameModule {}
