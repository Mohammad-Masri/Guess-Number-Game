import { PlayerResponse } from "../Player";

export enum PlayerGuessStatuses {
  WIN = "win",
  LOSE = "lose",
}

export interface RoundPlayerResultResponse {
  player: PlayerResponse;
  points: number | null;

  multiplier: number | null;

  status: PlayerGuessStatuses | null;
  score: number | null;
}
