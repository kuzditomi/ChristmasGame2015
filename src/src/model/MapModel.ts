/// <reference path="TileModel.ts"/>
/// <reference path="PlayerModel.ts"/>
/// <reference path="RoomModel.ts"/>

module Cm2k15 {
  export var directions = {
    Top: 'up',
    Right: 'right',
    Bottom: 'down',
    Left: 'left'
  };

  export class MapModel {
    public Tiles: TileModel[][];
    public Player: PlayerModel;
    public Rooms: RoomBase[];

    public Width: number;
    public Height: number;

    constructor(width: number, height: number) {
      this.Width = width;
      this.Height = height;

      this.Tiles = [];
      for (var i = 0; i < height; i++) {
        this.Tiles[i] = [];
        for (var j = 0; j < width; j++) {
          this.Tiles[i][j] = new TileModel();
        }
      }

      this.Player = new PlayerModel();
      this.Player.X = 2;
      this.Player.Y = 2;

      this.Tiles[this.Player.X][this.Player.Y].IsVisited = true;

      this.Rooms = [];

      var randomRoom = new RoomModel("Beleptel a szobaba");
      randomRoom.X = 4; //Math.floor(Math.random() * width);
      randomRoom.Y = 4; //Math.floor(Math.random() * height);

      console.log('house is ' + randomRoom.X + ':' + randomRoom.Y);

      this.Rooms.push(randomRoom);

      this.Tiles[randomRoom.X][randomRoom.Y].Room = randomRoom;
    }

    public MovePlayer(direction) {
      if ((this.Player.X == 0 && direction == directions.Left) ||
        (this.Player.Y == 0 && direction == directions.Top) ||
        (this.Player.X == this.Width - 1 && direction == directions.Right) ||
        (this.Player.Y == this.Height - 1 && direction == directions.Bottom)) {
        return "You can't leave this area, turn around!";
      } else {
        var response = this.Player.Move(direction);

        console.log('Player moved ' + this.Player.X + ':' + this.Player.Y);

        return response;
      }
    }
  }
}