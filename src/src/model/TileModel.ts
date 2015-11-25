/// <reference path="MoveDirections.ts"/>

module Cm2k15 {
    export class TileModel {
        public IsVisited: boolean;
        public IsPlayer: boolean;
        public Type: string;
        public AllowedMoves: string[];
        public Story: StoryModel;

        constructor(tileType: string) {
            this.IsVisited = false;
            this.IsPlayer = false;
            this.Type = tileType;
            this.AllowedMoves = [];
        }

        public AllowMovementInDirection(direction: string) {
            var directionValues = Object.keys(Cm2k15.directions).map(k => Cm2k15.directions[k]);
            if (directionValues.indexOf(direction) != -1 && this.AllowedMoves.indexOf(direction) == -1)
                this.AllowedMoves.push(direction);
        }

        public AllowMovementInDirections(directions: string[]) {
            for (var i = 0; i < directions.length; i++) {
                this.AllowMovementInDirection(directions[i]);
            }
        }
    }
}