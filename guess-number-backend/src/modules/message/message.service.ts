/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IMessage from './message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(ModuleNames.MESSAGE)
    private readonly MessageModel: Model<IMessage>,
  ) {}
}
