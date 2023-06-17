import io, { Socket } from "socket.io-client";

export enum SocketHandlerStatuses {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
}

export class SocketHandler {
  private status: SocketHandlerStatuses = SocketHandlerStatuses.DISCONNECTED;
  private url: string;
  private dispatch: any;
  private clientSocket: Socket | null = null;
  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  public getStatus() {
    return this.status;
  }

  public connect() {
    this.status = SocketHandlerStatuses.CONNECTING;
    this.clientSocket = io(this.url);
    this.makeListeners();
  }

  public reconnect() {
    console.log("trying reconnect ...");
    this.connect();
  }

  private makeListeners() {
    if (this.clientSocket != null) {
      this.clientSocket.on("connected", () => {
        console.log("socket connected in SocketHandler");
        this.status = SocketHandlerStatuses.CONNECTED;
      });
      this.clientSocket.on("disconnect", () => {
        this.status = SocketHandlerStatuses.DISCONNECTED;
        console.log("socket disconnected in SocketHandler");
        this.reconnect();
      });
    }
  }
}
