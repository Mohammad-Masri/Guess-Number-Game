/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import IPlayer from '../player/player.interface';

export default interface IPlayerGuess {
  id: ObjectId;
  player: IPlayer;
  multiplier: number;
  points: number;
}
