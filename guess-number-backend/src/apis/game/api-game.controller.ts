/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GameService } from 'src/modules/game/game.service';
import { StartNewGameInput } from './dto/StartNewGame.dto';
import { PlayerService } from 'src/modules/player/player.service';
import { GetGameDetailsParamsInput } from './dto/GetGameDetails.dto';
import { GameResponse } from 'src/modules/game/game.dto';
import { ServerError } from 'src/utils/config/server-response.config';

@Controller('game')
@ApiTags('Game')
export class ApiGameController {
  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  @Post('/')
  @ApiOperation({
    summary: 'start new game',
    description: '',
  })
  @ApiOkResponse({
    description: 'start new game success',
    type: GameResponse,
  })
  async startNewGame(@Body() body: StartNewGameInput) {
    const player = await this.playerService.findByUsernameOrCreate(
      body.username,
    );

    const cpu_players = await this.playerService.createDummyCPUPlayers();

    const all_players = [player, ...cpu_players];

    const game = await this.gameService.create(all_players);

    return game;
  }

  @Get('/:game_id')
  @ApiOperation({
    summary: 'get game details',
    description: '',
  })
  @ApiOkResponse({
    description: 'get game details success',
    type: GameResponse,
  })
  @ApiNotFoundResponse({
    description: 'game not found',
    type: ServerError,
  })
  async getGameDetails(@Param() params: GetGameDetailsParamsInput) {
    const game = await this.gameService.checkFindByGameId(params.game_id);
    const game_response = await this.gameService.makeGameResponse(game);
    return game_response;
  }
}
