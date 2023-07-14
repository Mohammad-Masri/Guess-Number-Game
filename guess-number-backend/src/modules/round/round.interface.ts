/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import IPlayerGuess from '../player-guess/player-guess.interface';

export default interface IRound {
  id: ObjectId;
  player_guesses: IPlayerGuess[];
  round_multiplier: number;
}
