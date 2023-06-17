/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GameGateway } from './game-gateway.gateway';

@Module({
  providers: [GameGateway],
})
export class GameGatewayModule {}
