/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import GameSchema from './game.schema';
import { GameService } from './game.service';
import PlayerSchema from '../player/player.schema';
import { PlayerService } from '../player/player.service';
import { GamePlayerService } from '../game-player/game-player.service';
import GamePlayerSchema from '../game-player/game-player.schema';
import { RoundService } from '../round/round.service';
import RoundSchema from '../round/round.schema';
import PlayerGuessSchema from '../player-guess/player-guess.schema';
import { PlayerGuessService } from '../player-guess/player-guess.service';

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
  controllers: [],
  providers: [
    GameService,
    PlayerService,
    GamePlayerService,
    RoundService,
    PlayerGuessService,
  ],
})
export class GameModule {}
