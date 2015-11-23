module Cm2k15 {
  export class PlayerModel {
    public X: number;
    public Y: number;

    public Move(direction: string) {
      switch (direction) {
        case directions.Up:
          this.Y--;
          break;
        case directions.Down:
          this.Y++;
          break;
        case directions.Left:
          this.X--;
          break;
        case directions.Right:
          this.X++;
          break;
        default:
          return 'Move where?';
      }

      return "You have moved " + direction + ".";
    }
  } 
} 