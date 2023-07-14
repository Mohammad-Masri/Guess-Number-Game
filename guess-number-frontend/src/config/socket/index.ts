import io, { Socket } from "socket.io-client";
import { pushNewMessage } from "../../store/slices/ChatSlice";
import { SendMessageInput } from "../../dto/Message";

export enum GameSocketEventNames {
  CONNECTED = "connected",
  DISCONNECT = "disconnect",
  GAME_SOCKET_CONNECTED = "game-socket-connected",
  SEND_MESSAGE = "send-message",
  MESSAGE_SENDED = "message-send",
}

export class SocketHandler {
  private url: string;
  private game_id: string;
  private player_id: string;
  private clientSocket: Socket | null = null;
  private dispatch: any;
  constructor(url: string, game_id: string, player_id: string, dispatch: any) {
    this.url = url;
    this.game_id = game_id;
    this.player_id = player_id;
    this.dispatch = dispatch;
    this.connect();
  }

  public connect() {
    this.clientSocket = io(this.url);
    this.makeListeners();
  }

  private makeListeners() {
    if (this.clientSocket != null) {
      this.clientSocket.on(GameSocketEventNames.CONNECTED, () => {});
      this.clientSocket.on(GameSocketEventNames.DISCONNECT, () => {});
      this.clientSocket.on(
        GameSocketEventNames.GAME_SOCKET_CONNECTED,
        () => {}
      );
      this.clientSocket.on(GameSocketEventNames.MESSAGE_SENDED, (data) => {
        this.dispatch(pushNewMessage(data));
      });
    }
  }

  public sendNewMessageViaSocket(content: string) {
    if (this.clientSocket != null) {
      const newMessage = new SendMessageInput(
        this.game_id,
        this.player_id,
        content
      );
      this.clientSocket.emit(GameSocketEventNames.SEND_MESSAGE, newMessage);
    }
  }
}
