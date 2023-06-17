import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGatewayModule } from './game-gateway/game-gateway.module';
import { GameModule } from './modules/game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
} from './utils/config/server.config';
import { PlayerModule } from './modules/player/player.module';
import { GamePlayerModule } from './modules/game-player/game-player.module';
import { PlayerGuessModule } from './modules/player-guess/player-guess.module';
import { RoundModule } from './modules/round/round.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    GameGatewayModule,
    GameModule,
    PlayerModule,
    GamePlayerModule,
    PlayerGuessModule,
    RoundModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
