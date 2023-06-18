/* eslint-disable prettier/prettier */
import IMessage from './message.interface';

export class MessageResponse {
  id: string;
  sender_id: string;
  sender_username: string;
  content: string;
  created_at: Date;

  constructor(message: IMessage) {
    this.id = message.id + '';
    this.content = message.content;
    this.sender_id = message.player.username;
    this.sender_username = message.player.username;
  }
}

export class SendMessageInput {
  game_id: string;
  player_id: string;
  content: string;
}
