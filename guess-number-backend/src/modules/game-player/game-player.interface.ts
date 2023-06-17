/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import IPlayer from '../player/player.interface';

export default interface IGamePlayer {
  id: ObjectId;
  player: IPlayer;
  rank: number;
  points: number;
}
