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
import {
  StartNewRoundInput,
  StartNewRoundParamsInput,
} from './dto/StartNewRound.dto';
import { GamePlayerService } from 'src/modules/game-player/game-player.service';
import { MessageResponse } from 'src/modules/message/message.dto';
import { GetGameMessagesParamsInput } from './dto/GetGameMessages.dto';
import { MessageService } from 'src/modules/message/message.service';

@Controller('game')
@ApiTags('Game')
export class ApiGameController {
  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
    private readonly gamePlayerService: GamePlayerService,
    private readonly messageService: MessageService,
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

  @Post('/:game_id/round')
  @ApiOperation({
    summary: 'start new round',
    description: '',
  })
  @ApiOkResponse({
    description: 'start new round success',
    type: GameResponse,
  })
  async startNewRound(
    @Param() params: StartNewRoundParamsInput,
    @Body() body: StartNewRoundInput,
  ) {
    let game: any = await this.gameService.checkFindByGameId(params.game_id);

    const human_game_player = await this.gamePlayerService.getHumanPlayerInGame(
      game,
    );

    game = await this.gameService.startNewGameRound(
      game,
      human_game_player,
      body.points,
      body.multiplier,
    );

    const game_response = await this.gameService.makeGameResponse(game);

    return game_response;
  }

  @Get('/:game_id/message')
  @ApiOperation({
    summary: 'get game messages',
    description: '',
  })
  @ApiOkResponse({
    description: 'get game messages success',
    type: MessageResponse,
    isArray: true,
  })
  async getGameMessages(@Param() params: GetGameMessagesParamsInput) {
    const game = await this.gameService.checkFindByGameId(params.game_id);

    const messages = await this.messageService.findAllInGame(game.game_id);
    const messages_response = await this.messageService.makeMessagesResponse(
      messages,
    );

    return messages_response;
  }
}
