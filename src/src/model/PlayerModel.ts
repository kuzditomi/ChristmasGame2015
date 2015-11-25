module Cm2k15 {
    export class PlayerMoveResult {
        public Success: boolean;
        public Message: string;
        public Story: StoryModel;
    }

    export class PlayerModel {
        public X: number;
        public Y: number;

        public Move(direction: string) : PlayerMoveResult {
            var result = new PlayerMoveResult();
            result.Success = false;

            switch (direction) {
                case directions.Up:
                    this.Y--;
                    break;
                case directions.Down:
                    this.Y++;
                    break;
                case directions.Left:
                    this.X--;
                    break;
                case directions.Right:
                    this.X++;
                    break;
                default:
                    result.Success = false;
                    result.Message = 'Move where?';
                    return result;
            }

            result.Success = true;
            result.Message = "You have moved " + direction + ".";
            return result;
        }
    }
} 