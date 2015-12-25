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

        private stateBackup: StateModel;
        private visitedStories: string[];

        constructor() {
            this.loadMap(gamemap, canMoveOnMap);
            this.Player = new PlayerModel();

            this.Player.X = 6;
            this.Player.Y = 12;

            this.MarkSurroundVisited(this.Player.X, this.Player.Y);
            this.visitedStories = [];
        }

        private lastmap;
        private lastmovements;
        private loadMap(map:string[][], movements:string[][]) {
            this.lastmap = map;
            this.lastmovements = movements;

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

        public ReloadMap(){
            this.loadMap(this.lastmap, this.lastmovements);
        }

        private movementMap = {
            'u': Cm2k15.directions.Up,
            'd': Cm2k15.directions.Down,
            'l': Cm2k15.directions.Left,
            'r': Cm2k15.directions.Right
        };

        private getDirections(movements:string[][], x:number, y:number):string[] {
            var movementCell = movements[x][y];
            return movementCell.split('').map(d => this.movementMap[d]);
        }

        public MovePlayer(direction) {
            var response = this.Player.Move(direction);

            if (response.Success) {
                this.MarkSurroundVisited(this.Player.X, this.Player.Y);
                var tile = this.Tiles[this.Player.X][this.Player.Y];
                tile.IsVisited = true;

                var transport = mapTransports[tile.Type];
                if (transport) {
                    this.Transport(transport);
                    tile = this.Tiles[this.Player.X][this.Player.Y];
                    this.MarkSurroundVisited(this.Player.X, this.Player.Y);
                }

                if (tile.Story) {
                    if(this.visitedStories.indexOf(tile.Story.Id) != -1)
                        tile.Story = storiesTileMapping[tile.Story.Id+'2'];

                    this.Player.IsInStory = true;
                    if(twoStateStores.indexOf(tile.Story.Id) != -1 && this.visitedStories.indexOf(tile.Story.Id) == -1)
                        this.visitedStories.push(tile.Story.Id);
                } else {
                    this.Player.IsInStory = false;
                }
            }

            //console.log(this.Player);
            return response;
        }

        public GetCurrentStory():StoryModel {
            return this.Tiles[this.Player.X][this.Player.Y].Story;
        }

        public Reveal(){
            for(var i = 0; i< this.stateBackup.Tiles.length;i++){
                for (var j = 0; j< this.stateBackup.Tiles[i].length;j++){
                    this.stateBackup.Tiles[i][j].IsVisited = true;
                }
            }

            this.stateBackup.Tiles[6][9].AllowedMoves = [directions.Down];
        }

        private GenerateState() {
            var state = new StateModel();
            state.Player = this.clone(this.Player);
            state.Tiles = this.clone(this.Tiles);

            return state;
        }

        private Transport(transport) {
            var state = this.GenerateState();

            if (this.stateBackup) {
                var prevState = this.stateBackup;
                this.LoadState(prevState);
                this.stateBackup = null;
            } else {
                this.loadMap(transport.map, transport.movements);
                this.stateBackup = state;
            }

            for (var i = 0; i < transport.map.length; i++) {
                for (var j = 0; j < transport.map[i].length; j++) {
                    if (transport.map[i][j] == transport.tile) {
                        this.Player.X = j;
                        this.Player.Y = i;
                    }
                }
            }
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