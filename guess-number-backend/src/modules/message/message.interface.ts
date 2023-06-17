/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';

export default interface IMessage {
  id: ObjectId;
  game_id: ObjectId;
  content: string;
  createdAt: Date;
}
