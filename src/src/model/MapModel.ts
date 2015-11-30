/// <reference path="TileModel.ts"/>
/// <reference path="PlayerModel.ts"/>
/// <reference path="StoryModel.ts"/>
/// <reference path="MoveDirections.ts"/>
/// <reference path="../data/maps.ts"/>

module Cm2k15 {
    var storiesTileMapping: { [key: string]: StoryModel }
    storiesTileMapping = {
        'kb': new StoryModel('kb',
            'Ez a bejárat!'
        )
    };

    export class MapModel {
        public Tiles: TileModel[][];
        public Player: PlayerModel;
        
        public Width: number; 
        public Height: number;

        constructor() {
            this.Width = map.length;
            this.Height = map.length;

            this.Tiles = [];

            for (var i = 0; i < this.Height; i++) {
                this.Tiles[i] = [];
                for (var j = 0; j < this.Width; j++) {
                    var tile = new TileModel(map[j][i]);
                    
                    tile.AllowMovementInDirections(this.getDirections(j, i));
                    tile.Story = storiesTileMapping[tile.Type];

                    this.Tiles[i][j] = tile;
                }
            }

            this.Player = new PlayerModel();
            this.Player.X = 6;
            this.Player.Y = 12;

            this.MarkSurroundVisited(this.Player.X, this.Player.Y);
        }

        private movementMap = {
            'u': Cm2k15.directions.Up,
            'd': Cm2k15.directions.Down,
            'l': Cm2k15.directions.Left,
            'r': Cm2k15.directions.Right
        }

        private getDirections(x: number, y: number): string[] {
            var movementCell = canMoveOnMap[x][y];
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
                }
            }

            return response;
        }

        private MarkSurroundVisited(x: number, y: number) {
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

        private MarkVisitied(x: number, y: number) {
            if (this.Tiles[x] && this.Tiles[x][y])
                this.Tiles[x][y].IsVisited = true;
        }
    }
}