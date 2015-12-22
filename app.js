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
        ['', '', '', 'r', 'lr', 'lr', 'udl', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'ud', '', '', '', '', '', ''],
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
        ['ur', '']
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
        'kb': new Cm2k15.StoryModel('kb', 'Ez a bejárat!'),
        'b': new Cm2k15.StoryModel('i5', 'Ez az istálló, itt találod a készülődő manókat, akik tankolják a szánt, polírozzák Rudolf orrát, és várják Mikulást.'),
        'bexit': new Cm2k15.StoryModel('bexit', 'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'),
        'bexit2': new Cm2k15.StoryModel('bexit2', 'Ez a bejárat a gyárba.'),
        'tl': new Cm2k15.StoryModel('tl', 'MAGIC!'),
        'tm': new Cm2k15.StoryModel('tm', 'Jobbra festegethesz, balra pedig minden értelmet nyer. Az meg a hátsó kijárat az erdő felé.'),
        'tr': new Cm2k15.StoryModel('tr', 'Ez a festős szoba.'),
        'bl': new Cm2k15.StoryModel('bl', 'Ez itt a raktár szoba.'),
        'br': new Cm2k15.StoryModel('br', 'Ez itt a szerelős szoba.'),
        'bm': new Cm2k15.StoryModel('bm', 'Üdv a gyárban, balra van a raktár, jobbra a szerelő szoba, arra előre pedig egy következő folyosó.'),
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
/// <reference path="model/MapModel.ts"/>
/// <reference path="view/MapView.ts"/>
/// <reference path="view/StoryView.ts"/>
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLmdldERpcmVjdGlvbnMiLCJDbTJrMTUuTWFwTW9kZWwuTW92ZVBsYXllciIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRpc3BsYXkiLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtLQUNiQSxDQUFDQTtBQUNKQSxDQUFDQSxFQVBNLE1BQU0sS0FBTixNQUFNLFFBT1o7QUNQRCx5Q0FBeUM7QUFFekMsSUFBTyxNQUFNLENBMkJaO0FBM0JELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFPSUMsbUJBQVlBLFFBQWdCQTtZQUN4QkMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFD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QUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDaEZBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ3BGQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDN0VBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3ZFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzlFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDMUVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekRBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdkRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUM1REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0lBQ0ZBLDBCQUFtQkEsR0FBR0E7UUFDbEJBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ1pBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ2xCQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7S0FDaEJBLENBQUNBO0lBQ0ZBLGtCQUFXQSxHQUFHQSxrQkFBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBQ0EsT0FBT0EsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsSUFBSUEsRUFBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFMUZBLGlCQUFVQSxHQUFHQTtRQUNUQSxDQUFDQSxHQUFHQSxFQUFFQSxRQUFRQSxDQUFDQTtRQUNmQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNsQkEsQ0FBQ0E7SUFDRkEsMEJBQW1CQSxHQUFHQTtRQUNsQkEsQ0FBQ0EsSUFBSUEsRUFBQ0EsRUFBRUEsQ0FBQ0E7UUFDVEEsQ0FBQ0EsRUFBRUEsRUFBQ0EsRUFBRUEsQ0FBQ0E7S0FDVkEsQ0FBQ0E7SUFDRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFDQSxRQUFRQSxFQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUxREEsY0FBT0EsR0FBR0E7UUFDTkEsQ0FBQ0EsUUFBUUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDZkEsQ0FBQ0EsR0FBR0EsRUFBRUEsUUFBUUEsQ0FBQ0E7S0FDbEJBLENBQUNB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QSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDM0NBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDSkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQzVDQSxDQUFDQTtvQkFFREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVEQSxJQUFJQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3RUEsMkJBQTJCQTtZQUMzQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ3RDQSxJQUFJQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLE9BQU9BLEdBQUdBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqRUEsSUFBSUEsVUFBVUEsR0FBR0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsR0FBR0EsU0FBU0EsR0FBR0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JB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QUFDQTtZQUMxQkEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDbENBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBRXZCQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNyRkEsQ0FBQ0E7UUFDTEwsV0FBQ0E7SUFBREEsQ0F2RUFqQyxBQXVFQ2lDLElBQUFqQztJQXZFWUEsV0FBSUEsT0F1RWhCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQXpFTSxNQUFNLEtBQU4sTUFBTSxRQXlFWjtBQzdFRCwrQkFBK0I7QUFDL0IsSUFBTyxNQUFNLENBRVo7QUFGRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ2JBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO0FBQy9CQSxDQUFDQSxFQUZNLE1BQU0sS0FBTixNQUFNLFFBRVo7QUNIRCxJQUFPLE1BQU0sQ0FLWjtBQUxELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFBQXVDO1FBR0FDLENBQUNBO1FBQURELGlCQUFDQTtJQUFEQSxDQUhBdkMsQUFHQ3VDLElBQUF2QztJQUhZQSxpQkFBVUEsYUFHdEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBTE0sTUFBTSxLQUFOLE1BQU0sUUFLWiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICBVcDogJ3VwJyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgRG93bjogJ2Rvd24nLFxyXG4gICAgTGVmdDogJ2xlZnQnXHJcbiAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElzVmlzaXRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgSXNQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFR5cGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgQWxsb3dlZE1vdmVzOiBzdHJpbmdbXTtcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbGVUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc1Zpc2l0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0aWxlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblZhbHVlcyA9IE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5tYXAoayA9PiBDbTJrMTUuZGlyZWN0aW9uc1trXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WYWx1ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9IC0xICYmIHRoaXMuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKGRpcmVjdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgU3VjY2VzczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogU3RvcnlNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBYOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIFk6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgSXNJblN0b3J5OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocGxheWVyOiBQbGF5ZXJNb2RlbCA9IG51bGwpe1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuWCA9IHBsYXllci5YO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ZID0gcGxheWVyLlk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzSW5TdG9yeSA9IHBsYXllci5Jc0luU3Rvcnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSA6IFBsYXllck1vdmVSZXN1bHQge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBsYXllck1vdmVSZXN1bHQoKTtcclxuICAgICAgICAgICAgcmVzdWx0LlN1Y2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuVXA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ZLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuRG93bjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5MZWZ0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLlJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5NZXNzYWdlID0gJ01vdmUgd2hlcmU/JztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NZXNzYWdlID0gXCJZb3UgaGF2ZSBtb3ZlZCBcIiArIGRpcmVjdGlvbiArIFwiLlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgSWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IHN0cmluZztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgc3Rvcnk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLklkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuU3RvcnkgPSBzdG9yeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1hcFRyYW5zcG9ydCB7XHJcbiAgICAgICAgbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIG1vdmVtZW50czogc3RyaW5nW11bXTtcclxuICAgICAgICB0aWxlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHZhciBnYW1lbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBmYWN0b3J5bWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciB2aWxsYWdlbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciB2aWxsYWdlbWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBiYXJubWFwOiBzdHJpbmdbXVtdO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgY2FuTW92ZU9uTWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25GYWN0b3J5TWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25WaWxsYWdlTWFwOiBzdHJpbmdbXVtdO1xyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25CYXJuTWFwOiBzdHJpbmdbXVtdO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgbWFwVHJhbnNwb3J0czogeyBba2V5OiBzdHJpbmddOiBJTWFwVHJhbnNwb3J0IH07XHJcbiAgICBleHBvcnQgdmFyIGlnbm9yZVRpbGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGdhbWVtYXAgPSBbXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnXSxcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlOScsICdlMTAnLCAnZTExJywgJ2UxMicsICdlMTMnLCAnZTE0JywgJ2UxNScsICdlMTYnXSxcclxuICAgICAgICBbJy0nLCAnbTEnLCAnbTInLCAnbTMnLCAnLScsICdlMTcnLCAnZTE3JywgJ2UxOScsICdlMjAnLCAnZTIxJywgJ2UyMicsICdlMjMnLCAnZTI0J10sXHJcbiAgICAgICAgWyctJywgJ200JywgJ201JywgJ202JywgJy0nLCAnLScsICctJywgJy0nLCAndTUnLCAnLScsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdtNycsICdtOCcsICd1MXYnLCAndTEnLCAndTEnLCAndTInLCAndTEnLCAndTMnLCAndTEnLCAndTEnLCAndTQnLCAnLSddLFxyXG4gICAgICAgIFsnLScsICd1NXYnLCAnLScsICctJywgJy0nLCAnLScsICd1NWcnLCAnLScsICctJywgJy0nLCAnLScsICdoMScsICdoMiddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnLScsICctJywgJ2gzJywgJ2g0J10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnLCAnazQnLCAnazEnLCAnazEnLCAnazEnXSxcclxuICAgICAgICBbJy0nLCAndTViJywgJy0nLCAnLScsICdnMTEnLCAnZzEyJywgJ2cxMycsICdnMTQnLCAnZzE1JywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kxJywgJ2kyJywgJy0nLCAnLScsICctJywgJ2wnLCAnLScsICdmMScsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdpMycsICdpNCcsICdpNScsICd1MWInLCAndTEnLCAndTYnLCAnLScsICdmMicsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnazEnLCAnazEnLCAnazEnLCAnazEnLCAnazEnLCAnazEnLCAna2InLCAnazEnLCAnazEnLCAnazMnLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nXVxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPbk1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJ2QnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJ3VkJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICdyJywgJ2xyJywgJ2xyJywgJ2xyJywgJ2xyZCcsICdybCcsICd1bHInLCAncmwnLCAncmwnLCAnZGwnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1JywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICdkJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICdkdScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAncicsICdscicsICdscicsICd1ZGwnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ3VkJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICBdO1xyXG5cclxuICAgIGZhY3RvcnltYXAgPSBbXHJcbiAgICAgICAgWyctJywgJ3RleGl0JywgJy0nXSxcclxuICAgICAgICBbJ3RsJywgJ3RtJywgJ3RyJ10sXHJcbiAgICAgICAgWydibCcsICdibScsICdiciddLFxyXG4gICAgICAgIFsnLScsICdiZXhpdCcsICctJ11cclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnXSxcclxuICAgICAgICBbJ3InLCAndWRscicsICdsJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsnJywgJ3UnLCAnJ11cclxuICAgIF07XHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ3RleGl0JywnYmV4aXQnLCd0bCcsJ3RtJywndHInLCdibCcsJ2JtJywnYnInLCdiZXhpdCddKTtcclxuXHJcbiAgICB2aWxsYWdlbWFwID0gW1xyXG4gICAgICAgIFtcIm1cIiwgXCJyZXhpdHZcIl0sXHJcbiAgICAgICAgW1wiYmV4aXR2XCIsIFwiLVwiXSxcclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25WaWxsYWdlTWFwID0gW1xyXG4gICAgICAgIFsnZHInLCcnXSxcclxuICAgICAgICBbJycsJyddXHJcbiAgICBdO1xyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWydtJywncmV4aXR2JywnYmV4aXR2J10pO1xyXG5cclxuICAgIGJhcm5tYXAgPSBbXHJcbiAgICAgICAgW1widGV4aXRiXCIsIFwiLVwiXSxcclxuICAgICAgICBbXCJiXCIsIFwicmV4aXRiXCJdLFxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPbkJhcm5NYXAgPSBbXHJcbiAgICAgICAgWycnLCcnXSxcclxuICAgICAgICBbJ3VyJywnJ11cclxuICAgIF07XHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ2InLCd0ZXhpdGInLCdyZXhpdGInXSk7XHJcblxyXG4gICAgbWFwVHJhbnNwb3J0cyA9IHtcclxuICAgICAgICAvLyBtYXAgPT4gZmFjdG9yeW1hcFxyXG4gICAgICAgICdnMTMnOiB7IG1hcDogZmFjdG9yeW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25GYWN0b3J5TWFwICwgdGlsZTogJ2JleGl0JyB9LFxyXG4gICAgICAgICdnMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAndG0nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiB2aWxsYWdlbWFwXHJcbiAgICAgICAgJ204JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcbiAgICAgICAgJ203JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiBiYXJubWFwXHJcbiAgICAgICAgJ2kxJzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcbiAgICAgICAgJ2k1JzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcblxyXG4gICAgICAgIC8vIGZhY3RvcnltYXAgPT4gbWFwXHJcbiAgICAgICAgJ2JleGl0JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAnbCcgfSxcclxuICAgICAgICAndGV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NWcnIH0sXHJcblxyXG4gICAgICAgIC8vIHZpbGxhZ2VtYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0dic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxdicgfSxcclxuICAgICAgICAnYmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTV2JyB9LFxyXG5cclxuICAgICAgICAvLyBiYXJubWFwID0+IG1hcFxyXG4gICAgICAgICdyZXhpdGInOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1MWInIH0sXHJcbiAgICAgICAgJ3RleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1YicgfSxcclxuICAgIH07XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCB2YXIgc3Rvcmllc1RpbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IFN0b3J5TW9kZWwgfTtcclxuICAgIGV4cG9ydCB2YXIgdHdvU3RhdGVTdG9yZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIHN0b3JpZXNUaWxlTWFwcGluZyA9IHtcclxuICAgICAgICAna2InOiBuZXcgU3RvcnlNb2RlbCgna2InLFxyXG4gICAgICAgICAgICAnRXogYSBiZWrDoXJhdCEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYic6IG5ldyBTdG9yeU1vZGVsKCdpNScsXHJcbiAgICAgICAgICAgICdFeiBheiBpc3TDoWxsw7MsIGl0dCB0YWzDoWxvZCBhIGvDqXN6w7xsxZFkxZEgbWFuw7NrYXQsIGFraWsgdGFua29sasOhayBhIHN6w6FudCwgcG9sw61yb3p6w6FrIFJ1ZG9sZiBvcnLDoXQsIMOpcyB2w6FyasOhayBNaWt1bMOhc3QuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JleGl0JzogbmV3IFN0b3J5TW9kZWwoJ2JleGl0JyxcclxuICAgICAgICAgICAgJ1N6aWEhIE1lZ3RhbMOhbHRhZCBhIE1pa3Vsw6FzIGd5w6Fyw6F0LCDDqW4gbGVzemVrIGEga2FsYXV6b2QuIEFtZWRkaWcgTWlrdWzDoXMga8Opc3rDvGzFkWRpaywgbWVnaXNtZXJoZXRlZCBhIG3FsWhlbHnDqXQsIHPFkXQga2kgaXMgcHLDs2LDoWxoYXRvZCEgR3llcmUgYmVsamViYiwgbWVnbXV0YXRvbSEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQyJzogbmV3IFN0b3J5TW9kZWwoJ2JleGl0MicsXHJcbiAgICAgICAgICAgICdFeiBhIGJlasOhcmF0IGEgZ3nDoXJiYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndGwnOiBuZXcgU3RvcnlNb2RlbCgndGwnLFxyXG4gICAgICAgICAgICAnTUFHSUMhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RtJzogbmV3IFN0b3J5TW9kZWwoJ3RtJyxcclxuICAgICAgICAgICAgJ0pvYmJyYSBmZXN0ZWdldGhlc3osIGJhbHJhIHBlZGlnIG1pbmRlbiDDqXJ0ZWxtZXQgbnllci4gQXogbWVnIGEgaMOhdHPDsyBraWrDoXJhdCBheiBlcmTFkSBmZWzDqS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndHInOiBuZXcgU3RvcnlNb2RlbCgndHInLFxyXG4gICAgICAgICAgICAnRXogYSBmZXN0xZFzIHN6b2JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdibCc6IG5ldyBTdG9yeU1vZGVsKCdibCcsXHJcbiAgICAgICAgICAgICdFeiBpdHQgYSByYWt0w6FyIHN6b2JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdicic6IG5ldyBTdG9yeU1vZGVsKCdicicsXHJcbiAgICAgICAgICAgICdFeiBpdHQgYSBzemVyZWzFkXMgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtJzogbmV3IFN0b3J5TW9kZWwoJ2JtJyxcclxuICAgICAgICAgICAgJ8OcZHYgYSBnecOhcmJhbiwgYmFscmEgdmFuIGEgcmFrdMOhciwgam9iYnJhIGEgc3plcmVsxZEgc3pvYmEsIGFycmEgZWzFkXJlIHBlZGlnIGVneSBrw7Z2ZXRrZXrFkSBmb2x5b3PDsy4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnbSc6IG5ldyBTdG9yeU1vZGVsKCdtJyxcclxuICAgICAgICAgICAgJ01hbsOzIGZhbHZhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2UyMCc6IG5ldyBTdG9yeU1vZGVsKCdlMjAnLFxyXG4gICAgICAgICAgICAnRXJkZcWRJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2gxJzogbmV3IFN0b3J5TW9kZWwoJ2gxJyxcclxuICAgICAgICAgICAgJ1RhdmFjc2thJ1xyXG4gICAgICAgICksXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0d29TdGF0ZVN0b3JlcyA9IFtcImJleGl0XCJdO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRpbGVNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlBsYXllck1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RvcnlNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1vdmVEaXJlY3Rpb25zLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGF0YS9tYXBzLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGF0YS9zdG9yaWVzLnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBUaWxlczpUaWxlTW9kZWxbXVtdO1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXI6UGxheWVyTW9kZWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBXaWR0aDpudW1iZXI7XHJcbiAgICAgICAgcHVibGljIEhlaWdodDpudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGVCYWNrdXA6IFN0YXRlTW9kZWw7XHJcbiAgICAgICAgcHJpdmF0ZSB2aXNpdGVkU3Rvcmllczogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNYXAoZ2FtZW1hcCwgY2FuTW92ZU9uTWFwKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyTW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlggPSA2O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5ZID0gMTI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaXRlZFN0b3JpZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZE1hcChtYXA6c3RyaW5nW11bXSwgbW92ZW1lbnRzOnN0cmluZ1tdW10pIHtcclxuICAgICAgICAgICAgdGhpcy5XaWR0aCA9IG1hcC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuSGVpZ2h0ID0gbWFwWzBdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5IZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLldpZHRoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IG5ldyBUaWxlTW9kZWwobWFwW2pdW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKHRoaXMuZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHMsIGosIGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nW3RpbGUuVHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbaV1bal0gPSB0aWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlbWVudE1hcCA9IHtcclxuICAgICAgICAgICAgJ3UnOiBDbTJrMTUuZGlyZWN0aW9ucy5VcCxcclxuICAgICAgICAgICAgJ2QnOiBDbTJrMTUuZGlyZWN0aW9ucy5Eb3duLFxyXG4gICAgICAgICAgICAnbCc6IENtMmsxNS5kaXJlY3Rpb25zLkxlZnQsXHJcbiAgICAgICAgICAgICdyJzogQ20yazE1LmRpcmVjdGlvbnMuUmlnaHRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGdldERpcmVjdGlvbnMobW92ZW1lbnRzOnN0cmluZ1tdW10sIHg6bnVtYmVyLCB5Om51bWJlcik6c3RyaW5nW10ge1xyXG4gICAgICAgICAgICB2YXIgbW92ZW1lbnRDZWxsID0gbW92ZW1lbnRzW3hdW3ldO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbW92ZW1lbnRDZWxsLnNwbGl0KCcnKS5tYXAoZCA9PiB0aGlzLm1vdmVtZW50TWFwW2RdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlUGxheWVyKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLlBsYXllci5Nb3ZlKGRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAgICAgdGlsZS5Jc1Zpc2l0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnQgPSBtYXBUcmFuc3BvcnRzW3RpbGUuVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UcmFuc3BvcnQodHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUuU3RvcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZpc2l0ZWRTdG9yaWVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUuU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbdGlsZS5TdG9yeS5JZCsnMiddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5TdG9yeSA9IHRpbGUuU3Rvcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHdvU3RhdGVTdG9yZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSAmJiB0aGlzLnZpc2l0ZWRTdG9yaWVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZFN0b3JpZXMucHVzaCh0aWxlLlN0b3J5LklkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEdlbmVyYXRlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLlBsYXllciA9IHRoaXMuY2xvbmUodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICBzdGF0ZS5UaWxlcyA9IHRoaXMuY2xvbmUodGhpcy5UaWxlcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5HZW5lcmF0ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZUJhY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZTdGF0ZSA9IHRoaXMuc3RhdGVCYWNrdXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRTdGF0ZShwcmV2U3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNYXAodHJhbnNwb3J0Lm1hcCwgdHJhbnNwb3J0Lm1vdmVtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNwb3J0Lm1hcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmFuc3BvcnQubWFwW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydC5tYXBbaV1bal0gPT0gdHJhbnNwb3J0LnRpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMb2FkU3RhdGUoc3RhdGU6IFN0YXRlTW9kZWwpe1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbChzdGF0ZS5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbGVzID0gc3RhdGUuVGlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE1hcmtTdXJyb3VuZFZpc2l0ZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkgLSAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1Zpc2l0aWVkKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaWxlc1t4XSAmJiB0aGlzLlRpbGVzW3hdW3ldKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UaWxlc1t4XVt5XS5Jc1Zpc2l0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjbG9uZShvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9sZFN0YXRlID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2JqLCBudWxsKTtcclxuICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IGhpc3Rvcnkuc3RhdGU7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG9sZFN0YXRlLCBudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9kZWwvVGlsZU1vZGVsLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBUaWxlVmlldyB7XHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIGNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyLCBlbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgbW9kZWw6IFRpbGVNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKHJvdywgY29sLCBzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZShyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gcm93ICogc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gY29sICogc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd0aWxlJztcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwdWJsaWMgRGlzcGxheShtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gWyd0aWxlJ107XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNWaXNpdGVkICYmIENtMmsxNS5pZ25vcmVUaWxlcy5pbmRleE9mKG1vZGVsLlR5cGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0aWxlLVwiICsgbW9kZWwuVHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2RhcmsnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGVsLklzUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZVZpZXcudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBWaWV3IHtcclxuICAgICAgICAvLyBjb25zdGFudHNcclxuICAgICAgICB0aWxlQ291bnQgPSAxMztcclxuXHJcbiAgICAgICAgLy8gdmlld3NcclxuICAgICAgICB0aWxlczogVGlsZVZpZXdbXVtdO1xyXG5cclxuICAgICAgICAvLyBtb2RlbFxyXG4gICAgICAgIG1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKG1vZGVsOiBNYXBNb2RlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZW1hcCBjb25zdHJ1Y3RvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aWxlIHZpZXdzIFxyXG4gICAgICAgICAgICB2YXIgbWFwV2lkdGggPSBtYXBFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgdGlsZVNpemUgPSBtYXBXaWR0aCAvIHRoaXMudGlsZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50aWxlQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tpXVtqXSA9IG5ldyBUaWxlVmlldyhpLCBqLCB0aWxlU2l6ZSwgZWxlbWVudCwgdGhpcy5tb2RlbC5UaWxlc1tqXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERpc3BsYXkoKSB7XHJcbiAgICAgICAgICAgIC8vIHNjcm9sbGluZyBtZWNoYW5pc21cclxuICAgICAgICAgICAgLy92YXIgbWlkZGxlID0gTWF0aC5mbG9vcih0aGlzLnRpbGVDb3VudCAvIDIpO1xyXG4gICAgICAgICAgICAvL3ZhciBsZWZ0ID0gdGhpcy5tb2RlbC5QbGF5ZXIuWCA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5YID4gKHRoaXMubW9kZWwuV2lkdGggLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuV2lkdGggLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgICA6IHRoaXMubW9kZWwuUGxheWVyLlggLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b3AgPSB0aGlzLm1vZGVsLlBsYXllci5ZIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgPiAodGhpcy5tb2RlbC5IZWlnaHQgLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuSGVpZ2h0IC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2RlbC5UaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1vZGVsLlRpbGVzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzW2pdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlBsYXllci5YID09IGkgJiYgdGhpcy5tb2RlbC5QbGF5ZXIuWSA9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuRGlzcGxheSh0aGlzLm1vZGVsLlRpbGVzW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tb2RlbC5UaWxlc1t0aGlzLm1vZGVsLlBsYXllci5YXVt0aGlzLm1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50VGlsZSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gQ20yazE1LmRpcmVjdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1cIiArIGRpcmVjdGlvbiArIFwiLWNvbW1hbmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbW92ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYWxsb3dlZCA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0b3J5SW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnktaW1hZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KG1vZGVsOiBTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudC5pbm5lclRleHQgPSBtb2RlbC5TdG9yeTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLnpJbmRleCA9ICcyJztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuY2xhc3NOYW1lID0gJ3N0b3J5LScgKyBtb2RlbC5JZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZGVsL01hcE1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9NYXBWaWV3LnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9TdG9yeVZpZXcudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgICAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXBNb2RlbDogTWFwTW9kZWw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RvcnlWaWV3OiBTdG9yeVZpZXc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29tbWFuZHM6IHsgW2tleTogc3RyaW5nXTogKGFyZ3MpID0+IGFueSB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIG1lc3NhZ2VFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHN0YXRlIGFuZCBjb21tYW5kc1xyXG4gICAgICAgICAgICB0aGlzLm1hcE1vZGVsID0gbmV3IE1hcE1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmRzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbWFwIHZpZXdcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3ID0gbmV3IE1hcFZpZXcodGhpcy5tYXBNb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5EaXNwbGF5KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5VmlldyA9IG5ldyBTdG9yeVZpZXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoJ21vdmUnLCB0aGlzLm1vdmVDb21tYW5kKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXVwLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlVwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtZG93bi1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5Eb3duKTtcclxuICAgICAgICAgICAgfTsgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXJpZ2h0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtbGVmdC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kKGtleTogc3RyaW5nLCBjb21tYW5kOiAoYXJncykgPT4gYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNba2V5XSA9IGNvbW1hbmQuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Db21tYW5kKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gcGFydHNbMF07XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzLnNwbGljZSgxLCBwYXJ0cy5sZW5ndGggLSAxKSA6IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kc1tjb21tYW5kXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlQ29tbWFuZChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5tYXBNb2RlbC5QbGF5ZXIuSXNJblN0b3J5KVxyXG4gICAgICAgICAgICAvLyAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tYXBNb2RlbC5UaWxlc1t0aGlzLm1hcE1vZGVsLlBsYXllci5YXVt0aGlzLm1hcE1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaWxlLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgPT0gLTEpIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJlIG5lbSBtZWhldHN6JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLm1hcE1vZGVsLk1vdmVQbGF5ZXIoZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5NZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Vmlldy5EcmF3KHJlc3VsdC5TdG9yeSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5EaXNwbGF5KCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lk1lc3NhZ2UgKyAoKHJlc3VsdC5TdG9yeSAmJiAoJzwvYnI+JyArIHJlc3VsdC5TdG9yeS5TdG9yeSkpIHx8ICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiR2FtZS50c1wiLz5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgdmFyIGdhbWUgPSBuZXcgQ20yazE1LkdhbWUoKTtcclxufVxyXG4gIiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RhdGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFBsYXllcjogUGxheWVyTW9kZWw7XHJcbiAgICAgICAgcHVibGljIFRpbGVzOiBUaWxlTW9kZWxbXVtdO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
