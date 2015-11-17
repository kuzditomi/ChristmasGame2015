module Cm2k15 {
  export class GamePlayer {
    position: number;

    public constructor() {
      console.log('player constructor');
      this.position = 2;
    }

    public GetPosition() {
      return this.position;
    }

    public Move() {
      this.position++;
    }
  }
}