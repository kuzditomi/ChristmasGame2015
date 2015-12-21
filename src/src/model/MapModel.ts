/// <reference path="TileModel.ts"/>
/// <reference path="PlayerModel.ts"/>
/// <reference path="StoryModel.ts"/>
/// <reference path="MoveDirections.ts"/>
/// <reference path="../data/maps.ts"/>
/// <reference path="../data/stories.ts"/>

module Cm2k15 {
    export class MapModel {
        public Tiles:TileModel[][];
        public Player:PlayerModel;

        public Width:number;
        public Height:number;

        private stateStack:StateModel[];

        constructor() {
            this.loadMap(gamemap, canMoveOnMap);
            this.Player = new PlayerModel();

            this.Player.X = 6;
            this.Player.Y = 12;

            this.stateStack = [];

            this.MarkSurroundVisited(this.Player.X, this.Player.Y);
        }

        private loadMap(map:string[][], movements:string[][]) {
            this.Width = map.length;
            this.Height = map[0].length;

            this.Tiles = [];

            for (var i = 0; i < this.Height; i++) {
                this.Tiles[i] = [];
                for (var j = 0; j < this.Width; j++) {
                    var tile = new TileModel(map[j][i]);

                    tile.AllowMovementInDirections(this.getDirections(movements, j, i));
                    tile.Story = storiesTileMapping[tile.Type];

                    this.Tiles[i][j] = tile;
                }
            }

        }

        private movementMap = {
            'u': Cm2k15.directions.Up,
            'd': Cm2k15.directions.Down,
            'l': Cm2k15.directions.Left,
            'r': Cm2k15.directions.Right
        };

        private getDirections(movements:string[][], x:number, y:number):string[] {
            var movementCell = movements[x][y];
            var result = movementCell.split('').map(d => this.movementMap[d]);
            return result;
        }

        public MovePlayer(direction) {
            var response = this.Player.Move(direction);

            if (response.Success) {
                this.MarkSurroundVisited(this.Player.X, this.Player.Y);
                var tile = this.Tiles[this.Player.X][this.Player.Y];
                tile.IsVisited = true;

                if (tile.Story) {
                    response.Story = tile.Story;
                    this.Player.IsInStory = true;
                } else {
                    this.Player.IsInStory = false;
                }

                var transport = mapTransports[tile.Type];
                if (transport) {
                    this.Transport(transport);
                }
            }

            //console.log(this.Player);
            return response;
        }

        private GenerateState() {
            var state = new StateModel();
            state.Player = this.clone(this.Player);
            state.Tiles = this.clone(this.Tiles);

            return state;
        }

        private Transport(transport) {
            var state = this.GenerateState();

            if (this.stateStack.length > 0) {
                var prevState = this.stateStack.pop();
                this.LoadState(prevState);
            } else {
                for (var i = 0; i < transport.map.length; i++) {
                    for (var j = 0; j < transport.map[i].length; j++) {
                        if (transport.map[j][i] == transport.tile) {
                            this.Player.X = i;
                            this.Player.Y = j;
                        }
                    }
                }
                this.loadMap(transport.map, transport.movements);
            }

            this.stateStack.push(state);
        }

        private LoadState(state: StateModel){
            this.Player = new PlayerModel(state.Player);
            this.Tiles = state.Tiles;
        }

        private MarkSurroundVisited(x:number, y:number) {
            this.MarkVisitied(x, y);
            this.MarkVisitied(x - 1, y);
            this.MarkVisitied(x + 1, y);

            this.MarkVisitied(x, y - 1);
            this.MarkVisitied(x - 1, y - 1);
            this.MarkVisitied(x + 1, y - 1);

            this.MarkVisitied(x, y + 1);
            this.MarkVisitied(x - 1, y + 1);
            this.MarkVisitied(x + 1, y + 1);
        }

        private MarkVisitied(x:number, y:number) {
            if (this.Tiles[x] && this.Tiles[x][y])
                this.Tiles[x][y].IsVisited = true;
        }

        private clone(obj) {
            var oldState = history.state;
            history.replaceState(obj, null);
            var clonedObj = history.state;
            history.replaceState(oldState, null);
            return clonedObj;
        }
    }
}