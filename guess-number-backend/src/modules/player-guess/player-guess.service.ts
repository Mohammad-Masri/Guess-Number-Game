/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleNames, MultiplierValues } from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IPlayerGuess from './player-guess.interface';
import IRound from '../round/round.interface';
import { PlayerResponse } from '../player/player.dto';
import IPlayer from '../player/player.interface';
import { getRandomNumberBetweenTwoNumber } from 'src/utils/helpers/number';
import IGamePlayer from '../game-player/game-player.interface';

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

  async create(player: IPlayer, multiplier: number, points) {
    const new_player_guess = new this.PlayerGuessModel({
      player,
      multiplier,
      points,
    });

    return new_player_guess;
  }

  async createRandomGuessesForPlayers(game_players: IGamePlayer[]) {
    const player_guesses: IPlayerGuess[] = [];

    for (let i = 0; i < game_players.length; i++) {
      const game_player = game_players[i];
      const player_multiplier = await getRandomNumberBetweenTwoNumber(
        MultiplierValues.MIN,
        MultiplierValues.MAX,
      );
      const player_points = await getRandomNumberBetweenTwoNumber(
        1,
        game_player.points,
      );
      const player_guess = await this.create(
        game_player.player,
        player_multiplier,
        player_points,
      );
      player_guesses.push(player_guess);
    }

    return player_guesses;
  }
}
