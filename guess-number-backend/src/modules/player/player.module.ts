/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import PlayerSchema from './player.schema';
import { PlayerService } from './player.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.PLAYER,
        schema: PlayerSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [PlayerService],
})
export class PlayerModule {}
