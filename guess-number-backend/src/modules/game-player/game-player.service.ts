/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IGamePlayer from './game-player.interface';

@Injectable()
export class GamePlayerService {
  constructor(
    @InjectModel(ModuleNames.GAME_PLAYER)
    private readonly GamePlayerModel: Model<IGamePlayer>,
  ) {}
}
