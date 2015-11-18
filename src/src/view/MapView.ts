/// <reference path="TileView.ts"/>

module Cm2k15 {
  export class MapView {
    // constants
    tileCount = 9;

    // views
    tiles: TileView[][];

    // model
    model: MapModel;

    public constructor(model: MapModel) {
      console.log('gamemap constructor');

      var mapElement = <HTMLDivElement>document.getElementById('map');
      var message = <HTMLDivElement>document.getElementById('message');

      // initialize game state
      this.model = model;

      // create tile views 
      var mapWidth = mapElement.clientWidth;
      var tileSize = mapWidth / this.tileCount;
      this.tiles = [];
      for (var i = 0; i < this.tileCount; i++) {
        this.tiles.push([]);
        for (var j = 0; j < this.tileCount; j++) {
          var element = <HTMLDivElement>document.createElement('div');
          this.tiles[i][j] = new TileView(i, j, tileSize, element);
          mapElement.appendChild(element); 
        }
      }
    }

    public Display() {
      var middle = Math.floor(this.tileCount / 2);

      var left = this.model.Player.X < (middle) ? 0
        : this.model.Player.X > (this.model.Width - middle) ? this.model.Width - this.tileCount
          : this.model.Player.X - middle;

      var top = this.model.Player.Y < (middle) ? 0
        : this.model.Player.Y > (this.model.Height - middle) ? this.model.Height - this.tileCount
        : this.model.Player.Y - middle;

      for (var i = 0; i < this.tileCount; i++) {
        for (var j = 0; j < this.tileCount; j++) {
          var tile = this.tiles[i][j];
          var tileState = this.model.Tiles[left + j][top + i];

          if (top + i == this.model.Player.Y && left + j == this.model.Player.X) {
            tile.Set('[x]');
          } else {
            tile.Reset();
          }

          tile.SetState('visited', tileState.Visited);
          tile.SetState('edge', left + j == 0 || left + j == this.tileCount - 1 || top + i == 0 || top + i == this.tileCount - 1);
          tile.Display();
        }
      }
    }
  }
}