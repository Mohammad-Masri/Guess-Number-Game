/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IPlayer from './player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(ModuleNames.PLAYER)
    private readonly PlayerModel: Model<IPlayer>,
  ) {}
}
