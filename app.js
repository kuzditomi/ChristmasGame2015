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
    Cm2k15.gamemap = [
        ['-', '-', '-', '-', '-', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
        ['-', '-', '-', '-', '-', 'e9', 'e10', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16'],
        ['-', 'm1', 'm2', 'm3', '-', 'e17', 'e17', 'e19', 'e20', 'e21', 'e22', 'e23', 'e24'],
        ['-', 'm4', 'm5', 'm6', '-', '-', '-', '-', 'u5', '-', '-', '-', '-'],
        ['-', 'm7', 'm8', 'u1', 'u1', 'u1', 'u2', 'u1', 'u3', 'u1', 'u1', 'u4', '-'],
        ['-', 'u5', '-', '-', '-', '-', 'u5', '-', '-', '-', '-', 'h1', 'h2'],
        ['-', 'u5', '-', '-', 'g1', 'g2', 'g3', 'g4', 'g5', '-', '-', 'h3', 'h4'],
        ['-', 'u5', '-', '-', 'g6', 'g7', 'g8', 'g9', 'g10', 'k4', 'k1', 'k1', 'k1'],
        ['-', 'u5', '-', '-', 'g11', 'g12', 'g13', 'g14', 'g15', 'k2', '-', '-', '-'],
        ['-', 'i1', 'i2', '-', '-', '-', 'l', '-', 'f1', 'k2', '-', '-', '-'],
        ['-', 'i3', 'i4', 'i5', 'u1', 'u1', 'u6', '-', 'f2', 'k2', '-', '-', '-'],
        ['k1', 'k1', 'k1', 'k1', 'k1', 'k1', 'kb', 'k1', 'k1', 'k3', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    ];
    Cm2k15.canMoveOnMap = [
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', 'd', '', '', '', ''],
        ['', '', '', '', '', '', '', '', 'ud', '', '', '', ''],
        ['', '', 'r', 'lr', 'lr', 'lr', 'lrdu', 'rl', 'ulr', 'rl', 'rl', 'dl', ''],
        ['', '', '', '', '', '', 'ud', '', '', '', '', 'u', ''],
        ['', '', '', '', '', '', 'u', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'd', '', '', '', '', '', ''],
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
    Cm2k15.mapTransports = {
        // map => factorymap
        'g13': { map: Cm2k15.factorymap, movements: Cm2k15.canMoveOnFactoryMap, tile: 'bexit' },
        // factorymap => map
        'bexit': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'l' },
        'texit': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'g3' }
    };
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    Cm2k15.storiesTileMapping = {
        'kb': new Cm2k15.StoryModel('kb', 'Ez a bejárat!'),
        'i5': new Cm2k15.StoryModel('i5', 'Ez az istálló, itt találod a készülődő manókat, akik tankolják a szánt, polírozzák Rudolf orrát, és várják Mikulást.'),
        'bexit': new Cm2k15.StoryModel('bexit', 'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'),
        'bexit2': new Cm2k15.StoryModel('bexit2', 'Ez a bejárat a gyárba.'),
        'tl': new Cm2k15.StoryModel('tl', 'MAGIC!'),
        'tm': new Cm2k15.StoryModel('tm', 'Jobbra festegethesz, balra pedig minden értelmet nyer. Az meg a hátsó kijárat az erdő felé.'),
        'tr': new Cm2k15.StoryModel('tr', 'Ez a festős szoba.'),
        'bl': new Cm2k15.StoryModel('bl', 'Ez itt a raktár szoba.'),
        'br': new Cm2k15.StoryModel('br', 'Ez itt a szerelős szoba.'),
        'bm': new Cm2k15.StoryModel('bm', 'Üdv a gyárban, balra van a raktár, jobbra a szerelő szoba, arra előre pedig egy következő folyosó.'),
        'm8': new Cm2k15.StoryModel('m8', 'Manó falva'),
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
            if (model.IsVisited) {
                this.element.style.backgroundColor = '#e3e3e3';
                this.element.style.backgroundImage = "url('images/" + model.Type + ".png')";
            }
            else {
                this.element.style.background = '#363636';
            }
            if (model.IsPlayer) {
                this.element.className = 'tile player';
            }
            else {
                this.element.className = 'tile';
            }
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
                return;
            }
            this.storyElement.innerText = model.Story;
            this.storyImageElement.src = 'images/story/' + model.Id + '.png';
            this.storyImageElement.style.display = 'inline-block';
            this.storyImageElement.style.zIndex = '2';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLmdldERpcmVjdGlvbnMiLCJDbTJrMTUuTWFwTW9kZWwuTW92ZVBsYXllciIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRpc3BsYXkiLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtLQUNiQSxDQUFDQTtBQUNKQSxDQUFDQSxFQVBNLE1BQU0sS0FBTixNQUFNLFFBT1o7QUNQRCx5Q0FBeUM7QUFFekMsSUFBTyxNQUFNLENBMkJaO0FBM0JELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFPSUMsbUJBQVlBLFFBQWdCQTtZQUN4QkMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFD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QSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDaEZBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ3BGQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3JFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzdFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDekVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUMxRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdkRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3JEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUM1REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNs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M0NBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDSkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQzVDQSxDQUFDQTtvQkFFREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVEQSxJQUFJQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3RUEsMkJBQTJCQTtZQUMzQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ3RDQSxJQUFJQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLE9BQU9BLEdBQUdBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqRUEsSUFBSUEsVUFBVUEsR0FBR0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsR0FBR0EsU0FBU0EsR0FBR0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBRTNFQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxHQUFHQSxjQUFjQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUNqRUEs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RUEsQ0FBQ0E7WUFFdkJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBO1FBQ3JGQSxDQUFDQTtRQUNMTCxXQUFDQTtJQUFEQSxDQXZFQWpDLEFBdUVDaUMsSUFBQWpDO0lBdkVZQSxXQUFJQSxPQXVFaEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBekVNLE1BQU0sS0FBTixNQUFNLFFBeUVaO0FDN0VELCtCQUErQjtBQUMvQixJQUFPLE1BQU0sQ0FFWjtBQUZELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDYkEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7QUFDL0JBLENBQUNBLEVBRk0sTUFBTSxLQUFOLE1BQU0sUUFFWjtBQ0hELElBQU8sTUFBTSxDQUtaO0FBTEQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYQTtRQUFBdUM7UUFHQUMsQ0FBQ0E7UUFBREQsaUJBQUNBO0lBQURBLENBSEF2QyxBQUdDdUMsSUFBQXZDO0lBSFlBLGlCQUFVQSxhQUd0QkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUFMTSxNQUFNLEtBQU4sTUFBTSxRQUtaIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBDbTJrMTUge1xyXG4gIGV4cG9ydCB2YXIgZGlyZWN0aW9ucyA9IHtcclxuICAgIFVwOiAndXAnLFxyXG4gICAgUmlnaHQ6ICdyaWdodCcsXHJcbiAgICBEb3duOiAnZG93bicsXHJcbiAgICBMZWZ0OiAnbGVmdCdcclxuICB9O1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1vdmVEaXJlY3Rpb25zLnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGlsZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgSXNWaXNpdGVkOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBJc1BsYXllcjogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgVHlwZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBBbGxvd2VkTW92ZXM6IHN0cmluZ1tdO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogU3RvcnlNb2RlbDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodGlsZVR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLklzVmlzaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLklzUGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHRpbGVUeXBlO1xyXG4gICAgICAgICAgICB0aGlzLkFsbG93ZWRNb3ZlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uVmFsdWVzID0gT2JqZWN0LmtleXMoQ20yazE1LmRpcmVjdGlvbnMpLm1hcChrID0+IENtMmsxNS5kaXJlY3Rpb25zW2tdKTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvblZhbHVlcy5pbmRleE9mKGRpcmVjdGlvbikgIT0gLTEgJiYgdGhpcy5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMucHVzaChkaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnMoZGlyZWN0aW9uczogc3RyaW5nW10pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbihkaXJlY3Rpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck1vdmVSZXN1bHQge1xyXG4gICAgICAgIHB1YmxpYyBTdWNjZXNzOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIFN0b3J5OiBTdG9yeU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgWTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBJc0luU3Rvcnk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllck1vZGVsID0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gcGxheWVyLlg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlkgPSBwbGF5ZXIuWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXNJblN0b3J5ID0gcGxheWVyLklzSW5TdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIDogUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGxheWVyTW92ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5VcDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5Eb3duOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSAnTW92ZSB3aGVyZT8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSBcIllvdSBoYXZlIG1vdmVkIFwiICsgZGlyZWN0aW9uICsgXCIuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBzdG9yeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5TdG9yeSA9IHN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWFwVHJhbnNwb3J0IHtcclxuICAgICAgICBtYXA6IHN0cmluZ1tdW107XHJcbiAgICAgICAgbW92ZW1lbnRzOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIHRpbGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdmFyIGdhbWVtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGZhY3RvcnltYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25NYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkZhY3RvcnlNYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBtYXBUcmFuc3BvcnRzOiB7IFtrZXk6IHN0cmluZ106IElNYXBUcmFuc3BvcnQgfTtcclxuXHJcbiAgICBnYW1lbWFwID0gW1xyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4J10sXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnZTknLCAnZTEwJywgJ2UxMScsICdlMTInLCAnZTEzJywgJ2UxNCcsICdlMTUnLCAnZTE2J10sXHJcbiAgICAgICAgWyctJywgJ20xJywgJ20yJywgJ20zJywgJy0nLCAnZTE3JywgJ2UxNycsICdlMTknLCAnZTIwJywgJ2UyMScsICdlMjInLCAnZTIzJywgJ2UyNCddLFxyXG4gICAgICAgIFsnLScsICdtNCcsICdtNScsICdtNicsICctJywgJy0nLCAnLScsICctJywgJ3U1JywgJy0nLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnbTcnLCAnbTgnLCAndTEnLCAndTEnLCAndTEnLCAndTInLCAndTEnLCAndTMnLCAndTEnLCAndTEnLCAndTQnLCAnLSddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnLScsICctJywgJ3U1JywgJy0nLCAnLScsICctJywgJy0nLCAnaDEnLCAnaDInXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2cxJywgJ2cyJywgJ2czJywgJ2c0JywgJ2c1JywgJy0nLCAnLScsICdoMycsICdoNCddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJywgJ2s0JywgJ2sxJywgJ2sxJywgJ2sxJ10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnMTEnLCAnZzEyJywgJ2cxMycsICdnMTQnLCAnZzE1JywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kxJywgJ2kyJywgJy0nLCAnLScsICctJywgJ2wnLCAnLScsICdmMScsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdpMycsICdpNCcsICdpNScsICd1MScsICd1MScsICd1NicsICctJywgJ2YyJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWydrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrYicsICdrMScsICdrMScsICdrMycsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uTWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJ3InLCAnbHInLCAnbHInLCAnbHInLCAnbHJkdScsICdybCcsICd1bHInLCAncmwnLCAncmwnLCAnZGwnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZHUnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJ3InLCAnbHInLCAnbHInLCAndWRsJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuXHJcbiAgICBmYWN0b3J5bWFwID0gW1xyXG4gICAgICAgIFsnLScsICd0ZXhpdCcsICctJ10sXHJcbiAgICAgICAgWyd0bCcsICd0bScsICd0ciddLFxyXG4gICAgICAgIFsnYmwnLCAnYm0nLCAnYnInXSxcclxuICAgICAgICBbJy0nLCAnYmV4aXQnLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uRmFjdG9yeU1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsncicsICd1ZGxyJywgJ2wnXSxcclxuICAgICAgICBbJycsICd1JywgJyddXHJcbiAgICBdO1xyXG5cclxuICAgIG1hcFRyYW5zcG9ydHMgPSB7XHJcbiAgICAgICAgLy8gbWFwID0+IGZhY3RvcnltYXBcclxuICAgICAgICAnZzEzJzogeyBtYXA6IGZhY3RvcnltYXAsIG1vdmVtZW50czogY2FuTW92ZU9uRmFjdG9yeU1hcCAsIHRpbGU6ICdiZXhpdCcgfSxcclxuXHJcbiAgICAgICAgLy8gZmFjdG9yeW1hcCA9PiBtYXBcclxuICAgICAgICAnYmV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICdsJyB9LFxyXG4gICAgICAgICd0ZXhpdCc6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ2czJyB9XHJcbiAgICB9O1xyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgdmFyIHN0b3JpZXNUaWxlTWFwcGluZzogeyBba2V5OiBzdHJpbmddOiBTdG9yeU1vZGVsIH07XHJcbiAgICBleHBvcnQgdmFyIHR3b1N0YXRlU3RvcmVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBzdG9yaWVzVGlsZU1hcHBpbmcgPSB7XHJcbiAgICAgICAgJ2tiJzogbmV3IFN0b3J5TW9kZWwoJ2tiJyxcclxuICAgICAgICAgICAgJ0V6IGEgYmVqw6FyYXQhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2k1JzogbmV3IFN0b3J5TW9kZWwoJ2k1JyxcclxuICAgICAgICAgICAgJ0V6IGF6IGlzdMOhbGzDsywgaXR0IHRhbMOhbG9kIGEga8Opc3rDvGzFkWTFkSBtYW7Ds2thdCwgYWtpayB0YW5rb2xqw6FrIGEgc3rDoW50LCBwb2zDrXJvenrDoWsgUnVkb2xmIG9ycsOhdCwgw6lzIHbDoXJqw6FrIE1pa3Vsw6FzdC4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQnOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQnLFxyXG4gICAgICAgICAgICAnU3ppYSEgTWVndGFsw6FsdGFkIGEgTWlrdWzDoXMgZ3nDoXLDoXQsIMOpbiBsZXN6ZWsgYSBrYWxhdXpvZC4gQW1lZGRpZyBNaWt1bMOhcyBrw6lzesO8bMWRZGlrLCBtZWdpc21lcmhldGVkIGEgbcWxaGVsecOpdCwgc8WRdCBraSBpcyBwcsOzYsOhbGhhdG9kISBHeWVyZSBiZWxqZWJiLCBtZWdtdXRhdG9tISdcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdDInOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQyJyxcclxuICAgICAgICAgICAgJ0V6IGEgYmVqw6FyYXQgYSBnecOhcmJhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bCc6IG5ldyBTdG9yeU1vZGVsKCd0bCcsXHJcbiAgICAgICAgICAgICdNQUdJQyEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndG0nOiBuZXcgU3RvcnlNb2RlbCgndG0nLFxyXG4gICAgICAgICAgICAnSm9iYnJhIGZlc3RlZ2V0aGVzeiwgYmFscmEgcGVkaWcgbWluZGVuIMOpcnRlbG1ldCBueWVyLiBBeiBtZWcgYSBow6F0c8OzIGtpasOhcmF0IGF6IGVyZMWRIGZlbMOpLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0cic6IG5ldyBTdG9yeU1vZGVsKCd0cicsXHJcbiAgICAgICAgICAgICdFeiBhIGZlc3TFkXMgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JsJzogbmV3IFN0b3J5TW9kZWwoJ2JsJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHJha3TDoXIgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JyJzogbmV3IFN0b3J5TW9kZWwoJ2JyJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHN6ZXJlbMWRcyBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm0nOiBuZXcgU3RvcnlNb2RlbCgnYm0nLFxyXG4gICAgICAgICAgICAnw5xkdiBhIGd5w6FyYmFuLCBiYWxyYSB2YW4gYSByYWt0w6FyLCBqb2JicmEgYSBzemVyZWzFkSBzem9iYSwgYXJyYSBlbMWRcmUgcGVkaWcgZWd5IGvDtnZldGtlesWRIGZvbHlvc8OzLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdtOCc6IG5ldyBTdG9yeU1vZGVsKCdtOCcsXHJcbiAgICAgICAgICAgICdNYW7DsyBmYWx2YSdcclxuICAgICAgICApLFxyXG4gICAgICAgICdlMjAnOiBuZXcgU3RvcnlNb2RlbCgnZTIwJyxcclxuICAgICAgICAgICAgJ0VyZGXFkSdcclxuICAgICAgICApLFxyXG4gICAgICAgICdoMSc6IG5ldyBTdG9yeU1vZGVsKCdoMScsXHJcbiAgICAgICAgICAgICdUYXZhY3NrYSdcclxuICAgICAgICApLFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdHdvU3RhdGVTdG9yZXMgPSBbXCJiZXhpdFwiXTtcclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGxheWVyTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTW92ZURpcmVjdGlvbnMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL21hcHMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL3N0b3JpZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFRpbGVzOlRpbGVNb2RlbFtdW107XHJcbiAgICAgICAgcHVibGljIFBsYXllcjpQbGF5ZXJNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIFdpZHRoOm51bWJlcjtcclxuICAgICAgICBwdWJsaWMgSGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUJhY2t1cDogU3RhdGVNb2RlbDtcclxuICAgICAgICBwcml2YXRlIHZpc2l0ZWRTdG9yaWVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1hcChnYW1lbWFwLCBjYW5Nb3ZlT25NYXApO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IDY7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSAxMjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgdGhpcy52aXNpdGVkU3RvcmllcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTWFwKG1hcDpzdHJpbmdbXVtdLCBtb3ZlbWVudHM6c3RyaW5nW11bXSkge1xyXG4gICAgICAgICAgICB0aGlzLldpZHRoID0gbWFwLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5IZWlnaHQgPSBtYXBbMF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuV2lkdGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlID0gbmV3IFRpbGVNb2RlbChtYXBbal1baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aWxlLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnModGhpcy5nZXREaXJlY3Rpb25zKG1vdmVtZW50cywgaiwgaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbdGlsZS5UeXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXVtqXSA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVtZW50TWFwID0ge1xyXG4gICAgICAgICAgICAndSc6IENtMmsxNS5kaXJlY3Rpb25zLlVwLFxyXG4gICAgICAgICAgICAnZCc6IENtMmsxNS5kaXJlY3Rpb25zLkRvd24sXHJcbiAgICAgICAgICAgICdsJzogQ20yazE1LmRpcmVjdGlvbnMuTGVmdCxcclxuICAgICAgICAgICAgJ3InOiBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHM6c3RyaW5nW11bXSwgeDpudW1iZXIsIHk6bnVtYmVyKTpzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlbWVudENlbGwgPSBtb3ZlbWVudHNbeF1beV07XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBtb3ZlbWVudENlbGwuc3BsaXQoJycpLm1hcChkID0+IHRoaXMubW92ZW1lbnRNYXBbZF0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVQbGF5ZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuUGxheWVyLk1vdmUoZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICB0aWxlLklzVmlzaXRlZCA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnQgPSBtYXBUcmFuc3BvcnRzW3RpbGUuVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UcmFuc3BvcnQodHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5TdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlN0b3J5LklkKycyJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLlN0b3J5ID0gdGlsZS5TdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0d29TdGF0ZVN0b3Jlcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xICYmIHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkU3Rvcmllcy5wdXNoKHRpbGUuU3RvcnkuSWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgR2VuZXJhdGVTdGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlTW9kZWwoKTtcclxuICAgICAgICAgICAgc3RhdGUuUGxheWVyID0gdGhpcy5jbG9uZSh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHN0YXRlLlRpbGVzID0gdGhpcy5jbG9uZSh0aGlzLlRpbGVzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVHJhbnNwb3J0KHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLkdlbmVyYXRlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQmFja3VwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldlN0YXRlID0gdGhpcy5zdGF0ZUJhY2t1cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZFN0YXRlKHByZXZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZE1hcCh0cmFuc3BvcnQubWFwLCB0cmFuc3BvcnQubW92ZW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAgPSBzdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc3BvcnQubWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRyYW5zcG9ydC5tYXBbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0Lm1hcFtpXVtqXSA9PSB0cmFuc3BvcnQudGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5YID0gajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRTdGF0ZShzdGF0ZTogU3RhdGVNb2RlbCl7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKHN0YXRlLlBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBzdGF0ZS5UaWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1N1cnJvdW5kVmlzaXRlZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrVmlzaXRpZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbGVzW3hdICYmIHRoaXMuVGlsZXNbeF1beV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW3hdW3ldLklzVmlzaXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNsb25lKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2xkU3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvYmosIG51bGwpO1xyXG4gICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2xkU3RhdGUsIG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbC9UaWxlTW9kZWwudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVWaWV3IHtcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY29udGVudDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIsIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LCBtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUocm93LCBjb2wsIHNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSByb3cgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBjb2wgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3RpbGUnO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHB1YmxpYyBEaXNwbGF5KG1vZGVsOiBUaWxlTW9kZWwpIHsgXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1Zpc2l0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2UzZTNlMyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltYWdlcy9cIiArIG1vZGVsLlR5cGUgKyBcIi5wbmcnKVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnIzM2MzYzNic7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSBwbGF5ZXInO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZVZpZXcudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBWaWV3IHtcclxuICAgICAgICAvLyBjb25zdGFudHNcclxuICAgICAgICB0aWxlQ291bnQgPSAxMztcclxuXHJcbiAgICAgICAgLy8gdmlld3NcclxuICAgICAgICB0aWxlczogVGlsZVZpZXdbXVtdO1xyXG5cclxuICAgICAgICAvLyBtb2RlbFxyXG4gICAgICAgIG1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKG1vZGVsOiBNYXBNb2RlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZW1hcCBjb25zdHJ1Y3RvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aWxlIHZpZXdzIFxyXG4gICAgICAgICAgICB2YXIgbWFwV2lkdGggPSBtYXBFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgdGlsZVNpemUgPSBtYXBXaWR0aCAvIHRoaXMudGlsZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50aWxlQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tpXVtqXSA9IG5ldyBUaWxlVmlldyhpLCBqLCB0aWxlU2l6ZSwgZWxlbWVudCwgdGhpcy5tb2RlbC5UaWxlc1tqXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERpc3BsYXkoKSB7XHJcbiAgICAgICAgICAgIC8vIHNjcm9sbGluZyBtZWNoYW5pc21cclxuICAgICAgICAgICAgLy92YXIgbWlkZGxlID0gTWF0aC5mbG9vcih0aGlzLnRpbGVDb3VudCAvIDIpO1xyXG4gICAgICAgICAgICAvL3ZhciBsZWZ0ID0gdGhpcy5tb2RlbC5QbGF5ZXIuWCA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5YID4gKHRoaXMubW9kZWwuV2lkdGggLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuV2lkdGggLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgICA6IHRoaXMubW9kZWwuUGxheWVyLlggLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b3AgPSB0aGlzLm1vZGVsLlBsYXllci5ZIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgPiAodGhpcy5tb2RlbC5IZWlnaHQgLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuSGVpZ2h0IC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2RlbC5UaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1vZGVsLlRpbGVzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzW2pdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlBsYXllci5YID09IGkgJiYgdGhpcy5tb2RlbC5QbGF5ZXIuWSA9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuRGlzcGxheSh0aGlzLm1vZGVsLlRpbGVzW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tb2RlbC5UaWxlc1t0aGlzLm1vZGVsLlBsYXllci5YXVt0aGlzLm1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50VGlsZSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gQ20yazE1LmRpcmVjdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1cIiArIGRpcmVjdGlvbiArIFwiLWNvbW1hbmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbW92ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYWxsb3dlZCA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0b3J5SW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnktaW1hZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KG1vZGVsOiBTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IG1vZGVsLlN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zcmMgPSAnaW1hZ2VzL3N0b3J5LycgKyBtb2RlbC5JZCArICcucG5nJztcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwibW9kZWwvTWFwTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L01hcFZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L1N0b3J5Vmlldy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgICAgIHByaXZhdGUgbWFwVmlldzogTWFwVmlldztcclxuICAgICAgICBwcml2YXRlIG1hcE1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeVZpZXc6IFN0b3J5VmlldztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kczogeyBba2V5OiBzdHJpbmddOiAoYXJncykgPT4gYW55IH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWVzc2FnZUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgc3RhdGUgYW5kIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIHRoaXMubWFwTW9kZWwgPSBuZXcgTWFwTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBtYXAgdmlld1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcgPSBuZXcgTWFwVmlldyh0aGlzLm1hcE1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3ID0gbmV3IFN0b3J5VmlldygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmRzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZCgnbW92ZScsIHRoaXMubW92ZUNvbW1hbmQpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtdXAtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuVXApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1kb3duLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkRvd24pO1xyXG4gICAgICAgICAgICB9OyBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtcmlnaHQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuUmlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1sZWZ0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkxlZnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmQoa2V5OiBzdHJpbmcsIGNvbW1hbmQ6IChhcmdzKSA9PiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kc1trZXldID0gY29tbWFuZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNvbW1hbmQodGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSBwYXJ0c1swXTtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHMuc3BsaWNlKDEsIHBhcnRzLmxlbmd0aCAtIDEpIDogW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVDb21tYW5kKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAvL2lmICh0aGlzLm1hcE1vZGVsLlBsYXllci5Jc0luU3RvcnkpXHJcbiAgICAgICAgICAgIC8vICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSB0aGlzLm1hcE1vZGVsLlRpbGVzW3RoaXMubWFwTW9kZWwuUGxheWVyLlhdW3RoaXMubWFwTW9kZWwuUGxheWVyLlldO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSkgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VycmUgbmVtIG1laGV0c3onO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubWFwTW9kZWwuTW92ZVBsYXllcihkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3LkRyYXcocmVzdWx0LlN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuTWVzc2FnZSArICgocmVzdWx0LlN0b3J5ICYmICgnPC9icj4nICsgcmVzdWx0LlN0b3J5LlN0b3J5KSkgfHwgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJHYW1lLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICB2YXIgZ2FtZSA9IG5ldyBDbTJrMTUuR2FtZSgpO1xyXG59XHJcbiAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOiBQbGF5ZXJNb2RlbDtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6IFRpbGVNb2RlbFtdW107XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
