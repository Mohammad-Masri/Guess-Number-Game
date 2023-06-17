/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';

export default interface IGame {
  id: ObjectId;
  game_id: string;
  createdAt: Date;
}
