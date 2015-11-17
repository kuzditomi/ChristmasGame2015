module Cm2k15 {
  export class GamePlayer {
    private x: number;
    private y: number;

    public constructor() {
      console.log('player constructor');
      this.x = 2;
      this.y = 2;
    }

    public GetPosition() {
      return {
        x: this.x,
        y: this.y
      };
    }

    public Move(direction: string) {
      switch (direction) {
        case 'up':
          this.y--;
          break;
        case 'down':
          this.y++;
          break;
        case 'left':
          this.x--;
          break;
        case 'right':
          this.x++;
          break;
        default:
          return 'Move where?';
      }

      return "You have moved " + direction + ".";
    }
  }
}