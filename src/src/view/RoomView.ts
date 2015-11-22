module Cm2k15 {
  export class RoomView {
    private roomElement: HTMLDivElement;

    constructor() {
      this.roomElement = <HTMLDivElement>document.getElementById('room');
    }

    public Draw(room: RoomModel) {
      if (!room) {
        this.roomElement.innerText = "";
        return;
      }

      this.roomElement.innerText = room.Description;
    }
  }
}