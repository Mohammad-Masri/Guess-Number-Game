/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ModuleNames,
  PlayerGuessStatuses,
} from 'src/utils/config/server.config';
import { Model } from 'mongoose';
import IRound from './round.interface';
import IGame from '../game/game.interface';
import { RoundPlayerResultResponse, RoundResponse } from './round.dto';
import { PlayerResponse } from '../player/player.dto';
import { PlayerGuessService } from '../player-guess/player-guess.service';
import IPlayerGuess from '../player-guess/player-guess.interface';

@Injectable()
export class RoundService {
  constructor(
    @InjectModel(ModuleNames.ROUND)
    private readonly RoundModel: Model<IRound>,
    private readonly playerGuessService: PlayerGuessService,
  ) {}

  async getCurrentRoundInGame(game: IGame) {
    const current_round = game.rounds[game.rounds.length - 1];
    return current_round;
  }

  async makeRoundPlayerResultResponse(
    round: IRound | null,
    player: PlayerResponse,
  ) {
    if (round) {
      const player_guess = await this.playerGuessService.getPlayerGuessInRound(
        round,
        player,
      );
      let points = null,
        multiplier = null,
        status = null,
        score = null;
      if (player_guess) {
        points = player_guess.points;
        multiplier = player_guess.multiplier;
        status =
          multiplier > round.round_multiplier
            ? PlayerGuessStatuses.LOSE
            : PlayerGuessStatuses.WIN;

        score =
          status == PlayerGuessStatuses.WIN
            ? Number((multiplier * points).toFixed(2))
            : 0;
      }
      return new RoundPlayerResultResponse(
        player,
        multiplier,
        points,
        status,
        score,
      );
    }
    return new RoundPlayerResultResponse(player, null, null, null, null);
  }

  async makeRoundPlayersResultResponse(
    round: IRound | null,
    players: PlayerResponse[],
  ) {
    const round_players_result: RoundPlayerResultResponse[] = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const round_player_result = await this.makeRoundPlayerResultResponse(
        round,
        player,
      );
      round_players_result.push(round_player_result);
    }
    return round_players_result;
  }

  async makeRoundResponse(round: IRound | null, players: PlayerResponse[]) {
    const round_results = await this.makeRoundPlayersResultResponse(
      round,
      players,
    );
    return new RoundResponse(round, round_results);
  }

  async create(player_guesses: IPlayerGuess[], round_multiplier: number) {
    const new_round = new this.RoundModel({
      player_guesses,
      round_multiplier,
    });

    return new_round;
  }
}
