/// <reference path="RoomBase.ts"/>

module Cm2k15 {
  export class RoomModel extends RoomBase {
    constructor(description: string) {
      super(); 
      this.Description = description;
    }
  }
}