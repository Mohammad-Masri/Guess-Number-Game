import { PlayerResultInGameResponse, YouPlayerResponse } from "../Player";
import { RoundResponse } from "../Round";

export enum GameStatuses {
  PREPARING = "preparing",
  RUNNING = "running",
}

export enum RoundStatuses {
  PREPARING = "preparing",
  RUNNING = "running",
  FINISH = "finish",
}

export interface GameResponse {
  id: string;
  game_id: string;
  you: YouPlayerResponse;

  current_round: RoundResponse;

  players_result: PlayerResultInGameResponse[];
}
