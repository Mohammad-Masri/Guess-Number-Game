/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import { PlayerTypes } from 'src/utils/config/server.config';

export default interface IPlayer {
  id: ObjectId;
  username: string;
  type: PlayerTypes;
}
