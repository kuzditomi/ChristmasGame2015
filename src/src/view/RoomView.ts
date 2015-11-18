module Cm2k15 {
  export class RoomView {
    private roomElement: HTMLDivElement;

    constructor() {
      this.roomElement = <HTMLDivElement>document.getElementById('room');
    }
  }
} 