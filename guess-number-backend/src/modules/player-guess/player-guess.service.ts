/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IPlayerGuess from './player-guess.interface';

@Injectable()
export class PlayerGuessService {
  constructor(
    @InjectModel(ModuleNames.PLAYER_GUESS)
    private readonly PlayerGuessModel: Model<IPlayerGuess>,
  ) {}
}
