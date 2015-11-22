module Cm2k15 {
    export class TileModel {
        public IsVisited: boolean;
        public IsPlayer: boolean;
        public Type: string;

        constructor(tileType: string) {
            this.IsVisited = false;
            this.IsPlayer = false;
            this.Type = tileType;
        }
    }
}