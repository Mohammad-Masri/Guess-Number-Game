export interface MessageResponse {
  id: string;
  sender_id: string;
  sender_username: string;
  content: string;
  created_at: Date;
}

export class SendMessageInput {
  game_id: string;
  player_id: string;
  content: string;

  constructor(game_id: string, player_id: string, content: string) {
    this.game_id = game_id;
    this.player_id = player_id;
    this.content = content;
  }
}
