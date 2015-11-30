/// <reference path="TileView.ts"/>

module Cm2k15 {
    export class MapView {
        // constants
        tileCount = 13;

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
                    var element = document.createElement('div');
                    this.tiles[i][j] = new TileView(i, j, tileSize, element, this.model.Tiles[j][i]);
                    mapElement.appendChild(element);
                }
            }
        }

        public Display() {
            // scrolling mechanism
            //var middle = Math.floor(this.tileCount / 2);
            //var left = this.model.Player.X < (middle) ? 0
            //  : this.model.Player.X > (this.model.Width - 1 - middle) ? this.model.Width - this.tileCount
            //    : this.model.Player.X - middle;

            //var top = this.model.Player.Y < (middle) ? 0
            //  : this.model.Player.Y > (this.model.Height - 1 - middle) ? this.model.Height - this.tileCount
            //  : this.model.Player.Y - middle;

            for (var i = 0; i < this.tileCount; i++) {
                for (var j = 0; j < this.tileCount; j++) {
                    var tile = this.tiles[i][j];
                    if (this.model.Player.X == i && this.model.Player.Y == j) {
                        this.model.Tiles[i][j].IsPlayer = true;
                    } else {
                        this.model.Tiles[i][j].IsPlayer = false;
                    }

                    tile.Display();
                }
            }

            var currentTile = this.model.Tiles[this.model.Player.X][this.model.Player.Y];
            Object.keys(Cm2k15.directions).forEach(key => {
                var direction = Cm2k15.directions[key];
                var allowed = currentTile.AllowedMoves.indexOf(direction) !== -1;
                var moveButton = document.getElementById("move-" + direction + "-command");

                moveButton.style.display = allowed ? 'inline-block' : 'none';
            });
        }
    }
}