var Cm2k15;
(function (Cm2k15) {
    Cm2k15.directions = {
        Up: 'up',
        Right: 'right',
        Down: 'down',
        Left: 'left'
    };
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="MoveDirections.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var TileModel = (function () {
        function TileModel(tileType) {
            this.IsVisited = false;
            this.IsPlayer = false;
            this.Type = tileType;
            this.AllowedMoves = [];
        }
        TileModel.prototype.AllowMovementInDirection = function (direction) {
            var directionValues = Object.keys(Cm2k15.directions).map(function (k) { return Cm2k15.directions[k]; });
            if (directionValues.indexOf(direction) != -1 && this.AllowedMoves.indexOf(direction) == -1)
                this.AllowedMoves.push(direction);
        };
        TileModel.prototype.AllowMovementInDirections = function (directions) {
            for (var i = 0; i < directions.length; i++) {
                this.AllowMovementInDirection(directions[i]);
            }
        };
        return TileModel;
    })();
    Cm2k15.TileModel = TileModel;
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    var PlayerMoveResult = (function () {
        function PlayerMoveResult() {
        }
        return PlayerMoveResult;
    })();
    Cm2k15.PlayerMoveResult = PlayerMoveResult;
    var PlayerModel = (function () {
        function PlayerModel(player) {
            if (player === void 0) { player = null; }
            if (player) {
                this.X = player.X;
                this.Y = player.Y;
                this.IsInStory = player.IsInStory;
            }
        }
        PlayerModel.prototype.Move = function (direction) {
            var result = new PlayerMoveResult();
            result.Success = false;
            switch (direction) {
                case Cm2k15.directions.Up:
                    this.Y--;
                    break;
                case Cm2k15.directions.Down:
                    this.Y++;
                    break;
                case Cm2k15.directions.Left:
                    this.X--;
                    break;
                case Cm2k15.directions.Right:
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
        };
        return PlayerModel;
    })();
    Cm2k15.PlayerModel = PlayerModel;
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    var StoryModel = (function () {
        function StoryModel(id, story) {
            this.Id = id;
            this.Story = story;
        }
        return StoryModel;
    })();
    Cm2k15.StoryModel = StoryModel;
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    Cm2k15.ignoreTiles = [];
    Cm2k15.gamemap = [
        ['-', '-', '-', '-', '-', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
        ['-', '-', '-', '-', '-', 'e9', 'e10', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16'],
        ['-', 'm1', 'm2', 'm3', '-', 'e17', 'e17', 'e19', 'e20', 'e21', 'e22', 'e23', 'e24'],
        ['-', 'm4', 'm5', 'm6', '-', '-', '-', '-', 'u5', '-', '-', '-', '-'],
        ['-', 'm7', 'm8', 'u1v', 'u1', 'u1', 'u2', 'u1', 'u3', 'u1', 'u1', 'u4', '-'],
        ['-', 'u5v', '-', '-', '-', '-', 'u5g', '-', '-', '-', '-', 'h1', 'h2'],
        ['-', 'u5', '-', '-', 'g1', 'g2', 'g3', 'g4', 'g5', '-', '-', 'h3', 'h4'],
        ['-', 'u5', '-', '-', 'g6', 'g7', 'g8', 'g9', 'g10', 'k4', 'k1', 'k1', 'k1'],
        ['-', 'u5b', '-', '-', 'g11', 'g12', 'g13', 'g14', 'g15', 'k2', '-', '-', '-'],
        ['-', 'i1', 'i2', '-', '-', '-', 'l', '-', 'f1', 'k2', '-', '-', '-'],
        ['-', 'i3', 'i4', 'i5', 'u1b', 'u1', 'u6', '-', 'f2', 'k2', '-', '-', '-'],
        ['k1', 'k1', 'k1', 'k1', 'k1', 'k1', 'kb', 'k1', 'k1', 'k3', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    ];
    Cm2k15.canMoveOnMap = [
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', 'd', '', '', '', ''],
        ['', '', '', '', '', '', '', '', 'ud', '', '', '', ''],
        ['', '', 'r', 'lr', 'lr', 'lr', 'lrd', 'rl', 'ulr', 'rl', 'rl', 'dl', ''],
        ['', 'ud', '', '', '', '', 'ud', '', '', '', '', 'u', ''],
        ['', 'ud', '', '', '', '', 'u', '', '', '', '', '', ''],
        ['', 'ud', '', '', '', '', '', '', '', '', '', '', ''],
        ['', 'ud', '', '', '', '', 'd', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'du', '', '', '', '', '', ''],
        ['', '', '', 'r', 'lr', 'lr', 'ul', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'u', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'u', '', '', '', '', '', ''],
    ];
    Cm2k15.factorymap = [
        ['-', 'texit', '-'],
        ['tl', 'tm', 'tr'],
        ['bl', 'bm', 'br'],
        ['-', 'bexit', '-']
    ];
    Cm2k15.canMoveOnFactoryMap = [
        ['', '', ''],
        ['r', 'udlr', 'l'],
        ['r', 'udlr', 'l'],
        ['', 'u', '']
    ];
    Cm2k15.ignoreTiles = Cm2k15.ignoreTiles.concat(['texit', 'bexit', 'tl', 'tm', 'tr', 'bl', 'bm', 'br', 'bexit']);
    Cm2k15.villagemap = [
        ["m", "rexitv"],
        ["bexitv", "-"],
    ];
    Cm2k15.canMoveOnVillageMap = [
        ['dr', ''],
        ['', '']
    ];
    Cm2k15.ignoreTiles = Cm2k15.ignoreTiles.concat(['m', 'rexitv', 'bexitv']);
    Cm2k15.barnmap = [
        ["texitb", "-"],
        ["b", "rexitb"],
    ];
    Cm2k15.canMoveOnBarnMap = [
        ['', ''],
        ['r', '']
    ];
    Cm2k15.ignoreTiles = Cm2k15.ignoreTiles.concat(['b', 'texitb', 'rexitb']);
    Cm2k15.mapTransports = {
        // map => factorymap
        'g13': { map: Cm2k15.factorymap, movements: Cm2k15.canMoveOnFactoryMap, tile: 'bexit' },
        'g3': { map: Cm2k15.factorymap, movements: Cm2k15.canMoveOnFactoryMap, tile: 'tm' },
        // map => villagemap
        'm8': { map: Cm2k15.villagemap, movements: Cm2k15.canMoveOnVillageMap, tile: 'm' },
        'm7': { map: Cm2k15.villagemap, movements: Cm2k15.canMoveOnVillageMap, tile: 'm' },
        // map => barnmap
        'i1': { map: Cm2k15.barnmap, movements: Cm2k15.canMoveOnBarnMap, tile: 'b' },
        'i5': { map: Cm2k15.barnmap, movements: Cm2k15.canMoveOnBarnMap, tile: 'b' },
        // factorymap => map
        'bexit': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'l' },
        'texit': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'u5g' },
        // villagemap => map
        'rexitv': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'u1v' },
        'bexitv': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'u5v' },
        // barnmap => map
        'rexitb': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'u1b' },
        'texitb': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'u5b' }
    };
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    Cm2k15.storiesTileMapping = {
        'kb': new Cm2k15.StoryModel('kb', 'Üdv a játékban. Nyertél egy jegyet a Mikulásgyárba, találkozhatsz sok varázslattal, és ha jó voltál, még ajándékot is kaphatsz.'),
        'b': new Cm2k15.StoryModel('i5', 'Ez az istálló, innen indul és érkezik a télapó. A manók épp takarítanak, tankolnak, polírozzák Rudolf orrát. Üresnek találod, még nem érkezett el az idő az indulásra.'),
        'bexit': new Cm2k15.StoryModel('bexit', 'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'),
        'bm': new Cm2k15.StoryModel('bm', 'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslaT..'),
        'bexit2': new Cm2k15.StoryModel('bexit2', 'Ez a bejárat a gyárba.'),
        'tl': new Cm2k15.StoryModel('tl', 'MAGIC!'),
        'tm': new Cm2k15.StoryModel('tm', 'Jobbra festegethesz, balra pedig minden értelmet nyer. Az meg a hátsó kijárat az erdő felé.'),
        'tr': new Cm2k15.StoryModel('tr', 'Ez a festős szoba.'),
        'bl': new Cm2k15.StoryModel('bl', 'Ez itt a raktár szoba.'),
        'br': new Cm2k15.StoryModel('br', 'Ez itt a szerelős szoba.'),
        'm': new Cm2k15.StoryModel('m', 'Manó falva'),
        'e20': new Cm2k15.StoryModel('e20', 'Erdeő'),
        'h1': new Cm2k15.StoryModel('h1', 'Tavacska')
    };
    Cm2k15.twoStateStores = ["bexit"];
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="TileModel.ts"/>
/// <reference path="PlayerModel.ts"/>
/// <reference path="StoryModel.ts"/>
/// <reference path="MoveDirections.ts"/>
/// <reference path="../data/maps.ts"/>
/// <reference path="../data/stories.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var MapModel = (function () {
        function MapModel() {
            this.movementMap = {
                'u': Cm2k15.directions.Up,
                'd': Cm2k15.directions.Down,
                'l': Cm2k15.directions.Left,
                'r': Cm2k15.directions.Right
            };
            this.loadMap(Cm2k15.gamemap, Cm2k15.canMoveOnMap);
            this.Player = new Cm2k15.PlayerModel();
            this.Player.X = 6;
            this.Player.Y = 12;
            this.MarkSurroundVisited(this.Player.X, this.Player.Y);
            this.visitedStories = [];
        }
        MapModel.prototype.loadMap = function (map, movements) {
            this.Width = map.length;
            this.Height = map[0].length;
            this.Tiles = [];
            for (var i = 0; i < this.Height; i++) {
                this.Tiles[i] = [];
                for (var j = 0; j < this.Width; j++) {
                    var tile = new Cm2k15.TileModel(map[j][i]);
                    tile.AllowMovementInDirections(this.getDirections(movements, j, i));
                    tile.Story = Cm2k15.storiesTileMapping[tile.Type];
                    this.Tiles[i][j] = tile;
                }
            }
        };
        MapModel.prototype.getDirections = function (movements, x, y) {
            var _this = this;
            var movementCell = movements[x][y];
            var result = movementCell.split('').map(function (d) { return _this.movementMap[d]; });
            return result;
        };
        MapModel.prototype.MovePlayer = function (direction) {
            var response = this.Player.Move(direction);
            if (response.Success) {
                this.MarkSurroundVisited(this.Player.X, this.Player.Y);
                var tile = this.Tiles[this.Player.X][this.Player.Y];
                tile.IsVisited = true;
                var transport = Cm2k15.mapTransports[tile.Type];
                if (transport) {
                    this.Transport(transport);
                    tile = this.Tiles[this.Player.X][this.Player.Y];
                    this.MarkSurroundVisited(this.Player.X, this.Player.Y);
                }
                if (tile.Story) {
                    if (this.visitedStories.indexOf(tile.Story.Id) != -1)
                        tile.Story = Cm2k15.storiesTileMapping[tile.Story.Id + '2'];
                    response.Story = tile.Story;
                    this.Player.IsInStory = true;
                    if (Cm2k15.twoStateStores.indexOf(tile.Story.Id) != -1 && this.visitedStories.indexOf(tile.Story.Id) == -1)
                        this.visitedStories.push(tile.Story.Id);
                }
                else {
                    this.Player.IsInStory = false;
                }
            }
            //console.log(this.Player);
            return response;
        };
        MapModel.prototype.GenerateState = function () {
            var state = new Cm2k15.StateModel();
            state.Player = this.clone(this.Player);
            state.Tiles = this.clone(this.Tiles);
            return state;
        };
        MapModel.prototype.Transport = function (transport) {
            var state = this.GenerateState();
            if (this.stateBackup) {
                var prevState = this.stateBackup;
                this.LoadState(prevState);
                this.stateBackup = null;
            }
            else {
                this.loadMap(transport.map, transport.movements);
                this.stateBackup = state;
            }
            for (var i = 0; i < transport.map.length; i++) {
                for (var j = 0; j < transport.map[i].length; j++) {
                    if (transport.map[i][j] == transport.tile) {
                        this.Player.X = j;
                        this.Player.Y = i;
                    }
                }
            }
        };
        MapModel.prototype.LoadState = function (state) {
            this.Player = new Cm2k15.PlayerModel(state.Player);
            this.Tiles = state.Tiles;
        };
        MapModel.prototype.MarkSurroundVisited = function (x, y) {
            this.MarkVisitied(x, y);
            this.MarkVisitied(x - 1, y);
            this.MarkVisitied(x + 1, y);
            this.MarkVisitied(x, y - 1);
            this.MarkVisitied(x - 1, y - 1);
            this.MarkVisitied(x + 1, y - 1);
            this.MarkVisitied(x, y + 1);
            this.MarkVisitied(x - 1, y + 1);
            this.MarkVisitied(x + 1, y + 1);
        };
        MapModel.prototype.MarkVisitied = function (x, y) {
            if (this.Tiles[x] && this.Tiles[x][y])
                this.Tiles[x][y].IsVisited = true;
        };
        MapModel.prototype.clone = function (obj) {
            var oldState = history.state;
            history.replaceState(obj, null);
            var clonedObj = history.state;
            history.replaceState(oldState, null);
            return clonedObj;
        };
        return MapModel;
    })();
    Cm2k15.MapModel = MapModel;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="../model/TileModel.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var TileView = (function () {
        function TileView(row, col, size, element, model) {
            this.element = element;
            this.content = '';
            this.initialize(row, col, size);
        }
        TileView.prototype.initialize = function (row, col, size) {
            this.element.style.top = row * size + 'px';
            this.element.style.left = col * size + 'px';
            this.element.style.width = this.element.style.height = size + 'px';
            this.element.className = 'tile';
        };
        TileView.prototype.Display = function (model) {
            var classes = ['tile'];
            if (model.IsVisited && Cm2k15.ignoreTiles.indexOf(model.Type) == -1) {
                classes.push("tile-" + model.Type);
            }
            else {
                classes.push('dark');
            }
            if (model.IsPlayer) {
                classes.push("player");
            }
            this.element.className = classes.join(' ');
        };
        return TileView;
    })();
    Cm2k15.TileView = TileView;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="TileView.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var MapView = (function () {
        function MapView(model) {
            // constants
            this.tileCount = 13;
            console.log('gamemap constructor');
            var mapElement = document.getElementById('map');
            // initialize game state
            this.model = model;
            // create tile views 
            var mapWidth = mapElement.clientWidth;
            var tileSize = mapWidth / this.tileCount;
            this.tiles = [];
            for (var i = 0; i < this.tileCount; i++) {
                this.tiles.push([]);
                for (var j = 0; j < this.tileCount; j++) {
                    var element = document.createElement('div');
                    this.tiles[i][j] = new Cm2k15.TileView(i, j, tileSize, element, this.model.Tiles[j][i]);
                    mapElement.appendChild(element);
                }
            }
        }
        MapView.prototype.Display = function () {
            // scrolling mechanism
            //var middle = Math.floor(this.tileCount / 2);
            //var left = this.model.Player.X < (middle) ? 0
            //  : this.model.Player.X > (this.model.Width - 1 - middle) ? this.model.Width - this.tileCount
            //    : this.model.Player.X - middle;
            //var top = this.model.Player.Y < (middle) ? 0
            //  : this.model.Player.Y > (this.model.Height - 1 - middle) ? this.model.Height - this.tileCount
            //  : this.model.Player.Y - middle;
            for (var i = 0; i < this.model.Tiles.length; i++) {
                for (var j = 0; j < this.model.Tiles[i].length; j++) {
                    var tile = this.tiles[j][i];
                    if (this.model.Player.X == i && this.model.Player.Y == j) {
                        this.model.Tiles[i][j].IsPlayer = true;
                    }
                    else {
                        this.model.Tiles[i][j].IsPlayer = false;
                    }
                    tile.Display(this.model.Tiles[i][j]);
                }
            }
            var currentTile = this.model.Tiles[this.model.Player.X][this.model.Player.Y];
            //console.log(currentTile);
            Object.keys(Cm2k15.directions).forEach(function (key) {
                var direction = Cm2k15.directions[key];
                var allowed = currentTile.AllowedMoves.indexOf(direction) !== -1;
                var moveButton = document.getElementById("move-" + direction + "-command");
                moveButton.style.display = allowed ? 'inline-block' : 'none';
            });
        };
        return MapView;
    })();
    Cm2k15.MapView = MapView;
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    var StoryView = (function () {
        function StoryView() {
            this.storyElement = document.getElementById('story');
            this.storyImageElement = document.getElementById('story-image');
        }
        StoryView.prototype.Draw = function (model) {
            if (!model) {
                this.storyElement.innerText = "";
                this.storyImageElement.style.display = 'none';
                this.storyImageElement.className = '';
                return;
            }
            this.storyElement.innerText = model.Story;
            this.storyImageElement.style.display = 'inline-block';
            this.storyImageElement.style.zIndex = '2';
            this.storyImageElement.className = 'story-' + model.Id;
        };
        return StoryView;
    })();
    Cm2k15.StoryView = StoryView;
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    var StoryLineSetter = (function () {
        function StoryLineSetter() {
        }
        StoryLineSetter.prototype.UpdateBy = function (story) {
            if (story && story.Id == 'tm')
                Cm2k15.canMoveOnBarnMap[1][0] += 'u';
        };
        return StoryLineSetter;
    })();
    Cm2k15.StoryLineSetter = StoryLineSetter;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="model/MapModel.ts"/>
/// <reference path="view/MapView.ts"/>
/// <reference path="view/StoryView.ts"/>
/// <reference path="StoryLineSetter.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var Game = (function () {
        function Game() {
            // initialize state and commands
            this.mapModel = new Cm2k15.MapModel();
            this.commands = {};
            this.registerCommands();
            // create map view
            this.mapView = new Cm2k15.MapView(this.mapModel);
            this.mapView.Display();
            this.storyView = new Cm2k15.StoryView();
            this.storyLineSetter = new Cm2k15.StoryLineSetter();
        }
        Game.prototype.registerCommands = function () {
            var _this = this;
            this.registerCommand('move', this.moveCommand);
            document.getElementById('move-up-command').onclick = function () {
                _this.onCommand('move ' + Cm2k15.directions.Up);
            };
            document.getElementById('move-down-command').onclick = function () {
                _this.onCommand('move ' + Cm2k15.directions.Down);
            };
            document.getElementById('move-right-command').onclick = function () {
                _this.onCommand('move ' + Cm2k15.directions.Right);
            };
            document.getElementById('move-left-command').onclick = function () {
                _this.onCommand('move ' + Cm2k15.directions.Left);
            };
        };
        Game.prototype.registerCommand = function (key, command) {
            this.commands[key] = command.bind(this);
        };
        Game.prototype.onCommand = function (text) {
            var parts = text.split(" ");
            var command = parts[0];
            var args = parts.length > 1 ? parts.splice(1, parts.length - 1) : [];
            if (this.commands[command]) {
                this.commands[command].apply(this, args);
            }
        };
        Game.prototype.moveCommand = function (direction) {
            //if (this.mapModel.Player.IsInStory)
            //  return;
            var currentTile = this.mapModel.Tiles[this.mapModel.Player.X][this.mapModel.Player.Y];
            if (currentTile.AllowedMoves.indexOf(direction) == -1)
                return 'erre nem mehetsz';
            var result = this.mapModel.MovePlayer(direction);
            if (!result.Success) {
                return result.Message;
            }
            this.storyLineSetter.UpdateBy(result.Story);
            this.storyView.Draw(result.Story);
            this.mapView.Display();
            return result.Message + ((result.Story && ('</br>' + result.Story.Story)) || '');
        };
        return Game;
    })();
    Cm2k15.Game = Game;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="Game.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var game = new Cm2k15.Game();
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    var StateModel = (function () {
        function StateModel() {
        }
        return StateModel;
    })();
    Cm2k15.StateModel = StateModel;
})(Cm2k15 || (Cm2k15 = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJTdG9yeUxpbmVTZXR0ZXIudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLmdldERpcmVjdGlvbnMiLCJDbTJrMTUuTWFwTW9kZWwuTW92ZVBsYXllciIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRpc3BsYXkiLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLmNvbnN0cnVjdG9yIiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5VcGRhdGVCeSIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtLQUNiQSxDQUFDQTtBQUNKQSxDQUFDQSxFQVBNLE1BQU0sS0FBTixNQUFNLFFBT1o7QUNQRCx5Q0FBeUM7QUFFekMsSUFBTyxNQUFNLENBMkJaO0FBM0JELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFPSUMsbUJBQVlBLFFBQWdCQTtZQUN4QkMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRU1ELDRDQUF3QkEsR0FBL0JBLFVBQWdDQSxTQUFpQkE7WUFDN0NFLElBQUlBLGVBQWVBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLENBQUNBLElBQUlBLE9BQUFBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLEVBQXBCQSxDQUFvQkEsQ0FBQ0EsQ0FBQ0E7WUFDcEZBLEVBQUVBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2RkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLENBQUNBO1FBRU1GLDZDQUF5QkEsR0FBaENBLFVBQWlDQSxVQUFvQkE7WUFDakRHLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFVBQVVBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqREEsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFDTEgsZ0JBQUNBO0lBQURBLENBekJBRCxBQXlCQ0MsSUFBQUQ7SUF6QllBLGdCQUFTQSxZQXlCckJBLENBQUFBO0FBQ0xBLENBQUNBLEVBM0JNLE1BQU0sS0FBTixNQUFNLFFBMkJaO0FDN0JELElBQU8sTUFBTSxDQWdEWjtBQWhERCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ1hBO1FBQUFLO1FBSUFDLENBQUNBO1FBQURELHVCQUFDQTtJQUFEQSxDQUpBTCxBQUlDSyxJQUFBTDtJQUpZQSx1QkFBZ0JBLG1CQUk1QkEsQ0FBQUE7SUFFREE7UUFLSU8scUJBQW1CQSxNQUEwQkE7WUFBMUJDLHNCQUEwQkEsR0FBMUJBLGFBQTBCQTtZQUN6Q0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1JBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUN0Q0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFTUQsMEJBQUlBLEdBQVhBLFVBQVlBLFNBQWlCQTtZQUN6QkUsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUNwQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFdkJBLE1BQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQkEsS0FBS0EsaUJBQVVBLENBQUNBLEVBQUVBO29CQUNkQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDVEEsS0FBS0EsQ0FBQ0E7Z0JBQ1ZBLEtBQUtBLGlCQUFVQSxDQUFDQSxJQUFJQTtvQkFDaEJBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO29CQUNUQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsaUJBQVVBLENBQUNBLElBQUlBO29CQUNoQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ1RBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxpQkFBVUEsQ0FBQ0EsS0FBS0E7b0JBQ2pCQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDVEEsS0FBS0EsQ0FBQ0E7Z0JBQ1ZBO29CQUNJQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDdkJBLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLGFBQWFBLENBQUNBO29CQUMvQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDdEJBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO1lBQ3RCQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxpQkFBaUJBLEdBQUdBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3JEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNsQkEsQ0FBQ0E7UUFDTEYsa0JBQUNBO0lBQURBLENBeENBUCxBQXdDQ08sSUFBQVA7SUF4Q1lBLGtCQUFXQSxjQXdDdkJBLENBQUFBO0FBQ0xBLENBQUNBLEVBaERNLE1BQU0sS0FBTixNQUFNLFFBZ0RaO0FDaERELElBQU8sTUFBTSxDQVVaO0FBVkQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYQTtRQUlJVSxvQkFBWUEsRUFBVUEsRUFBRUEsS0FBYUE7WUFDakNDLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2JBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUNMRCxpQkFBQ0E7SUFBREEsQ0FSQVYsQUFRQ1UsSUFBQVY7SUFSWUEsaUJBQVVBLGFBUXRCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQVZNLE1BQU0sS0FBTixNQUFNLFFBVVo7QUNWRCxJQUFPLE1BQU0sQ0ErR1o7QUEvR0QsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQW1CQUEsa0JBQVdBLEdBQWFBLEVBQUVBLENBQUNBO0lBRXRDQSxjQUFPQSxHQUFHQTtRQUNOQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDaEZBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ3BGQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDN0VBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3ZFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzlFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDMUVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekRBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdkRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUMzREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0lBQ0ZBLDBCQUFtQkEsR0FBR0E7UUFDbEJBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ1pBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ2xCQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7S0FDaEJBLENBQUNBO0lBQ0ZBLGtCQUFXQSxHQUFHQSxrQkFBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBQ0EsT0FBT0EsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFMUZBLGlCQUFVQSxHQUFHQTtRQUNUQSxDQUFDQSxHQUFHQSxFQUFFQSxRQUFRQSxDQUFDQTtRQUNmQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNsQkEsQ0FBQ0E7SUFDRkEsMEJBQW1CQSxHQUFHQTtRQUNsQkEsQ0FBQ0EsSUFBSUEsRUFBQ0EsRUFBRUEsQ0FBQ0E7UUFDVEEsQ0FBQ0EsRUFBRUEsRUFBQ0EsRUFBRUEsQ0FBQ0E7S0FDVkEsQ0FBQ0E7SUFDRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFDQSxRQUFRQSxFQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUxREEsY0FBT0EsR0FBR0E7UUFDTkEsQ0FBQ0EsUUFBUUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDZkEsQ0FBQ0EsR0FBR0EsRUFBRUEsUUFBUUEsQ0FBQ0E7S0FDbEJBLENBQUNBO0lBQ0ZBLHVCQUFnQkEsR0FBR0E7UUFDZkEsQ0FBQ0EsRUFBRUEsRUFBQ0EsRUFBRUEsQ0FBQ0E7UUFDUEEsQ0FBQ0EsR0FBR0EsRUFBQ0EsRUFBRUEsQ0FBQ0E7S0FDWEEsQ0FBQ0E7SUFDRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFDQSxRQUFRQSxFQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUxREEsb0JBQWFBLEdBQUdBO1FBQ1pBLG9CQUFvQkE7UUFDcEJBLEtBQUtBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGlCQUFVQSxFQUFFQSxTQUFTQSxFQUFFQSwwQkFBbUJBLEVBQUdBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBO1FBQzFFQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxpQkFBVUEsRUFBRUEsU0FBU0EsRUFBRUEsMEJBQW1CQSxFQUFHQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQTtRQUV0RUEsb0JBQW9CQTtRQUNwQkEsSUFBSUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsaUJBQVVBLEVBQUVBLFNBQVNBLEVBQUVBLDBCQUFtQkEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUE7UUFDcEVBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGlCQUFVQSxFQUFFQSxTQUFTQSxFQUFFQSwwQkFBbUJBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBO1FBRXBFQSxpQkFBaUJBO1FBQ2pCQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxjQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSx1QkFBZ0JBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBO1FBQzlEQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxjQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSx1QkFBZ0JBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBO1FBRTlEQSxvQkFBb0JBO1FBQ3BCQSxPQUFPQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxjQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSxtQkFBWUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUE7UUFDN0RBLE9BQU9BLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGNBQU9BLEVBQUVBLFNBQVNBLEVBQUVBLG1CQUFZQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQTtRQUUvREEsb0JBQW9CQTtRQUNwQkEsUUFBUUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsY0FBT0EsRUFBRUEsU0FBU0EsRUFBRUEsbUJBQVlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBO1FBQ2hFQSxRQUFRQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxjQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSxtQkFBWUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUE7UUFFaEVBLGlCQUFpQkE7UUFDakJBLFFBQVFBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGNBQU9BLEVBQUVBLFNBQVNBLEVBQUVBLG1CQUFZQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQTtRQUNoRUEsUUFBUUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsY0FBT0EsRUFBRUEsU0FBU0EsRUFBRUEsbUJBQVlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBO0tBQ25FQSxDQUFDQTtBQUNOQSxDQUFDQSxFQS9HTSxNQUFNLEtBQU4sTUFBTSxRQStHWjtBQy9HRCxJQUFPLE1BQU0sQ0FnRFo7QUFoREQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUlYQSx5QkFBa0JBLEdBQUdBO1FBQ2pCQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLGlJQUFpSUEsQ0FDcElBO1FBQ0RBLEdBQUdBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxJQUFJQSxFQUNwQkEsd0tBQXdLQSxDQUMzS0E7UUFDREEsT0FBT0EsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLE9BQU9BLEVBQzNCQSxtS0FBbUtBLENBQ3RLQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLGlLQUFpS0EsQ0FDcEtBO1FBQ0RBLFFBQVFBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxRQUFRQSxFQUM3QkEsd0JBQXdCQSxDQUMzQkE7UUFDREEsSUFBSUEsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3JCQSxRQUFRQSxDQUNYQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLDZGQUE2RkEsQ0FDaEdBO1FBQ0RBLElBQUlBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxJQUFJQSxFQUNyQkEsb0JBQW9CQSxDQUN2QkE7UUFDREEsSUFBSUEsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3JCQSx3QkFBd0JBLENBQzNCQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLDBCQUEwQkEsQ0FDN0JBO1FBQ0RBLEdBQUdBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxHQUFHQSxFQUNuQkEsWUFBWUEsQ0FDZkE7UUFDREEsS0FBS0EsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLEtBQUtBLEVBQ3ZCQSxPQUFPQSxDQUNWQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLFVBQVVBLENBQ2JBO0tBRUpBLENBQUNBO0lBRUZBLHFCQUFjQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtBQUMvQkEsQ0FBQ0EsRUFoRE0sTUFBTSxLQUFOLE1BQU0sUUFnRFo7QUNoREQsb0NBQW9DO0FBQ3BDLHNDQUFzQztBQUN0QyxxQ0FBcUM7QUFDckMseUNBQXlDO0FBQ3pDLHVDQUF1QztBQUN2QywwQ0FBMEM7QUFFMUMsSUFBTyxNQUFNLENBc0paO0FBdEpELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFVSVk7WUErQlFDLGdCQUFXQSxHQUFHQTtnQkFDbEJBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBO2dCQUN6QkEsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUE7Z0JBQzNCQSxHQUFHQSxFQUFFQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQTtnQkFDM0JBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBO2FBQy9CQSxDQUFDQTtZQW5DRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsY0FBT0EsRUFBRUEsbUJBQVlBLENBQUNBLENBQUNBO1lBQ3BDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxrQkFBV0EsRUFBRUEsQ0FBQ0E7WUFFaENBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUVuQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRU9ELDBCQUFPQSxHQUFmQSxVQUFnQkEsR0FBY0EsRUFBRUEsU0FBb0JBO1lBQ2hERSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFNUJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEVBQUVBLENBQUNBO1lBRWhCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDbkNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNuQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxnQkFBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRXBDQSxJQUFJQSxDQUFDQSx5QkFBeUJBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNwRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EseUJBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFM0NBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO2dCQUM1QkEsQ0FBQ0E7WUFDTEEsQ0FBQ0E7UUFFTEEsQ0FBQ0E7UUFTT0YsZ0NBQWFBLEdBQXJCQSxVQUFzQkEsU0FBb0JBLEVBQUVBLENBQVFBLEVBQUVBLENBQVFBO1lBQTlERyxpQkFJQ0E7WUFIR0EsSUFBSUEsWUFBWUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLElBQUlBLE1BQU1BLEdBQUdBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLENBQUNBLElBQUlBLE9BQUFBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLEVBQW5CQSxDQUFtQkEsQ0FBQ0EsQ0FBQ0E7WUFDbEVBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO1FBQ2xCQSxDQUFDQTtRQUVNSCw2QkFBVUEsR0FBakJBLFVBQWtCQSxTQUFTQTtZQUN2QkksSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkRBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxTQUFTQSxHQUFHQSxvQkFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFCQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDaERBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzNEQSxDQUFDQTtnQkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2JBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3dCQUNoREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EseUJBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFFdkRBLFFBQVFBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO29CQUM1QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBRTdCQSxFQUFFQSxDQUFBQSxDQUFDQSxxQkFBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQy9GQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDaERBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDSkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ2xDQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVEQSwyQkFBMkJBO1lBQzNCQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFFT0osZ0NBQWFBLEdBQXJCQTtZQUNJSyxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxpQkFBVUEsRUFBRUEsQ0FBQ0E7WUFDN0JBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3ZDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUVyQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDakJBLENBQUNBO1FBRU9MLDRCQUFTQSxHQUFqQkEsVUFBa0JBLFNBQVNBO1lBQ3ZCTSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUVqQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtnQkFDakNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxFQUFFQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtnQkFDakRBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO1lBQzdCQSxDQUFDQTtZQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDNUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3hDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDbEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO1lBQ0xBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU9OLDRCQUFTQSxHQUFqQkEsVUFBa0JBLEtBQWlCQTtZQUMvQk8sSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsa0JBQVdBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzVDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7UUFFT1Asc0NBQW1CQSxHQUEzQkEsVUFBNEJBLENBQVFBLEVBQUVBLENBQVFBO1lBQzFDUSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBRTVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBRWhDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3BDQSxDQUFDQTtRQUVPUiwrQkFBWUEsR0FBcEJBLFVBQXFCQSxDQUFRQSxFQUFFQSxDQUFRQTtZQUNuQ1MsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFT1Qsd0JBQUtB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QUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO29CQUMzQ0EsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNKQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDNUNBLENBQUNBO29CQUVEQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekNBLENBQUNBO1lBQ0xBLENBQUNBO1lBRURBLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzdFQSwyQkFBMkJBO1lBQzNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFBQSxHQUFHQTtnQkFDdENBLElBQUlBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN2Q0EsSUFBSUEsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pFQSxJQUFJQSxVQUFVQSxHQUFHQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxHQUFHQSxTQUFTQSxHQUFHQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFFM0VBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLEdBQUdBLGNBQWNBLEdBQUdBLE1BQU1BLENBQUNBO1lBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNQQSxDQUFDQTtRQUNMRixjQUFDQTtJQUFEQSxDQWxFQTNCLEFBa0VDMkIsSUFBQTNCO0lBbEVZQSxjQUFPQSxVQWtFbkJBLENBQUFBO0FBQ0xBLENBQUNBLEVBcEVNLE1BQU0sS0FBTixNQUFNLFFBb0VaO0FDdEVELElBQU8sTUFBTSxDQTBCWjtBQTFCRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ1hBO1FBSUk4QjtZQUNJQyxJQUFJQSxDQUFDQSxZQUFZQSxHQUFtQkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDckVBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBcUJBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1FBQ3RGQSxDQUFDQTtRQUVNRCx3QkFBSUEsR0FBWEEsVUFBWUEsS0FBaUJBO1lBQ3pCRSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDVEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ2pDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO2dCQUM5Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDdENBLE1BQU1BLENBQUNBO1lBQ1hBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBO1lBRTFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLGNBQWNBLENBQUNBO1lBQ3REQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1lBRTFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBO1FBQzNEQSxDQUFDQTtRQUNMRixnQkFBQ0E7SUFBREEsQ0F4QkE5QixBQXdCQzhCLElBQUE5QjtJQXhCWUEsZ0JBQVNBLFlBd0JyQkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUExQk0sTUFBTSxLQUFOLE1BQU0sUUEwQlo7QUMxQkQsSUFBTyxNQUFNLENBUVo7QUFSRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ1hBO1FBQUFpQztRQU1BQyxDQUFDQTtRQUpVRCxrQ0FBUUEsR0FBZkEsVUFBZ0JBLEtBQWlCQTtZQUM3QkUsRUFBRUEsQ0FBQUEsQ0FBQ0EsS0FBS0EsSUFBSUEsS0FBS0EsQ0FBQ0EsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3pCQSx1QkFBZ0JBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBO1FBQ3RDQSxDQUFDQTtRQUNMRixzQkFBQ0E7SUFBREEsQ0FOQWpDLEFBTUNpQyxJQUFBakM7SUFOWUEsc0JBQWVBLGtCQU0zQkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUFSTSxNQUFNLEtBQU4sTUFBTSxRQVFaO0FDUkQseUNBQXlDO0FBQ3pDLHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMsMENBQTBDO0FBRTFDLElBQU8sTUFBTSxDQTZFWjtBQTdFRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ1hBO1FBV0lvQztZQUNJQyxnQ0FBZ0NBO1lBQ2hDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxlQUFRQSxFQUFFQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7WUFFeEJBLGtCQUFrQkE7WUFDbEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLGNBQU9BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUV2QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsZ0JBQVNBLEVBQUVBLENBQUNBO1lBQ2pDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxzQkFBZUEsRUFBRUEsQ0FBQ0E7UUFDakRBLENBQUNBO1FBRU9ELCtCQUFnQkEsR0FBeEJBO1lBQUFFLGlCQWVDQTtZQWRHQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUUvQ0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQTtnQkFDakRBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ25EQSxDQUFDQSxDQUFDQTtZQUNGQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLE9BQU9BLEdBQUdBO2dCQUNuREEsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDckRBLENBQUNBLENBQUNBO1lBQ0ZBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsR0FBR0E7Z0JBQ3BEQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0REEsQ0FBQ0EsQ0FBQ0E7WUFDRkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQTtnQkFDbkRBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3JEQSxDQUFDQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUVPRiw4QkFBZUEsR0FBdkJBLFVBQXdCQSxHQUFXQSxFQUFFQSxPQUFzQkE7WUFDdkRHLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzVDQSxDQUFDQTtRQUVPSCx3QkFBU0EsR0FBakJBLFVBQWtCQSxJQUFJQTtZQUNsQkksSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZCQSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNyRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3Q0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFT0osMEJBQVdBLEdBQW5CQSxVQUFvQkEsU0FBU0E7WUFDekJLLHFDQUFxQ0E7WUFDckNBLFdBQVdBO1lBRVhBLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RGQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbERBLE1BQU1BLENBQUNBLGtCQUFrQkEsQ0FBQ0E7WUFFOUJBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbEJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO1lBQzFCQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUU1Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDbENBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBRXZCQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNyRkEsQ0FBQ0E7UUFDTEwsV0FBQ0E7SUFBREEsQ0EzRUFwQyxBQTJFQ29DLElBQUFwQztJQTNFWUEsV0FBSUEsT0EyRWhCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQTdFTSxNQUFNLEtBQU4sTUFBTSxRQTZFWjtBQ2xGRCwrQkFBK0I7QUFDL0IsSUFBTyxNQUFNLENBRVo7QUFGRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ2JBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO0FBQy9CQSxDQUFDQSxFQUZNLE1BQU0sS0FBTixNQUFNLFFBRVo7QUNIRCxJQUFPLE1BQU0sQ0FLWjtBQUxELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFBQTBDO1FBR0FDLENBQUNBO1FBQURELGlCQUFDQTtJQUFEQSxDQUhBMUMsQUFHQzBDLElBQUExQztJQUhZQSxpQkFBVUEsYUFHdEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBTE0sTUFBTSxLQUFOLE1BQU0sUUFLWiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICBVcDogJ3VwJyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgRG93bjogJ2Rvd24nLFxyXG4gICAgTGVmdDogJ2xlZnQnXHJcbiAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElzVmlzaXRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgSXNQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFR5cGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgQWxsb3dlZE1vdmVzOiBzdHJpbmdbXTtcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbGVUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc1Zpc2l0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0aWxlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblZhbHVlcyA9IE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5tYXAoayA9PiBDbTJrMTUuZGlyZWN0aW9uc1trXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WYWx1ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9IC0xICYmIHRoaXMuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKGRpcmVjdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgU3VjY2VzczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogU3RvcnlNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBYOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIFk6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgSXNJblN0b3J5OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocGxheWVyOiBQbGF5ZXJNb2RlbCA9IG51bGwpe1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuWCA9IHBsYXllci5YO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ZID0gcGxheWVyLlk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzSW5TdG9yeSA9IHBsYXllci5Jc0luU3Rvcnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSA6IFBsYXllck1vdmVSZXN1bHQge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBsYXllck1vdmVSZXN1bHQoKTtcclxuICAgICAgICAgICAgcmVzdWx0LlN1Y2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuVXA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ZLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuRG93bjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5MZWZ0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLlJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5NZXNzYWdlID0gJ01vdmUgd2hlcmU/JztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NZXNzYWdlID0gXCJZb3UgaGF2ZSBtb3ZlZCBcIiArIGRpcmVjdGlvbiArIFwiLlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgSWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IHN0cmluZztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgc3Rvcnk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLklkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuU3RvcnkgPSBzdG9yeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1hcFRyYW5zcG9ydCB7XHJcbiAgICAgICAgbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIG1vdmVtZW50czogc3RyaW5nW11bXTtcclxuICAgICAgICB0aWxlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHZhciBnYW1lbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBmYWN0b3J5bWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciB2aWxsYWdlbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciB2aWxsYWdlbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBiYXJubWFwOiBzdHJpbmdbXVtdO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgY2FuTW92ZU9uTWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25GYWN0b3J5TWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25WaWxsYWdlTWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25CYXJuTWFwOiBzdHJpbmdbXVtdO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgbWFwVHJhbnNwb3J0czogeyBba2V5OiBzdHJpbmddOiBJTWFwVHJhbnNwb3J0IH07XHJcbiAgICBleHBvcnQgdmFyIGlnbm9yZVRpbGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGdhbWVtYXAgPSBbXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnXSxcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlOScsICdlMTAnLCAnZTExJywgJ2UxMicsICdlMTMnLCAnZTE0JywgJ2UxNScsICdlMTYnXSxcclxuICAgICAgICBbJy0nLCAnbTEnLCAnbTInLCAnbTMnLCAnLScsICdlMTcnLCAnZTE3JywgJ2UxOScsICdlMjAnLCAnZTIxJywgJ2UyMicsICdlMjMnLCAnZTI0J10sXHJcbiAgICAgICAgWyctJywgJ200JywgJ201JywgJ202JywgJy0nLCAnLScsICctJywgJy0nLCAndTUnLCAnLScsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdtNycsICdtOCcsICd1MXYnLCAndTEnLCAndTEnLCAndTInLCAndTEnLCAndTMnLCAndTEnLCAndTEnLCAndTQnLCAnLSddLFxyXG4gICAgICAgIFsnLScsICd1NXYnLCAnLScsICctJywgJy0nLCAnLScsICd1NWcnLCAnLScsICctJywgJy0nLCAnLScsICdoMScsICdoMiddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnLScsICctJywgJ2gzJywgJ2g0J10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnLCAnazQnLCAnazEnLCAnazEnLCAnazEnXSxcclxuICAgICAgICBbJy0nLCAndTViJywgJy0nLCAnLScsICdnMTEnLCAnZzEyJywgJ2cxMycsICdnMTQnLCAnZzE1JywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kxJywgJ2kyJywgJy0nLCAnLScsICctJywgJ2wnLCAnLScsICdmMScsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdpMycsICdpNCcsICdpNScsICd1MWInLCAndTEnLCAndTYnLCAnLScsICdmMicsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnazEnLCAnazEnLCAnazEnLCAnazEnLCAnazEnLCAnazEnLCAna2InLCAnazEnLCAnazEnLCAnazMnLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nXVxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPbk1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJ2QnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJ3VkJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICdyJywgJ2xyJywgJ2xyJywgJ2xyJywgJ2xyZCcsICdybCcsICd1bHInLCAncmwnLCAncmwnLCAnZGwnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1JywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICdkJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICdkdScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAncicsICdscicsICdscicsICd1bCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuXHJcbiAgICBmYWN0b3J5bWFwID0gW1xyXG4gICAgICAgIFsnLScsICd0ZXhpdCcsICctJ10sXHJcbiAgICAgICAgWyd0bCcsICd0bScsICd0ciddLFxyXG4gICAgICAgIFsnYmwnLCAnYm0nLCAnYnInXSxcclxuICAgICAgICBbJy0nLCAnYmV4aXQnLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uRmFjdG9yeU1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsncicsICd1ZGxyJywgJ2wnXSxcclxuICAgICAgICBbJycsICd1JywgJyddXHJcbiAgICBdO1xyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWyd0ZXhpdCcsJ2JleGl0JywndGwnLCd0bScsJ3RyJywnYmwnLCdibScsJ2JyJywnYmV4aXQnXSk7XHJcblxyXG4gICAgdmlsbGFnZW1hcCA9IFtcclxuICAgICAgICBbXCJtXCIsIFwicmV4aXR2XCJdLFxyXG4gICAgICAgIFtcImJleGl0dlwiLCBcIi1cIl0sXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uVmlsbGFnZU1hcCA9IFtcclxuICAgICAgICBbJ2RyJywnJ10sXHJcbiAgICAgICAgWycnLCcnXVxyXG4gICAgXTtcclxuICAgIGlnbm9yZVRpbGVzID0gaWdub3JlVGlsZXMuY29uY2F0KFsnbScsJ3JleGl0dicsJ2JleGl0diddKTtcclxuXHJcbiAgICBiYXJubWFwID0gW1xyXG4gICAgICAgIFtcInRleGl0YlwiLCBcIi1cIl0sXHJcbiAgICAgICAgW1wiYlwiLCBcInJleGl0YlwiXSxcclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25CYXJuTWFwID0gW1xyXG4gICAgICAgIFsnJywnJ10sXHJcbiAgICAgICAgWydyJywnJ11cclxuICAgIF07XHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ2InLCd0ZXhpdGInLCdyZXhpdGInXSk7XHJcblxyXG4gICAgbWFwVHJhbnNwb3J0cyA9IHtcclxuICAgICAgICAvLyBtYXAgPT4gZmFjdG9yeW1hcFxyXG4gICAgICAgICdnMTMnOiB7IG1hcDogZmFjdG9yeW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25GYWN0b3J5TWFwICwgdGlsZTogJ2JleGl0JyB9LFxyXG4gICAgICAgICdnMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAndG0nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiB2aWxsYWdlbWFwXHJcbiAgICAgICAgJ204JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcbiAgICAgICAgJ203JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiBiYXJubWFwXHJcbiAgICAgICAgJ2kxJzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcbiAgICAgICAgJ2k1JzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcblxyXG4gICAgICAgIC8vIGZhY3RvcnltYXAgPT4gbWFwXHJcbiAgICAgICAgJ2JleGl0JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAnbCcgfSxcclxuICAgICAgICAndGV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NWcnIH0sXHJcblxyXG4gICAgICAgIC8vIHZpbGxhZ2VtYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0dic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxdicgfSxcclxuICAgICAgICAnYmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTV2JyB9LFxyXG5cclxuICAgICAgICAvLyBiYXJubWFwID0+IG1hcFxyXG4gICAgICAgICdyZXhpdGInOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1MWInIH0sXHJcbiAgICAgICAgJ3RleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1YicgfSxcclxuICAgIH07XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCB2YXIgc3Rvcmllc1RpbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IFN0b3J5TW9kZWwgfTtcclxuICAgIGV4cG9ydCB2YXIgdHdvU3RhdGVTdG9yZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIHN0b3JpZXNUaWxlTWFwcGluZyA9IHtcclxuICAgICAgICAna2InOiBuZXcgU3RvcnlNb2RlbCgna2InLFxyXG4gICAgICAgICAgICAnw5xkdiBhIGrDoXTDqWtiYW4uIE55ZXJ0w6lsIGVneSBqZWd5ZXQgYSBNaWt1bMOhc2d5w6FyYmEsIHRhbMOhbGtvemhhdHN6IHNvayB2YXLDoXpzbGF0dGFsLCDDqXMgaGEgasOzIHZvbHTDoWwsIG3DqWcgYWrDoW5kw6lrb3QgaXMga2FwaGF0c3ouJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2InOiBuZXcgU3RvcnlNb2RlbCgnaTUnLFxyXG4gICAgICAgICAgICAnRXogYXogaXN0w6FsbMOzLCBpbm5lbiBpbmR1bCDDqXMgw6lya2V6aWsgYSB0w6lsYXDDsy4gQSBtYW7Ds2sgw6lwcCB0YWthcsOtdGFuYWssIHRhbmtvbG5haywgcG9sw61yb3p6w6FrIFJ1ZG9sZiBvcnLDoXQuIMOccmVzbmVrIHRhbMOhbG9kLCBtw6lnIG5lbSDDqXJrZXpldHQgZWwgYXogaWTFkSBheiBpbmR1bMOhc3JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdCc6IG5ldyBTdG9yeU1vZGVsKCdiZXhpdCcsXHJcbiAgICAgICAgICAgICdTemlhISBNZWd0YWzDoWx0YWQgYSBNaWt1bMOhcyBnecOhcsOhdCwgw6luIGxlc3playBhIGthbGF1em9kLiBBbWVkZGlnIE1pa3Vsw6FzIGvDqXN6w7xsxZFkaWssIG1lZ2lzbWVyaGV0ZWQgYSBtxbFoZWx5w6l0LCBzxZF0IGtpIGlzIHByw7Niw6FsaGF0b2QhIEd5ZXJlIGJlbGplYmIsIG1lZ211dGF0b20hJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtJzogbmV3IFN0b3J5TW9kZWwoJ2JtJyxcclxuICAgICAgICAgICAgJ0jDoXQgw61tZS4gQmFscmEgdGFsw6Fsb2QgYSByYWt0w6FyYXQsIGpvYmJyYSBhIG3FsWhlbHl0LCBhIGvDtnZldGtlesWRIGZvbHlvc8OzbiBwZWRpZyBtZWd0YWzDoWxvZCBhIGZlc3TFkXN6b2LDoXQuIMOJcyBob2d5IG1pdCByZWp0IGEgbmVneWVkaWsgYWp0w7M/IEVneSBraXMgdmFyw6F6c2xhVC4uJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JleGl0Mic6IG5ldyBTdG9yeU1vZGVsKCdiZXhpdDInLFxyXG4gICAgICAgICAgICAnRXogYSBiZWrDoXJhdCBhIGd5w6FyYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RsJzogbmV3IFN0b3J5TW9kZWwoJ3RsJyxcclxuICAgICAgICAgICAgJ01BR0lDISdcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bSc6IG5ldyBTdG9yeU1vZGVsKCd0bScsXHJcbiAgICAgICAgICAgICdKb2JicmEgZmVzdGVnZXRoZXN6LCBiYWxyYSBwZWRpZyBtaW5kZW4gw6lydGVsbWV0IG55ZXIuIEF6IG1lZyBhIGjDoXRzw7Mga2lqw6FyYXQgYXogZXJkxZEgZmVsw6kuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RyJzogbmV3IFN0b3J5TW9kZWwoJ3RyJyxcclxuICAgICAgICAgICAgJ0V6IGEgZmVzdMWRcyBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmwnOiBuZXcgU3RvcnlNb2RlbCgnYmwnLFxyXG4gICAgICAgICAgICAnRXogaXR0IGEgcmFrdMOhciBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYnInOiBuZXcgU3RvcnlNb2RlbCgnYnInLFxyXG4gICAgICAgICAgICAnRXogaXR0IGEgc3plcmVsxZFzIHN6b2JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdtJzogbmV3IFN0b3J5TW9kZWwoJ20nLFxyXG4gICAgICAgICAgICAnTWFuw7MgZmFsdmEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnZTIwJzogbmV3IFN0b3J5TW9kZWwoJ2UyMCcsXHJcbiAgICAgICAgICAgICdFcmRlxZEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnaDEnOiBuZXcgU3RvcnlNb2RlbCgnaDEnLFxyXG4gICAgICAgICAgICAnVGF2YWNza2EnXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHR3b1N0YXRlU3RvcmVzID0gW1wiYmV4aXRcIl07XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGxheWVyTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTW92ZURpcmVjdGlvbnMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL21hcHMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL3N0b3JpZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFRpbGVzOlRpbGVNb2RlbFtdW107XHJcbiAgICAgICAgcHVibGljIFBsYXllcjpQbGF5ZXJNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIFdpZHRoOm51bWJlcjtcclxuICAgICAgICBwdWJsaWMgSGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUJhY2t1cDogU3RhdGVNb2RlbDtcclxuICAgICAgICBwcml2YXRlIHZpc2l0ZWRTdG9yaWVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1hcChnYW1lbWFwLCBjYW5Nb3ZlT25NYXApO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IDY7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSAxMjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgdGhpcy52aXNpdGVkU3RvcmllcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTWFwKG1hcDpzdHJpbmdbXVtdLCBtb3ZlbWVudHM6c3RyaW5nW11bXSkge1xyXG4gICAgICAgICAgICB0aGlzLldpZHRoID0gbWFwLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5IZWlnaHQgPSBtYXBbMF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuV2lkdGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlID0gbmV3IFRpbGVNb2RlbChtYXBbal1baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aWxlLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnModGhpcy5nZXREaXJlY3Rpb25zKG1vdmVtZW50cywgaiwgaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbdGlsZS5UeXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXVtqXSA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVtZW50TWFwID0ge1xyXG4gICAgICAgICAgICAndSc6IENtMmsxNS5kaXJlY3Rpb25zLlVwLFxyXG4gICAgICAgICAgICAnZCc6IENtMmsxNS5kaXJlY3Rpb25zLkRvd24sXHJcbiAgICAgICAgICAgICdsJzogQ20yazE1LmRpcmVjdGlvbnMuTGVmdCxcclxuICAgICAgICAgICAgJ3InOiBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHM6c3RyaW5nW11bXSwgeDpudW1iZXIsIHk6bnVtYmVyKTpzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlbWVudENlbGwgPSBtb3ZlbWVudHNbeF1beV07XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBtb3ZlbWVudENlbGwuc3BsaXQoJycpLm1hcChkID0+IHRoaXMubW92ZW1lbnRNYXBbZF0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVQbGF5ZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuUGxheWVyLk1vdmUoZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICB0aWxlLklzVmlzaXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IG1hcFRyYW5zcG9ydHNbdGlsZS5UeXBlXTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRyYW5zcG9ydCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5TdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlN0b3J5LklkKycyJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLlN0b3J5ID0gdGlsZS5TdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0d29TdGF0ZVN0b3Jlcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xICYmIHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkU3Rvcmllcy5wdXNoKHRpbGUuU3RvcnkuSWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgR2VuZXJhdGVTdGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlTW9kZWwoKTtcclxuICAgICAgICAgICAgc3RhdGUuUGxheWVyID0gdGhpcy5jbG9uZSh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHN0YXRlLlRpbGVzID0gdGhpcy5jbG9uZSh0aGlzLlRpbGVzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVHJhbnNwb3J0KHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLkdlbmVyYXRlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQmFja3VwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldlN0YXRlID0gdGhpcy5zdGF0ZUJhY2t1cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZFN0YXRlKHByZXZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZE1hcCh0cmFuc3BvcnQubWFwLCB0cmFuc3BvcnQubW92ZW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAgPSBzdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc3BvcnQubWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRyYW5zcG9ydC5tYXBbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0Lm1hcFtpXVtqXSA9PSB0cmFuc3BvcnQudGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5YID0gajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRTdGF0ZShzdGF0ZTogU3RhdGVNb2RlbCl7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKHN0YXRlLlBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBzdGF0ZS5UaWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1N1cnJvdW5kVmlzaXRlZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrVmlzaXRpZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbGVzW3hdICYmIHRoaXMuVGlsZXNbeF1beV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW3hdW3ldLklzVmlzaXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNsb25lKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2xkU3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvYmosIG51bGwpO1xyXG4gICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2xkU3RhdGUsIG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbC9UaWxlTW9kZWwudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVWaWV3IHtcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY29udGVudDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIsIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LCBtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUocm93LCBjb2wsIHNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSByb3cgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBjb2wgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3RpbGUnO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHB1YmxpYyBEaXNwbGF5KG1vZGVsOiBUaWxlTW9kZWwpIHtcclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ3RpbGUnXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1Zpc2l0ZWQgJiYgQ20yazE1Lmlnbm9yZVRpbGVzLmluZGV4T2YobW9kZWwuVHlwZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRpbGUtXCIgKyBtb2RlbC5UeXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnZGFyaycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInBsYXllclwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlVmlldy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcFZpZXcge1xyXG4gICAgICAgIC8vIGNvbnN0YW50c1xyXG4gICAgICAgIHRpbGVDb3VudCA9IDEzO1xyXG5cclxuICAgICAgICAvLyB2aWV3c1xyXG4gICAgICAgIHRpbGVzOiBUaWxlVmlld1tdW107XHJcblxyXG4gICAgICAgIC8vIG1vZGVsXHJcbiAgICAgICAgbW9kZWw6IE1hcE1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IobW9kZWw6IE1hcE1vZGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lbWFwIGNvbnN0cnVjdG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFwRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIGdhbWUgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRpbGUgdmlld3MgXHJcbiAgICAgICAgICAgIHZhciBtYXBXaWR0aCA9IG1hcEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB0aWxlU2l6ZSA9IG1hcFdpZHRoIC8gdGhpcy50aWxlQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbGVDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnB1c2goW10pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRpbGVDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW2ldW2pdID0gbmV3IFRpbGVWaWV3KGksIGosIHRpbGVTaXplLCBlbGVtZW50LCB0aGlzLm1vZGVsLlRpbGVzW2pdW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGlzcGxheSgpIHtcclxuICAgICAgICAgICAgLy8gc2Nyb2xsaW5nIG1lY2hhbmlzbVxyXG4gICAgICAgICAgICAvL3ZhciBtaWRkbGUgPSBNYXRoLmZsb29yKHRoaXMudGlsZUNvdW50IC8gMik7XHJcbiAgICAgICAgICAgIC8vdmFyIGxlZnQgPSB0aGlzLm1vZGVsLlBsYXllci5YIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlggPiAodGhpcy5tb2RlbC5XaWR0aCAtIDEgLSBtaWRkbGUpID8gdGhpcy5tb2RlbC5XaWR0aCAtIHRoaXMudGlsZUNvdW50XHJcbiAgICAgICAgICAgIC8vICAgIDogdGhpcy5tb2RlbC5QbGF5ZXIuWCAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHRvcCA9IHRoaXMubW9kZWwuUGxheWVyLlkgPCAobWlkZGxlKSA/IDBcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSA+ICh0aGlzLm1vZGVsLkhlaWdodCAtIDEgLSBtaWRkbGUpID8gdGhpcy5tb2RlbC5IZWlnaHQgLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5ZIC0gbWlkZGxlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZGVsLlRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubW9kZWwuVGlsZXNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNbal1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuUGxheWVyLlggPT0gaSAmJiB0aGlzLm1vZGVsLlBsYXllci5ZID09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5UaWxlc1tpXVtqXS5Jc1BsYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5UaWxlc1tpXVtqXS5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5EaXNwbGF5KHRoaXMubW9kZWwuVGlsZXNbaV1bal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSB0aGlzLm1vZGVsLlRpbGVzW3RoaXMubW9kZWwuUGxheWVyLlhdW3RoaXMubW9kZWwuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGN1cnJlbnRUaWxlKTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoQ20yazE1LmRpcmVjdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBDbTJrMTUuZGlyZWN0aW9uc1trZXldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93ZWQgPSBjdXJyZW50VGlsZS5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9PSAtMTtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3ZlLVwiICsgZGlyZWN0aW9uICsgXCItY29tbWFuZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBhbGxvd2VkID8gJ2lubGluZS1ibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5VmlldyB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlJbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudCA9IDxIVE1MSW1hZ2VFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yeS1pbWFnZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXcobW9kZWw6IFN0b3J5TW9kZWwpIHtcclxuICAgICAgICAgICAgaWYgKCFtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IG1vZGVsLlN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzInO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5jbGFzc05hbWUgPSAnc3RvcnktJyArIG1vZGVsLklkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeUxpbmVTZXR0ZXIge1xyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlQnkoc3Rvcnk6IFN0b3J5TW9kZWwpe1xyXG4gICAgICAgICAgICBpZihzdG9yeSAmJiBzdG9yeS5JZCA9PSAndG0nKVxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZU9uQmFybk1hcFsxXVswXSArPSAndSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZGVsL01hcE1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9NYXBWaWV3LnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9TdG9yeVZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeUxpbmVTZXR0ZXIudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgICAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXBNb2RlbDogTWFwTW9kZWw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RvcnlWaWV3OiBTdG9yeVZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUxpbmVTZXR0ZXI6IFN0b3J5TGluZVNldHRlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kczogeyBba2V5OiBzdHJpbmddOiAoYXJncykgPT4gYW55IH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWVzc2FnZUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgc3RhdGUgYW5kIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIHRoaXMubWFwTW9kZWwgPSBuZXcgTWFwTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBtYXAgdmlld1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcgPSBuZXcgTWFwVmlldyh0aGlzLm1hcE1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3ID0gbmV3IFN0b3J5VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5TGluZVNldHRlciA9IG5ldyBTdG9yeUxpbmVTZXR0ZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoJ21vdmUnLCB0aGlzLm1vdmVDb21tYW5kKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXVwLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlVwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtZG93bi1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5Eb3duKTtcclxuICAgICAgICAgICAgfTsgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXJpZ2h0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtbGVmdC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kKGtleTogc3RyaW5nLCBjb21tYW5kOiAoYXJncykgPT4gYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNba2V5XSA9IGNvbW1hbmQuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Db21tYW5kKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gcGFydHNbMF07XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzLnNwbGljZSgxLCBwYXJ0cy5sZW5ndGggLSAxKSA6IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kc1tjb21tYW5kXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlQ29tbWFuZChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5tYXBNb2RlbC5QbGF5ZXIuSXNJblN0b3J5KVxyXG4gICAgICAgICAgICAvLyAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tYXBNb2RlbC5UaWxlc1t0aGlzLm1hcE1vZGVsLlBsYXllci5YXVt0aGlzLm1hcE1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaWxlLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgPT0gLTEpIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJlIG5lbSBtZWhldHN6JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLm1hcE1vZGVsLk1vdmVQbGF5ZXIoZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5NZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5TGluZVNldHRlci5VcGRhdGVCeShyZXN1bHQuU3RvcnkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcuRHJhdyhyZXN1bHQuU3RvcnkpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuRGlzcGxheSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5NZXNzYWdlICsgKChyZXN1bHQuU3RvcnkgJiYgKCc8L2JyPicgKyByZXN1bHQuU3RvcnkuU3RvcnkpKSB8fCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkdhbWUudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gIHZhciBnYW1lID0gbmV3IENtMmsxNS5HYW1lKCk7XHJcbn1cclxuICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXI6IFBsYXllck1vZGVsO1xyXG4gICAgICAgIHB1YmxpYyBUaWxlczogVGlsZU1vZGVsW11bXTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
