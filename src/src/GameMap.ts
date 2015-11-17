/// <reference path="GameTile.ts"/>

module Cm2k15 {
    export class GameMap {
        // constants
        tileCount = 9;

        // views
        tiles: GameTile[][];

        // model
        state: GameMapState;

        public constructor(map:HTMLDivElement, state: GameMapState) {
            console.log('gamemap constructor');

            // initialize game state
            this.state = state;

            // create tile views
            var mapWidth = map.clientWidth;
            var tileSize = mapWidth / this.tileCount;
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
            var middle = Math.floor(this.tileCount / 2);

            var left = this.state.Player.X < (middle) ? 0
                : this.state.Player.X > (this.state.Width - middle) ? this.state.Width - this.tileCount
                : this.state.Player.X - middle;

            var top = this.state.Player.Y < (middle) ? 0
                : this.state.Player.Y > (this.state.Height - middle) ? this.state.Height - this.tileCount
                : this.state.Player.Y - middle;

            for (var i = 0; i < this.tileCount; i++) {
                for (var j = 0; j < this.tileCount; j++) {
                    var tile = this.tiles[i][j];
                    var tileState = this.state.Tiles[left + j][top + i];

                    if (top+i == this.state.Player.Y && left+j == this.state.Player.X) {
                        tile.Set('[x]');
                    } else {
                        tile.Reset();
                    }

                    tile.SetState('visited', tileState.Visited);
                    tile.SetState('edge', left+j == 0 || left+j == this.tileCount-1 || top+i == 0 || top+i == this.tileCount-1);
                    tile.Display();
                }
            }
        }
    }
}