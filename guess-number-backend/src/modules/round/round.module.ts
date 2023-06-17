/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { RoundService } from './round.service';
import RoundSchema from './round.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.ROUND,
        schema: RoundSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [RoundService],
})
export class RoundModule {}
