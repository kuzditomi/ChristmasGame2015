/// <reference path="TileModel.ts"/>
/// <reference path="PlayerModel.ts"/>
/// <reference path="StoryModel.ts"/>
/// <reference path="MoveDirections.ts"/>

module Cm2k15 {
    var map: string[][];
    map = [
        ['-', '-', '-', '-', '-', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
        ['-', '-', '-', '-', '-', 'e9', 'e10', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16'],
        ['-', 'm1', 'm2', 'm3', '-', 'e17', 'e17', 'e19', 'e20', 'e21', 'e22', 'e23', 'e24'],
        ['-', 'm4', 'm5', 'm6', '-', '-', '-', '-', 'u5', '-', '-', '-', '-'],
        ['-', 'm7', 'm8', 'u1', 'u1', 'u1', 'u2', 'u1', 'u3', 'u1', 'u1', 'u4', '-'],
        ['-', 'u5', '-', '-', '-', '-', 'u5', '-', '-', '-', '-', 'h1', 'h1'],
        ['-', 'u5', '-', '-', 'g1', 'g2', 'g3', 'g4', 'g5', '-', '-', 'h3', 'h4'],
        ['-', 'u5', '-', '-', 'g6', 'g7', 'g8', 'g9', 'g10', 'k4', 'k1', 'k1', 'k1'],
        ['-', 'u5', '-', '-', 'g11', 'g12', 'g13', 'g14', 'g15', 'k2', '-', '-', '-'],
        ['-', 'i1', 'i2', '-', '-', '-', 'l', '-', 'f1', 'k2', '-', '-', '-'],
        ['-', 'i3', 'i4', 'i5', 'u1', 'u1', 'u6', '-', 'f2', 'k2', '-', '-', '-'],
        ['k1', 'k1', 'k1', 'k1', 'k1', 'k1', 'kb', 'k1', 'k1', 'k3', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    ];

    var canMoveOnMap: string[][];
    canMoveOnMap = [
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'd', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'du', '', '', '', '', '', ''],
        ['', '', '', 'r', 'lr', 'lr', 'udl', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'ud', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'u', '', '', '', '', '', ''],
    ];

    var storiesTileMapping: { [key: string]: StoryModel }
    storiesTileMapping = {
        'kb': {
            Id: 'kb',
            Story: 'Ez a bejárat!'
        }
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