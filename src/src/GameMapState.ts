module Cm2k15 {
    var directions = {
        Top : 'up',
        Right: 'right',
        Bottom: 'down',
        Left: 'left'
    };


    export class GameMapState {
        public Tiles: TileState[][];
        public Player: PlayerState;

        public Width: number;
        public Height: number;

        constructor(width:number, height:number) {
            this.Width = width;
            this.Height = height;

            this.Tiles = [];
            for (var i = 0; i < height; i++) {
                this.Tiles[i] = [];
                for (var j = 0; j < width; j++) {
                    this.Tiles[i][j] = new TileState();
                }
            }

            this.Player = new PlayerState();
            this.Player.X = 2;
            this.Player.Y = 2;

            this.Tiles[this.Player.X][this.Player.Y].Visited = true;
        }

        public MovePlayer(direction){
            if((this.Player.X == 0 && direction == directions.Left)||
                (this.Player.Y == 0 && direction == directions.Top)||
                (this.Player.X == this.Width-1 && direction == directions.Right)||
                (this.Player.Y == this.Height-1 && direction == directions.Bottom)){
                return "You can't leave this area, turn around!";
            } else {
                return this.Player.Move(direction);
            }
        }
    }

    class TileState {
        public Visited: boolean;

        constructor() {
            this.Visited = false;
        }
    }

    class PlayerState {
        public X: number;
        public Y: number;

        public Move(direction: string) {
            switch (direction) {
                case directions.Top:
                    this.Y--;
                    break;
                case directions.Bottom:
                    this.Y++;
                    break;
                case directions.Left:
                    this.X--;
                    break;
                case directions.Right:
                    this.X++;
                    break;
                default:
                    return 'Move where?';
            }

            return "You have moved " + direction + ".";
        }
    }
}