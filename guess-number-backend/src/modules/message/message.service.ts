/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model, ObjectId } from 'mongoose';
import IMessage from './message.interface';
import IPlayer from '../player/player.interface';
import { MessageResponse } from './message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(ModuleNames.MESSAGE)
    private readonly MessageModel: Model<IMessage>,
  ) {}

  async findAllInGame(game_id: string) {
    return await this.MessageModel.find({ game_id }).sort({ createdAt: -1 });
  }
  async create(
    player: IPlayer | null,
    game_id: string,
    content: string,
    save = true,
  ) {
    const new_message = new this.MessageModel({
      player,
      game_id,
      content,
    });

    if (save) {
      return await new_message.save();
    }

    return new_message;
  }

  async makeMessageResponse(message: IMessage) {
    return new MessageResponse(message);
  }

  async makeMessagesResponse(messages: IMessage[]) {
    const messages_response: MessageResponse[] = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const message_response = await this.makeMessageResponse(message);
      messages_response.push(message_response);
    }
    return messages_response;
  }
}
