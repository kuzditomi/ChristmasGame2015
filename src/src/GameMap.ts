/// <reference path="GameTile.ts"/>
/// <reference path="GamePlayer.ts"/>
module Cm2k15 {
  export class GameMap {
    tileCount = 8;
    tiles: GameTile[][];
    player: GamePlayer;

    public constructor(map: HTMLDivElement, player: GamePlayer) {
      console.log('gamemap constructor');

      var mapWidth = map.clientWidth;
      var tileSize = mapWidth / this.tileCount;

      this.player = player;
      this.tiles = [];
      for (var i = 0; i < this.tileCount; i++) {  
        this.tiles.push([]);
        for (var j = 0; j < this.tileCount; j++) {
          var element = <HTMLDivElement>document.createElement('div');
          this.tiles[i][j] = new GameTile(i, j, tileSize, element);
          map.appendChild(element);
        }
      }
    }

    public Display() {
      var playerpos = this.player.GetPosition();
      for (var i = 0; i < this.tileCount; i++) {
        for (var j = 0; j < this.tileCount; j++) {
          if (i == playerpos.y && j == playerpos.x) {
            this.tiles[i][j].Set('[x]');
          } else {
            this.tiles[i][j].Reset();
          }
        }
      }
    }
  }
}