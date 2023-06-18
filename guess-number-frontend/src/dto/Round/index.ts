import { RoundPlayerResultResponse } from "../RoundResult";

export interface RoundResponse {
  round_multiplier: number | null;

  round_results: RoundPlayerResultResponse[];
}
