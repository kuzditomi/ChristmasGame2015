/// <reference path="GameMap.ts"/>
/// <reference path="GamePlayer.ts"/>

module Cm2k15 {
  export class Game {

    private map: GameMap;
    private player: GamePlayer;
    private commands: { [key:string] : (args) => any };

    public constructor(map: HTMLDivElement, input: HTMLTextAreaElement) {
      console.log('game constructor');

      this.commands = {};
      this.player = new GamePlayer();
      this.map = new GameMap(map, this.player);
      this.map.Display();

      input.onkeydown = (e: KeyboardEvent) => {
        if (e.keyCode == 13) {
          var command = input.value;
          input.value = '';
          this.onCommand.call(this, command);
          return false;
        }
      };

      this.registerCommands();
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
        this.commands[command].apply(this, args);
      }
    }

    private moveCommand(direction) {
      this.player.Move(direction);
      this.map.Display();
    }
  }
}