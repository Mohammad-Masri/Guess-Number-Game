/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IGame from './game.interface';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(ModuleNames.GAME)
    private readonly GameModel: Model<IGame>,
  ) {}
}
