/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import IPlayer from '../player/player.interface';

export default interface IMessage {
  id: ObjectId;
  game_id: string;
  player: IPlayer;
  content: string;
  createdAt: Date;
}
