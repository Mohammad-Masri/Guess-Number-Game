/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IPlayerGuess from './player-guess.interface';
import IRound from '../round/round.interface';
import { PlayerResponse } from '../player/player.dto';

@Injectable()
export class PlayerGuessService {
  constructor(
    @InjectModel(ModuleNames.PLAYER_GUESS)
    private readonly PlayerGuessModel: Model<IPlayerGuess>,
  ) {}

  async getPlayerGuessInRound(round: IRound, player: PlayerResponse) {
    const player_guess = round.player_guesses.find(
      (pg) => pg.player.id + '' == player.id,
    );
    return player_guess;
  }
}
