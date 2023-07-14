/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/modules/game/game.service';
import { SendMessageInput } from 'src/modules/message/message.dto';
import { MessageService } from 'src/modules/message/message.service';
import { PlayerTypes } from 'src/utils/config/server.config';
import { GameSocketEventNames } from 'src/utils/config/socket.config';

@WebSocketGateway({
  namespace: 'gateway/message',
  cors: {
    origin: '*',
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('GameGateway');

  constructor(
    private readonly messageService: MessageService,
    private readonly gameService: GameService,
  ) {}

  generateGameRoom(room_id: string) {
    return `room_${room_id}`;
  }

  @WebSocketServer()
  server: Server;

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('socket running');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
    const game_id: string = client.handshake.query.game_id as string;
    if (game_id != null) {
      const game = await this.gameService.findByGameId(game_id);
      if (game == null) {
        client.disconnect();
      } else {
        const room_name = this.generateGameRoom(game_id);
        client.join(room_name);
        client.emit(GameSocketEventNames.GAME_SOCKET_CONNECTED, {
          user_id: client.id,
        });
      }
    }
  }

  @SubscribeMessage(GameSocketEventNames.SEND_MESSAGE)
  async handleSendNewMessageEvent(
    @MessageBody() body: SendMessageInput,
    @ConnectedSocket() client: Socket,
  ) {
    const game = await this.gameService.findByGameId(body.game_id);
    if (game != null) {
      const player = game.players.find(
        (p) => p.player.id + '' == body.player_id,
      );
      if (player != null) {
        const new_message = await this.messageService.create(
          player.player,
          game.game_id,
          body.content,
        );
        const message_response = await this.messageService.makeMessageResponse(
          new_message,
        );
        const room_name = this.generateGameRoom(game.game_id);
        this.server
          .in(room_name)
          .emit(GameSocketEventNames.MESSAGE_SENDED, message_response);
      }
    }
  }
}
