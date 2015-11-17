/// <reference path="Game.ts"/>
module Cm2k15 {
  var commandInput = <HTMLTextAreaElement>document.getElementById('command');
  var map = <HTMLDivElement>document.getElementById('map');
  var message = <HTMLDivElement>document.getElementById('message');
  var game = new Cm2k15.Game(map, commandInput, message);
}
