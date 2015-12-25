/// <reference path="model/MapModel.ts"/>
/// <reference path="view/MapView.ts"/>
/// <reference path="view/StoryView.ts"/>
/// <reference path="StoryLineSetter.ts"/>

module Cm2k15 {
    export interface IGameAgent {
        Draw();
        ReloadMap();
        RevealMap();
    }

    export class Game {
        private mapView:MapView;
        private mapModel:MapModel;

        private storyView:StoryView;
        private storyLineSetter:StoryLineSetter;

        private commands:{ [key: string]: (args) => any };

        public constructor() {
            // initialize state and commands
            this.mapModel = new MapModel();
            this.commands = {};
            this.registerCommands();

            // create map view
            this.mapView = new MapView(this.mapModel);
            this.storyView = new StoryView();
            this.Draw();

            var agent:IGameAgent = {
                Draw: () => this.Draw(),
                ReloadMap: () => this.mapModel.ReloadMap.call(this.mapModel),
                RevealMap: () => this.RevealMap()
            };

            this.storyLineSetter = new StoryLineSetter(agent);
        }

        private registerCommands() {
            var that = this;
            this.registerCommand('move', this.moveCommand);

            document.addEventListener('keyup', function (e:any) {
                switch (e.keyCode) {
                    case 37:
                        that.onCommand('move ' + Cm2k15.directions.Left);
                        break;
                    case 38:
                        that.onCommand('move ' + Cm2k15.directions.Up);
                        break;
                    case 39:
                        that.onCommand('move ' + Cm2k15.directions.Right);
                        break;
                    case 40:
                        that.onCommand('move ' + Cm2k15.directions.Down);
                        break;
                }
            });

            document.getElementById('move-up-command').onclick = () => {
                this.onCommand('move ' + Cm2k15.directions.Up);
            };
            document.getElementById('move-down-command').onclick = () => {
                this.onCommand('move ' + Cm2k15.directions.Down);
            };
            document.getElementById('move-right-command').onclick = () => {
                this.onCommand('move ' + Cm2k15.directions.Right);
            };
            document.getElementById('move-left-command').onclick = () => {
                this.onCommand('move ' + Cm2k15.directions.Left);
            };
        }

        private registerCommand(key:string, command:(args) => any) {
            this.commands[key] = command.bind(this);
        }

        private onCommand(text) {
            var parts = text.split(" ");
            var command = parts[0];
            var args = parts.length > 1 ? parts.splice(1, parts.length - 1) : [];
            if (this.commands[command]) {
                this.commands[command].apply(this, args);
            }
        }

        private moveCommand(direction) {
            //if (this.mapModel.Player.IsInStory)
            //  return;

            var currentTile = this.mapModel.Tiles[this.mapModel.Player.X][this.mapModel.Player.Y];
            if (currentTile.AllowedMoves.indexOf(direction) == -1)
                return 'erre nem mehetsz';

            var result = this.mapModel.MovePlayer(direction);
            if (!result.Success) {
                return result.Message;
            }

            var story = this.mapModel.GetCurrentStory();
            this.Draw();

            this.storyLineSetter.UpdateBy(story);
        }

        private Draw() {
            var story = this.mapModel.GetCurrentStory();
            this.storyView.Draw(story);
            this.mapView.Draw();
        }

        private RevealMap() {
            this.mapModel.Reveal();
        }
    }
}