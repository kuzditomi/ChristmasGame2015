/// <reference path="model/MapModel.ts"/>
/// <reference path="view/MapView.ts"/>
/// <reference path="view/RoomView.ts"/>

module Cm2k15 {
  export class Game {
    private mapView: MapView;
    private mapModel: MapModel;

    private roomView: RoomView;
     
    private commands: { [key: string]: (args) => any };
    
    private messageElement: HTMLDivElement;

    public constructor() {
      // get dom elements
      var input = <HTMLTextAreaElement>document.getElementById('command');
      var message = <HTMLDivElement>document.getElementById('message');
      this.messageElement = message;

      // initialize state and commands
      this.mapModel = new MapModel(20,20);
      this.commands = {};
      this.registerCommands();

      // subscribe events      
      input.onkeydown = (e: KeyboardEvent) => {
        if (e.keyCode == 13) {
          var command = input.value;
          input.value = '';
          this.onCommand.call(this, command);
          return false;
        }
      };

      // create map view
      this.mapView = new MapView(this.mapModel);
      this.mapView.Display();

      this.roomView = new RoomView();
    }

    private registerCommands() {
      this.registerCommand('move', this.moveCommand);
    }

    private registerCommand(key: string, command: (args) => any) {
      this.commands[key] = command.bind(this);
    }

    private onCommand(text) {
      var parts = text.split(" ");
      var command = parts[0];
      var args = parts.length > 1 ? parts.splice(1, parts.length - 1) : [];
      if (this.commands[command]) {
        var result = this.commands[command].apply(this, args);
        this.message(result);
      } else {
        this.messageNoCommand();
      }
    }

    private moveCommand(direction) {
      var result = this.mapModel.MovePlayer(direction);
      var tile = this.mapModel.Tiles[this.mapModel.Player.X][this.mapModel.Player.Y];
      tile.IsVisited = true;

      this.roomView.Draw(tile.Room);
      this.mapView.Display();

      return result;
    }

    private message(text: string) {
      if (text) {
        var row = document.createElement('div');
        row.innerText = text;

        this.messageElement.appendChild(row);
        this.messageElement.scrollTop = this.messageElement.scrollHeight - this.messageElement.clientHeight;
      }
    }

    private messageNoCommand() {
      var messages = [
        "what?",
        "uhm...",
        "nope",
        "i dont think so"
      ];

      var message = messages[Math.floor(Math.random() * messages.length)];
      this.message(message);
    }
  }
}