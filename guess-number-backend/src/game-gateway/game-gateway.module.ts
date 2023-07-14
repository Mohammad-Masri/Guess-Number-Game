/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GameGateway } from './game-gateway.gateway';
import { MessageService } from 'src/modules/message/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import MessageSchema from 'src/modules/message/message.schema';
import { PlayerGuessService } from 'src/modules/player-guess/player-guess.service';
import { RoundService } from 'src/modules/round/round.service';
import { GamePlayerService } from 'src/modules/game-player/game-player.service';
import { PlayerService } from 'src/modules/player/player.service';
import { GameService } from 'src/modules/game/game.service';
import PlayerGuessSchema from 'src/modules/player-guess/player-guess.schema';
import RoundSchema from 'src/modules/round/round.schema';
import GamePlayerSchema from 'src/modules/game-player/game-player.schema';
import PlayerSchema from 'src/modules/player/player.schema';
import GameSchema from 'src/modules/game/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.MESSAGE,
        schema: MessageSchema,
      },
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
  providers: [
    GameGateway,
    MessageService,
    GameService,
    PlayerService,
    GamePlayerService,
    RoundService,
    PlayerGuessService,
  ],
})
export class GameGatewayModule {}
