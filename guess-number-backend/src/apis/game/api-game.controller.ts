/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GameService } from 'src/modules/game/game.service';

@Controller('game')
@ApiTags('Game')
export class ApiGameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'get game details',
    description: '',
  })
  @ApiOkResponse({
    description: 'get game details success',
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'game not found',
    type: Object,
  })
  async getGameDetails() {
    return 'ok';
  }
}
