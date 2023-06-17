export class TotalResult {
  rank: number;
  name: string | null;
  score: number | null;
  isYou: boolean;

  constructor(
    rank: number,
    name: string | null,
    score: number | null,
    isYou: boolean = false
  ) {
    this.rank = rank;
    this.score = score;
    this.isYou = isYou;
    this.name = isYou ? "You" : name;
  }
}
