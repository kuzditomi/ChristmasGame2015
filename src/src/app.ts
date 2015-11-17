/// <reference path="Game.ts"/>

var commandInput = <HTMLTextAreaElement>document.getElementById('command');
var map = <HTMLDivElement>document.getElementById('map');

var game = new Cm2k15.Game(map, commandInput);

