/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import IGamePlayer from '../game-player/game-player.interface';
import IRound from '../round/round.interface';

export default interface IGame {
  id: ObjectId;
  game_id: string;
  players: IGamePlayer[];
  rounds: IRound[];
  createdAt: Date;
}
