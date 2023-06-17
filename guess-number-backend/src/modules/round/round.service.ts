/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IRound from './round.interface';

@Injectable()
export class RoundService {
  constructor(
    @InjectModel(ModuleNames.ROUND)
    private readonly RoundModel: Model<IRound>,
  ) {}
}
