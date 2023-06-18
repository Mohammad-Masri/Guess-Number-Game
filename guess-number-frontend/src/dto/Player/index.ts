export enum PlayerTypes {
  HUMAN = "human",
  CPU = "cpu",
}

export interface PlayerResponse {
  id: string;

  username: string;

  type: PlayerTypes;

  is_you: boolean;
}

export interface YouPlayerResponse {
  id: string;
  username: string;
  points: number;
}
