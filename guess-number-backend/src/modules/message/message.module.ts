/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { MessageService } from './message.service';
import MessageSchema from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModuleNames.MESSAGE,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [MessageService],
})
export class MessageModule {}
