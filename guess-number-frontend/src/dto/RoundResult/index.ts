export class RoundResult {
  name: string | null;
  points: number | null;
  multiplier: number | null;
  isYou: boolean;

  constructor(
    name: string | null,
    points: number | null,
    multiplier: number | null,
    isYou: boolean = false
  ) {
    this.isYou = isYou;
    this.name = isYou ? "You" : name;
    this.points = points;
    this.multiplier = multiplier;
  }
}
