import { PlayerResponse } from "../Player";

export interface RoundPlayerResultResponse {
  player: PlayerResponse;
  points: number | null;

  multiplier: number | null;
}
