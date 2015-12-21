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
        ['-', 'u5', '-', '-', '-', '-', 'u5', '-', '-', '-', '-', 'h1', 'h1'],
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
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
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
        ['', '', '']
    ];
    Cm2k15.mapTransports = {
        // map => factorymap
        'g13': { map: Cm2k15.factorymap, movements: Cm2k15.canMoveOnFactoryMap, tile: 'bm' },
        // factorymap => map
        'bexit': { map: Cm2k15.gamemap, movements: Cm2k15.canMoveOnMap, tile: 'l' }
    };
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    Cm2k15.storiesTileMapping = {
        'kb': new Cm2k15.StoryModel('kb', 'Ez a bejárat!'),
        'i5': new Cm2k15.StoryModel('i5', 'Ez az istálló, itt találod a készülődő manókat, akik tankolják a szánt, polírozzák Rudolf orrát, és várják Mikulást.')
    };
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
            this.stateStack = [];
            this.MarkSurroundVisited(this.Player.X, this.Player.Y);
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
                if (tile.Story) {
                    response.Story = tile.Story;
                    this.Player.IsInStory = true;
                }
                else {
                    this.Player.IsInStory = false;
                }
                var transport = Cm2k15.mapTransports[tile.Type];
                if (transport) {
                    this.Transport(transport);
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
            if (this.stateStack.length > 0) {
                var prevState = this.stateStack.pop();
                this.LoadState(prevState);
            }
            else {
                for (var i = 0; i < transport.map.length; i++) {
                    for (var j = 0; j < transport.map[i].length; j++) {
                        if (transport.map[j][i] == transport.tile) {
                            this.Player.X = i;
                            this.Player.Y = j;
                        }
                    }
                }
                this.loadMap(transport.map, transport.movements);
            }
            this.stateStack.push(state);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLmdldERpcmVjdGlvbnMiLCJDbTJrMTUuTWFwTW9kZWwuTW92ZVBsYXllciIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRpc3BsYXkiLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtLQUNiQSxDQUFDQTtBQUNKQSxDQUFDQSxFQVBNLE1BQU0sS0FBTixNQUFNLFFBT1o7QUNQRCx5Q0FBeUM7QUFFekMsSUFBTyxNQUFNLENBMkJaO0FBM0JELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFPSUMsbUJBQVlBLFFBQWdCQTtZQUN4QkMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFD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QSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDaEZBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ3BGQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3JFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzdFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDekVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDcERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDcERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUM1REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNs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M0JBLFVBQTRCQSxDQUFRQSxFQUFFQSxDQUFRQTtZQUMxQ1EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUU1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVoQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7UUFFT1IsK0JBQVlBLEdBQXBCQSxVQUFxQkEsQ0FBUUEsRUFBRUEsQ0FBUUE7WUFDbkNTLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNB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SUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO29CQUMzQ0EsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNKQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDNUNBLENBQUNBO29CQUVEQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekNBLENBQUNBO1lBQ0xBLENBQUNBO1lBRURBLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzdFQSwyQkFBMkJBO1lBQzNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFBQSxHQUFHQTtnQkFDdENBLElBQUlBLFNBQVNBLEdB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QSxDQUFBQTtBQUNMQSxDQUFDQSxFQUxNLE1BQU0sS0FBTixNQUFNLFFBS1oiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIENtMmsxNSB7XHJcbiAgZXhwb3J0IHZhciBkaXJlY3Rpb25zID0ge1xyXG4gICAgVXA6ICd1cCcsXHJcbiAgICBSaWdodDogJ3JpZ2h0JyxcclxuICAgIERvd246ICdkb3duJyxcclxuICAgIExlZnQ6ICdsZWZ0J1xyXG4gIH07XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiTW92ZURpcmVjdGlvbnMudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBUaWxlTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJc1Zpc2l0ZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIElzUGxheWVyOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBUeXBlOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIEFsbG93ZWRNb3Zlczogc3RyaW5nW107XHJcbiAgICAgICAgcHVibGljIFN0b3J5OiBTdG9yeU1vZGVsO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aWxlVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSXNWaXNpdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuSXNQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdGlsZVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uKGRpcmVjdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb25WYWx1ZXMgPSBPYmplY3Qua2V5cyhDbTJrMTUuZGlyZWN0aW9ucykubWFwKGsgPT4gQ20yazE1LmRpcmVjdGlvbnNba10pO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uVmFsdWVzLmluZGV4T2YoZGlyZWN0aW9uKSAhPSAtMSAmJiB0aGlzLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbG93ZWRNb3Zlcy5wdXNoKGRpcmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9ucyhkaXJlY3Rpb25zOiBzdHJpbmdbXSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcmVjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uKGRpcmVjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgcHVibGljIFN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIE1lc3NhZ2U6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgWDogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBZOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIElzSW5TdG9yeTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHBsYXllcjogUGxheWVyTW9kZWwgPSBudWxsKXtcclxuICAgICAgICAgICAgaWYocGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlggPSBwbGF5ZXIuWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuWSA9IHBsYXllci5ZO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Jc0luU3RvcnkgPSBwbGF5ZXIuSXNJblN0b3J5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZShkaXJlY3Rpb246IHN0cmluZykgOiBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQbGF5ZXJNb3ZlUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLlVwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkRvd246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuTGVmdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlgtLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5SaWdodDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlgrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LlN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuTWVzc2FnZSA9ICdNb3ZlIHdoZXJlPyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LlN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXN1bHQuTWVzc2FnZSA9IFwiWW91IGhhdmUgbW92ZWQgXCIgKyBkaXJlY3Rpb24gKyBcIi5cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIFN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHN0b3J5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5JZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLlN0b3J5ID0gc3Rvcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNYXBUcmFuc3BvcnQge1xyXG4gICAgICAgIG1hcDogc3RyaW5nW11bXTtcclxuICAgICAgICBtb3ZlbWVudHM6IHN0cmluZ1tdW107XHJcbiAgICAgICAgdGlsZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCB2YXIgZ2FtZW1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgZmFjdG9yeW1hcDogc3RyaW5nW11bXTtcclxuXHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbk1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgY2FuTW92ZU9uRmFjdG9yeU1hcDogc3RyaW5nW11bXTtcclxuXHJcbiAgICBleHBvcnQgdmFyIG1hcFRyYW5zcG9ydHM6IHsgW2tleTogc3RyaW5nXTogSU1hcFRyYW5zcG9ydCB9O1xyXG5cclxuICAgIGdhbWVtYXAgPSBbXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnXSxcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlOScsICdlMTAnLCAnZTExJywgJ2UxMicsICdlMTMnLCAnZTE0JywgJ2UxNScsICdlMTYnXSxcclxuICAgICAgICBbJy0nLCAnbTEnLCAnbTInLCAnbTMnLCAnLScsICdlMTcnLCAnZTE3JywgJ2UxOScsICdlMjAnLCAnZTIxJywgJ2UyMicsICdlMjMnLCAnZTI0J10sXHJcbiAgICAgICAgWyctJywgJ200JywgJ201JywgJ202JywgJy0nLCAnLScsICctJywgJy0nLCAndTUnLCAnLScsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdtNycsICdtOCcsICd1MScsICd1MScsICd1MScsICd1MicsICd1MScsICd1MycsICd1MScsICd1MScsICd1NCcsICctJ10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICctJywgJy0nLCAndTUnLCAnLScsICctJywgJy0nLCAnLScsICdoMScsICdoMSddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnLScsICctJywgJ2gzJywgJ2g0J10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnLCAnazQnLCAnazEnLCAnazEnLCAnazEnXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2cxMScsICdnMTInLCAnZzEzJywgJ2cxNCcsICdnMTUnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTEnLCAnaTInLCAnLScsICctJywgJy0nLCAnbCcsICctJywgJ2YxJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kzJywgJ2k0JywgJ2k1JywgJ3UxJywgJ3UxJywgJ3U2JywgJy0nLCAnZjInLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2tiJywgJ2sxJywgJ2sxJywgJ2szJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJ11cclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25NYXAgPSBbXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZHUnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJ3InLCAnbHInLCAnbHInLCAndWRsJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuXHJcbiAgICBmYWN0b3J5bWFwID0gW1xyXG4gICAgICAgIFsnLScsICd0ZXhpdCcsICctJ10sXHJcbiAgICAgICAgWyd0bCcsICd0bScsICd0ciddLFxyXG4gICAgICAgIFsnYmwnLCAnYm0nLCAnYnInXSxcclxuICAgICAgICBbJy0nLCAnYmV4aXQnLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uRmFjdG9yeU1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsncicsICd1ZGxyJywgJ2wnXSxcclxuICAgICAgICBbJycsICcnLCAnJ11cclxuICAgIF07XHJcblxyXG4gICAgbWFwVHJhbnNwb3J0cyA9IHtcclxuICAgICAgICAvLyBtYXAgPT4gZmFjdG9yeW1hcFxyXG4gICAgICAgICdnMTMnOiB7IG1hcDogZmFjdG9yeW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25GYWN0b3J5TWFwICwgdGlsZTogJ2JtJyB9LFxyXG5cclxuICAgICAgICAvLyBmYWN0b3J5bWFwID0+IG1hcFxyXG4gICAgICAgICdiZXhpdCc6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ2wnIH1cclxuICAgIH07XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCB2YXIgc3Rvcmllc1RpbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IFN0b3J5TW9kZWwgfVxyXG5cclxuICAgIHN0b3JpZXNUaWxlTWFwcGluZyA9IHtcclxuICAgICAgICAna2InOiBuZXcgU3RvcnlNb2RlbCgna2InLFxyXG4gICAgICAgICAgICAnRXogYSBiZWrDoXJhdCEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnaTUnOiBuZXcgU3RvcnlNb2RlbCgnaTUnLFxyXG4gICAgICAgICAgICAnRXogYXogaXN0w6FsbMOzLCBpdHQgdGFsw6Fsb2QgYSBrw6lzesO8bMWRZMWRIG1hbsOza2F0LCBha2lrIHRhbmtvbGrDoWsgYSBzesOhbnQsIHBvbMOtcm96esOhayBSdWRvbGYgb3Jyw6F0LCDDqXMgdsOhcmrDoWsgTWlrdWzDoXN0LidcclxuICAgICAgICApXHJcblxyXG4gICAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQbGF5ZXJNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0b3J5TW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvbWFwcy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvc3Rvcmllcy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcE1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6VGlsZU1vZGVsW11bXTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOlBsYXllck1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgV2lkdGg6bnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBIZWlnaHQ6bnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRlU3RhY2s6U3RhdGVNb2RlbFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFwKGdhbWVtYXAsIGNhbk1vdmVPbk1hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5YID0gNjtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IDEyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVN0YWNrID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWRNYXAobWFwOnN0cmluZ1tdW10sIG1vdmVtZW50czpzdHJpbmdbXVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuV2lkdGggPSBtYXAubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLkhlaWdodCA9IG1hcFswXS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRpbGVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuSGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbaV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5XaWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSBuZXcgVGlsZU1vZGVsKG1hcFtqXVtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9ucyh0aGlzLmdldERpcmVjdGlvbnMobW92ZW1lbnRzLCBqLCBpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlR5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldW2pdID0gdGlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZW1lbnRNYXAgPSB7XHJcbiAgICAgICAgICAgICd1JzogQ20yazE1LmRpcmVjdGlvbnMuVXAsXHJcbiAgICAgICAgICAgICdkJzogQ20yazE1LmRpcmVjdGlvbnMuRG93bixcclxuICAgICAgICAgICAgJ2wnOiBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0LFxyXG4gICAgICAgICAgICAncic6IENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREaXJlY3Rpb25zKG1vdmVtZW50czpzdHJpbmdbXVtdLCB4Om51bWJlciwgeTpudW1iZXIpOnN0cmluZ1tdIHtcclxuICAgICAgICAgICAgdmFyIG1vdmVtZW50Q2VsbCA9IG1vdmVtZW50c1t4XVt5XTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG1vdmVtZW50Q2VsbC5zcGxpdCgnJykubWFwKGQgPT4gdGhpcy5tb3ZlbWVudE1hcFtkXSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVBsYXllcihkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gdGhpcy5QbGF5ZXIuTW92ZShkaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgIHRpbGUuSXNWaXNpdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5TdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLlN0b3J5ID0gdGlsZS5TdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gbWFwVHJhbnNwb3J0c1t0aWxlLlR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHJhbnNwb3J0KHRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEdlbmVyYXRlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLlBsYXllciA9IHRoaXMuY2xvbmUodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICBzdGF0ZS5UaWxlcyA9IHRoaXMuY2xvbmUodGhpcy5UaWxlcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5HZW5lcmF0ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZVN0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRTdGF0ZShwcmV2U3RhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc3BvcnQubWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmFuc3BvcnQubWFwW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQubWFwW2pdW2ldID09IHRyYW5zcG9ydC50aWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5YID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTWFwKHRyYW5zcG9ydC5tYXAsIHRyYW5zcG9ydC5tb3ZlbWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3RhY2sucHVzaChzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRTdGF0ZShzdGF0ZTogU3RhdGVNb2RlbCl7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKHN0YXRlLlBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBzdGF0ZS5UaWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1N1cnJvdW5kVmlzaXRlZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrVmlzaXRpZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbGVzW3hdICYmIHRoaXMuVGlsZXNbeF1beV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW3hdW3ldLklzVmlzaXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNsb25lKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2xkU3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvYmosIG51bGwpO1xyXG4gICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2xkU3RhdGUsIG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbC9UaWxlTW9kZWwudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVWaWV3IHtcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY29udGVudDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIsIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LCBtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUocm93LCBjb2wsIHNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSByb3cgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBjb2wgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3RpbGUnO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHB1YmxpYyBEaXNwbGF5KG1vZGVsOiBUaWxlTW9kZWwpIHsgXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1Zpc2l0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2UzZTNlMyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltYWdlcy9cIiArIG1vZGVsLlR5cGUgKyBcIi5wbmcnKVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnIzM2MzYzNic7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSBwbGF5ZXInO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZVZpZXcudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBWaWV3IHtcclxuICAgICAgICAvLyBjb25zdGFudHNcclxuICAgICAgICB0aWxlQ291bnQgPSAxMztcclxuXHJcbiAgICAgICAgLy8gdmlld3NcclxuICAgICAgICB0aWxlczogVGlsZVZpZXdbXVtdO1xyXG5cclxuICAgICAgICAvLyBtb2RlbFxyXG4gICAgICAgIG1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKG1vZGVsOiBNYXBNb2RlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZW1hcCBjb25zdHJ1Y3RvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aWxlIHZpZXdzIFxyXG4gICAgICAgICAgICB2YXIgbWFwV2lkdGggPSBtYXBFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgdGlsZVNpemUgPSBtYXBXaWR0aCAvIHRoaXMudGlsZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50aWxlQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tpXVtqXSA9IG5ldyBUaWxlVmlldyhpLCBqLCB0aWxlU2l6ZSwgZWxlbWVudCwgdGhpcy5tb2RlbC5UaWxlc1tqXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERpc3BsYXkoKSB7XHJcbiAgICAgICAgICAgIC8vIHNjcm9sbGluZyBtZWNoYW5pc21cclxuICAgICAgICAgICAgLy92YXIgbWlkZGxlID0gTWF0aC5mbG9vcih0aGlzLnRpbGVDb3VudCAvIDIpO1xyXG4gICAgICAgICAgICAvL3ZhciBsZWZ0ID0gdGhpcy5tb2RlbC5QbGF5ZXIuWCA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5YID4gKHRoaXMubW9kZWwuV2lkdGggLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuV2lkdGggLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgICA6IHRoaXMubW9kZWwuUGxheWVyLlggLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b3AgPSB0aGlzLm1vZGVsLlBsYXllci5ZIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgPiAodGhpcy5tb2RlbC5IZWlnaHQgLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuSGVpZ2h0IC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2RlbC5UaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1vZGVsLlRpbGVzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzW2pdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlBsYXllci5YID09IGkgJiYgdGhpcy5tb2RlbC5QbGF5ZXIuWSA9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuRGlzcGxheSh0aGlzLm1vZGVsLlRpbGVzW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tb2RlbC5UaWxlc1t0aGlzLm1vZGVsLlBsYXllci5YXVt0aGlzLm1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50VGlsZSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gQ20yazE1LmRpcmVjdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1cIiArIGRpcmVjdGlvbiArIFwiLWNvbW1hbmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbW92ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYWxsb3dlZCA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0b3J5SW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnktaW1hZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KG1vZGVsOiBTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IG1vZGVsLlN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zcmMgPSAnaW1hZ2VzL3N0b3J5LycgKyBtb2RlbC5JZCArICcucG5nJztcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwibW9kZWwvTWFwTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L01hcFZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L1N0b3J5Vmlldy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgICAgIHByaXZhdGUgbWFwVmlldzogTWFwVmlldztcclxuICAgICAgICBwcml2YXRlIG1hcE1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeVZpZXc6IFN0b3J5VmlldztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kczogeyBba2V5OiBzdHJpbmddOiAoYXJncykgPT4gYW55IH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWVzc2FnZUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgc3RhdGUgYW5kIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIHRoaXMubWFwTW9kZWwgPSBuZXcgTWFwTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBtYXAgdmlld1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcgPSBuZXcgTWFwVmlldyh0aGlzLm1hcE1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3ID0gbmV3IFN0b3J5VmlldygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmRzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZCgnbW92ZScsIHRoaXMubW92ZUNvbW1hbmQpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtdXAtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuVXApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1kb3duLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkRvd24pO1xyXG4gICAgICAgICAgICB9OyBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtcmlnaHQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuUmlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1sZWZ0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkxlZnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmQoa2V5OiBzdHJpbmcsIGNvbW1hbmQ6IChhcmdzKSA9PiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kc1trZXldID0gY29tbWFuZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNvbW1hbmQodGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSBwYXJ0c1swXTtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHMuc3BsaWNlKDEsIHBhcnRzLmxlbmd0aCAtIDEpIDogW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVDb21tYW5kKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAvL2lmICh0aGlzLm1hcE1vZGVsLlBsYXllci5Jc0luU3RvcnkpXHJcbiAgICAgICAgICAgIC8vICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSB0aGlzLm1hcE1vZGVsLlRpbGVzW3RoaXMubWFwTW9kZWwuUGxheWVyLlhdW3RoaXMubWFwTW9kZWwuUGxheWVyLlldO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSkgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VycmUgbmVtIG1laGV0c3onO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubWFwTW9kZWwuTW92ZVBsYXllcihkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3LkRyYXcocmVzdWx0LlN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuTWVzc2FnZSArICgocmVzdWx0LlN0b3J5ICYmICgnPC9icj4nICsgcmVzdWx0LlN0b3J5LlN0b3J5KSkgfHwgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJHYW1lLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICB2YXIgZ2FtZSA9IG5ldyBDbTJrMTUuR2FtZSgpO1xyXG59XHJcbiAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOiBQbGF5ZXJNb2RlbDtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6IFRpbGVNb2RlbFtdW107XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
