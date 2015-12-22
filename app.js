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
    Cm2k15.villagemap = [
        ["m", "rexitv"],
        ["bexitv", "-"],
    ];
    Cm2k15.canMoveOnVillageMap = [
        ['dr', ''],
        ['', '']
    ];
    Cm2k15.barnmap = [
        ["texitb", "-"],
        ["b", "rexitb"],
    ];
    Cm2k15.canMoveOnBarnMap = [
        ['', ''],
        ['ur', '']
    ];
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
        'm': new Cm2k15.StoryModel('m8', 'Manó falva'),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLmdldERpcmVjdGlvbnMiLCJDbTJrMTUuTWFwTW9kZWwuTW92ZVBsYXllciIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRpc3BsYXkiLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtLQUNiQSxDQUFDQTtBQUNKQSxDQUFDQSxFQVBNLE1BQU0sS0FBTixNQUFNLFFBT1o7QUNQRCx5Q0FBeUM7QUFFekMsSUFBTyxNQUFNLENBMkJaO0FBM0JELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFPSUMsbUJBQVlBLFFBQWdCQTtZQUN4QkMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFD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RUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDekVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ2hGQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQTtRQUNwRkEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDckVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzdFQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN2RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDekVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQzVFQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUM5RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDckVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzFFQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUMzRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDcEVBLENBQUNBO0lBQ0ZBLG1CQUFZQSxHQUFHQTtRQUNYQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDcERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3JEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekVBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3pEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN2REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDNURBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUN4REEsQ0FBQ0E7SUFFRkEsaUJBQVVBLEdBQUdBO1FBQ1RBLENBQUNBLEdBQUdBLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ25CQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFD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QUNBO1lBRWpDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkJBLElBQUlBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO2dCQUNqQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLEVBQUVBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUNqREEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDN0JBLENBQUNBO1lBRURBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUM1Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQy9DQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDeENBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNsQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Es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Q0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQy9DQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDbERBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUM1QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZEQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDM0NBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDSkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQzVDQSxDQUFDQTtvQkFFREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVEQSxJQUFJQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFD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Q0FFWjtBQUZELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDYkEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7QUFDL0JBLENBQUNBLEVBRk0sTUFBTSxLQUFOLE1BQU0sUUFFWjtBQ0hELElBQU8sTUFBTSxDQUtaO0FBTEQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYQTtRQUFBdUM7UUFHQUMsQ0FBQ0E7UUFBREQsaUJBQUNBO0lBQURBLENBSEF2QyxBQUdDdUMsSUFBQXZDO0lBSFlBLGlCQUFVQSxhQUd0QkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUFMTSxNQUFNLEtBQU4sTUFBTSxRQUtaIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBDbTJrMTUge1xyXG4gIGV4cG9ydCB2YXIgZGlyZWN0aW9ucyA9IHtcclxuICAgIFVwOiAndXAnLFxyXG4gICAgUmlnaHQ6ICdyaWdodCcsXHJcbiAgICBEb3duOiAnZG93bicsXHJcbiAgICBMZWZ0OiAnbGVmdCdcclxuICB9O1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1vdmVEaXJlY3Rpb25zLnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGlsZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgSXNWaXNpdGVkOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBJc1BsYXllcjogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgVHlwZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBBbGxvd2VkTW92ZXM6IHN0cmluZ1tdO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogU3RvcnlNb2RlbDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodGlsZVR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLklzVmlzaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLklzUGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHRpbGVUeXBlO1xyXG4gICAgICAgICAgICB0aGlzLkFsbG93ZWRNb3ZlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uVmFsdWVzID0gT2JqZWN0LmtleXMoQ20yazE1LmRpcmVjdGlvbnMpLm1hcChrID0+IENtMmsxNS5kaXJlY3Rpb25zW2tdKTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvblZhbHVlcy5pbmRleE9mKGRpcmVjdGlvbikgIT0gLTEgJiYgdGhpcy5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMucHVzaChkaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnMoZGlyZWN0aW9uczogc3RyaW5nW10pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbihkaXJlY3Rpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck1vdmVSZXN1bHQge1xyXG4gICAgICAgIHB1YmxpYyBTdWNjZXNzOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIFN0b3J5OiBTdG9yeU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgWTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBJc0luU3Rvcnk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllck1vZGVsID0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gcGxheWVyLlg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlkgPSBwbGF5ZXIuWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXNJblN0b3J5ID0gcGxheWVyLklzSW5TdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIDogUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGxheWVyTW92ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5VcDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5Eb3duOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSAnTW92ZSB3aGVyZT8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSBcIllvdSBoYXZlIG1vdmVkIFwiICsgZGlyZWN0aW9uICsgXCIuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBzdG9yeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5TdG9yeSA9IHN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWFwVHJhbnNwb3J0IHtcclxuICAgICAgICBtYXA6IHN0cmluZ1tdW107XHJcbiAgICAgICAgbW92ZW1lbnRzOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIHRpbGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdmFyIGdhbWVtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGZhY3RvcnltYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGJhcm5tYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25NYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkZhY3RvcnlNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPblZpbGxhZ2VNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkJhcm5NYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBtYXBUcmFuc3BvcnRzOiB7IFtrZXk6IHN0cmluZ106IElNYXBUcmFuc3BvcnQgfTtcclxuXHJcbiAgICBnYW1lbWFwID0gW1xyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4J10sXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnZTknLCAnZTEwJywgJ2UxMScsICdlMTInLCAnZTEzJywgJ2UxNCcsICdlMTUnLCAnZTE2J10sXHJcbiAgICAgICAgWyctJywgJ20xJywgJ20yJywgJ20zJywgJy0nLCAnZTE3JywgJ2UxNycsICdlMTknLCAnZTIwJywgJ2UyMScsICdlMjInLCAnZTIzJywgJ2UyNCddLFxyXG4gICAgICAgIFsnLScsICdtNCcsICdtNScsICdtNicsICctJywgJy0nLCAnLScsICctJywgJ3U1JywgJy0nLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnbTcnLCAnbTgnLCAndTF2JywgJ3UxJywgJ3UxJywgJ3UyJywgJ3UxJywgJ3UzJywgJ3UxJywgJ3UxJywgJ3U0JywgJy0nXSxcclxuICAgICAgICBbJy0nLCAndTV2JywgJy0nLCAnLScsICctJywgJy0nLCAndTVnJywgJy0nLCAnLScsICctJywgJy0nLCAnaDEnLCAnaDInXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2cxJywgJ2cyJywgJ2czJywgJ2c0JywgJ2c1JywgJy0nLCAnLScsICdoMycsICdoNCddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJywgJ2s0JywgJ2sxJywgJ2sxJywgJ2sxJ10sXHJcbiAgICAgICAgWyctJywgJ3U1YicsICctJywgJy0nLCAnZzExJywgJ2cxMicsICdnMTMnLCAnZzE0JywgJ2cxNScsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdpMScsICdpMicsICctJywgJy0nLCAnLScsICdsJywgJy0nLCAnZjEnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTMnLCAnaTQnLCAnaTUnLCAndTFiJywgJ3UxJywgJ3U2JywgJy0nLCAnZjInLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2tiJywgJ2sxJywgJ2sxJywgJ2szJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJ11cclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25NYXAgPSBbXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICdkJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAncicsICdscicsICdscicsICdscicsICdscmQnLCAncmwnLCAndWxyJywgJ3JsJywgJ3JsJywgJ2RsJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZHUnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJ3InLCAnbHInLCAnbHInLCAndWRsJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuXHJcbiAgICBmYWN0b3J5bWFwID0gW1xyXG4gICAgICAgIFsnLScsICd0ZXhpdCcsICctJ10sXHJcbiAgICAgICAgWyd0bCcsICd0bScsICd0ciddLFxyXG4gICAgICAgIFsnYmwnLCAnYm0nLCAnYnInXSxcclxuICAgICAgICBbJy0nLCAnYmV4aXQnLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uRmFjdG9yeU1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsncicsICd1ZGxyJywgJ2wnXSxcclxuICAgICAgICBbJycsICd1JywgJyddXHJcbiAgICBdO1xyXG5cclxuICAgIHZpbGxhZ2VtYXAgPSBbXHJcbiAgICAgICAgW1wibVwiLCBcInJleGl0dlwiXSxcclxuICAgICAgICBbXCJiZXhpdHZcIiwgXCItXCJdLFxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPblZpbGxhZ2VNYXAgPSBbXHJcbiAgICAgICAgWydkcicsJyddLFxyXG4gICAgICAgIFsnJywnJ11cclxuICAgIF07XHJcblxyXG4gICAgYmFybm1hcCA9IFtcclxuICAgICAgICBbXCJ0ZXhpdGJcIiwgXCItXCJdLFxyXG4gICAgICAgIFtcImJcIiwgXCJyZXhpdGJcIl0sXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uQmFybk1hcCA9IFtcclxuICAgICAgICBbJycsJyddLFxyXG4gICAgICAgIFsndXInLCcnXVxyXG4gICAgXTtcclxuXHJcbiAgICBtYXBUcmFuc3BvcnRzID0ge1xyXG4gICAgICAgIC8vIG1hcCA9PiBmYWN0b3J5bWFwXHJcbiAgICAgICAgJ2cxMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAnYmV4aXQnIH0sXHJcbiAgICAgICAgJ2czJzogeyBtYXA6IGZhY3RvcnltYXAsIG1vdmVtZW50czogY2FuTW92ZU9uRmFjdG9yeU1hcCAsIHRpbGU6ICd0bScgfSxcclxuXHJcbiAgICAgICAgLy8gbWFwID0+IHZpbGxhZ2VtYXBcclxuICAgICAgICAnbTgnOiB7IG1hcDogdmlsbGFnZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25WaWxsYWdlTWFwLCB0aWxlOiAnbScgfSxcclxuICAgICAgICAnbTcnOiB7IG1hcDogdmlsbGFnZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25WaWxsYWdlTWFwLCB0aWxlOiAnbScgfSxcclxuXHJcbiAgICAgICAgLy8gbWFwID0+IGJhcm5tYXBcclxuICAgICAgICAnaTEnOiB7IG1hcDogYmFybm1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25CYXJuTWFwLCB0aWxlOiAnYicgfSxcclxuICAgICAgICAnaTUnOiB7IG1hcDogYmFybm1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25CYXJuTWFwLCB0aWxlOiAnYicgfSxcclxuXHJcbiAgICAgICAgLy8gZmFjdG9yeW1hcCA9PiBtYXBcclxuICAgICAgICAnYmV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICdsJyB9LFxyXG4gICAgICAgICd0ZXhpdCc6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1ZycgfSxcclxuXHJcbiAgICAgICAgLy8gdmlsbGFnZW1hcCA9PiBtYXBcclxuICAgICAgICAncmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTF2JyB9LFxyXG4gICAgICAgICdiZXhpdHYnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NXYnIH0sXHJcblxyXG4gICAgICAgIC8vIGJhcm5tYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxYicgfSxcclxuICAgICAgICAndGV4aXRiJzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTViJyB9LFxyXG4gICAgfTtcclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IHZhciBzdG9yaWVzVGlsZU1hcHBpbmc6IHsgW2tleTogc3RyaW5nXTogU3RvcnlNb2RlbCB9O1xyXG4gICAgZXhwb3J0IHZhciB0d29TdGF0ZVN0b3Jlczogc3RyaW5nW107XHJcblxyXG4gICAgc3Rvcmllc1RpbGVNYXBwaW5nID0ge1xyXG4gICAgICAgICdrYic6IG5ldyBTdG9yeU1vZGVsKCdrYicsXHJcbiAgICAgICAgICAgICdFeiBhIGJlasOhcmF0ISdcclxuICAgICAgICApLFxyXG4gICAgICAgICdiJzogbmV3IFN0b3J5TW9kZWwoJ2k1JyxcclxuICAgICAgICAgICAgJ0V6IGF6IGlzdMOhbGzDsywgaXR0IHRhbMOhbG9kIGEga8Opc3rDvGzFkWTFkSBtYW7Ds2thdCwgYWtpayB0YW5rb2xqw6FrIGEgc3rDoW50LCBwb2zDrXJvenrDoWsgUnVkb2xmIG9ycsOhdCwgw6lzIHbDoXJqw6FrIE1pa3Vsw6FzdC4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQnOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQnLFxyXG4gICAgICAgICAgICAnU3ppYSEgTWVndGFsw6FsdGFkIGEgTWlrdWzDoXMgZ3nDoXLDoXQsIMOpbiBsZXN6ZWsgYSBrYWxhdXpvZC4gQW1lZGRpZyBNaWt1bMOhcyBrw6lzesO8bMWRZGlrLCBtZWdpc21lcmhldGVkIGEgbcWxaGVsecOpdCwgc8WRdCBraSBpcyBwcsOzYsOhbGhhdG9kISBHeWVyZSBiZWxqZWJiLCBtZWdtdXRhdG9tISdcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdDInOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQyJyxcclxuICAgICAgICAgICAgJ0V6IGEgYmVqw6FyYXQgYSBnecOhcmJhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bCc6IG5ldyBTdG9yeU1vZGVsKCd0bCcsXHJcbiAgICAgICAgICAgICdNQUdJQyEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndG0nOiBuZXcgU3RvcnlNb2RlbCgndG0nLFxyXG4gICAgICAgICAgICAnSm9iYnJhIGZlc3RlZ2V0aGVzeiwgYmFscmEgcGVkaWcgbWluZGVuIMOpcnRlbG1ldCBueWVyLiBBeiBtZWcgYSBow6F0c8OzIGtpasOhcmF0IGF6IGVyZMWRIGZlbMOpLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0cic6IG5ldyBTdG9yeU1vZGVsKCd0cicsXHJcbiAgICAgICAgICAgICdFeiBhIGZlc3TFkXMgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JsJzogbmV3IFN0b3J5TW9kZWwoJ2JsJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHJha3TDoXIgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JyJzogbmV3IFN0b3J5TW9kZWwoJ2JyJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHN6ZXJlbMWRcyBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm0nOiBuZXcgU3RvcnlNb2RlbCgnYm0nLFxyXG4gICAgICAgICAgICAnw5xkdiBhIGd5w6FyYmFuLCBiYWxyYSB2YW4gYSByYWt0w6FyLCBqb2JicmEgYSBzemVyZWzFkSBzem9iYSwgYXJyYSBlbMWRcmUgcGVkaWcgZWd5IGvDtnZldGtlesWRIGZvbHlvc8OzLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdtJzogbmV3IFN0b3J5TW9kZWwoJ204JyxcclxuICAgICAgICAgICAgJ01hbsOzIGZhbHZhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2UyMCc6IG5ldyBTdG9yeU1vZGVsKCdlMjAnLFxyXG4gICAgICAgICAgICAnRXJkZcWRJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2gxJzogbmV3IFN0b3J5TW9kZWwoJ2gxJyxcclxuICAgICAgICAgICAgJ1RhdmFjc2thJ1xyXG4gICAgICAgICksXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0d29TdGF0ZVN0b3JlcyA9IFtcImJleGl0XCJdO1xyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQbGF5ZXJNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0b3J5TW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvbWFwcy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvc3Rvcmllcy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcE1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6VGlsZU1vZGVsW11bXTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOlBsYXllck1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgV2lkdGg6bnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBIZWlnaHQ6bnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRlQmFja3VwOiBTdGF0ZU1vZGVsO1xyXG4gICAgICAgIHByaXZhdGUgdmlzaXRlZFN0b3JpZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFwKGdhbWVtYXAsIGNhbk1vdmVPbk1hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5YID0gNjtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IDEyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWRTdG9yaWVzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWRNYXAobWFwOnN0cmluZ1tdW10sIG1vdmVtZW50czpzdHJpbmdbXVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuV2lkdGggPSBtYXAubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLkhlaWdodCA9IG1hcFswXS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRpbGVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuSGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbaV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5XaWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSBuZXcgVGlsZU1vZGVsKG1hcFtqXVtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9ucyh0aGlzLmdldERpcmVjdGlvbnMobW92ZW1lbnRzLCBqLCBpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlR5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldW2pdID0gdGlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZW1lbnRNYXAgPSB7XHJcbiAgICAgICAgICAgICd1JzogQ20yazE1LmRpcmVjdGlvbnMuVXAsXHJcbiAgICAgICAgICAgICdkJzogQ20yazE1LmRpcmVjdGlvbnMuRG93bixcclxuICAgICAgICAgICAgJ2wnOiBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0LFxyXG4gICAgICAgICAgICAncic6IENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREaXJlY3Rpb25zKG1vdmVtZW50czpzdHJpbmdbXVtdLCB4Om51bWJlciwgeTpudW1iZXIpOnN0cmluZ1tdIHtcclxuICAgICAgICAgICAgdmFyIG1vdmVtZW50Q2VsbCA9IG1vdmVtZW50c1t4XVt5XTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG1vdmVtZW50Q2VsbC5zcGxpdCgnJykubWFwKGQgPT4gdGhpcy5tb3ZlbWVudE1hcFtkXSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVBsYXllcihkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gdGhpcy5QbGF5ZXIuTW92ZShkaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgIHRpbGUuSXNWaXNpdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gbWFwVHJhbnNwb3J0c1t0aWxlLlR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHJhbnNwb3J0KHRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLlN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52aXNpdGVkU3Rvcmllcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nW3RpbGUuU3RvcnkuSWQrJzInXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuU3RvcnkgPSB0aWxlLlN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLklzSW5TdG9yeSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3b1N0YXRlU3RvcmVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgIT0gLTEgJiYgdGhpcy52aXNpdGVkU3Rvcmllcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpc2l0ZWRTdG9yaWVzLnB1c2godGlsZS5TdG9yeS5JZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLklzSW5TdG9yeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBHZW5lcmF0ZVN0YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGVNb2RlbCgpO1xyXG4gICAgICAgICAgICBzdGF0ZS5QbGF5ZXIgPSB0aGlzLmNsb25lKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgc3RhdGUuVGlsZXMgPSB0aGlzLmNsb25lKHRoaXMuVGlsZXMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUcmFuc3BvcnQodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuR2VuZXJhdGVTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVCYWNrdXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlQmFja3VwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2FkU3RhdGUocHJldlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTWFwKHRyYW5zcG9ydC5tYXAsIHRyYW5zcG9ydC5tb3ZlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cCA9IHN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zcG9ydC5tYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdHJhbnNwb3J0Lm1hcFtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQubWFwW2ldW2pdID09IHRyYW5zcG9ydC50aWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlggPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5ZID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZFN0YXRlKHN0YXRlOiBTdGF0ZU1vZGVsKXtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyTW9kZWwoc3RhdGUuUGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IHN0YXRlLlRpbGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrU3Vycm91bmRWaXNpdGVkKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5IC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5IC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5IC0gMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5ICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5ICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE1hcmtWaXNpdGllZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGlsZXNbeF0gJiYgdGhpcy5UaWxlc1t4XVt5XSlcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbeF1beV0uSXNWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvbmUob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGU7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG9iaiwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvbGRTdGF0ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vZGVsL1RpbGVNb2RlbC50c1wiLz5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGlsZVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlciwgZWxlbWVudDogSFRNTERpdkVsZW1lbnQsIG1vZGVsOiBUaWxlTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShyb3csIGNvbCwgc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemUocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IHJvdyAqIHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGNvbCAqIHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSc7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcHVibGljIERpc3BsYXkobW9kZWw6IFRpbGVNb2RlbCkgeyBcclxuICAgICAgICAgICAgaWYgKG1vZGVsLklzVmlzaXRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZTNlM2UzJztcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnaW1hZ2VzL1wiICsgbW9kZWwuVHlwZSArIFwiLnBuZycpXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9ICcjMzYzNjM2JzsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1BsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd0aWxlIHBsYXllcic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd0aWxlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlVmlldy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcFZpZXcge1xyXG4gICAgICAgIC8vIGNvbnN0YW50c1xyXG4gICAgICAgIHRpbGVDb3VudCA9IDEzO1xyXG5cclxuICAgICAgICAvLyB2aWV3c1xyXG4gICAgICAgIHRpbGVzOiBUaWxlVmlld1tdW107XHJcblxyXG4gICAgICAgIC8vIG1vZGVsXHJcbiAgICAgICAgbW9kZWw6IE1hcE1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IobW9kZWw6IE1hcE1vZGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lbWFwIGNvbnN0cnVjdG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFwRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIGdhbWUgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRpbGUgdmlld3MgXHJcbiAgICAgICAgICAgIHZhciBtYXBXaWR0aCA9IG1hcEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB0aWxlU2l6ZSA9IG1hcFdpZHRoIC8gdGhpcy50aWxlQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbGVDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnB1c2goW10pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRpbGVDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW2ldW2pdID0gbmV3IFRpbGVWaWV3KGksIGosIHRpbGVTaXplLCBlbGVtZW50LCB0aGlzLm1vZGVsLlRpbGVzW2pdW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGlzcGxheSgpIHtcclxuICAgICAgICAgICAgLy8gc2Nyb2xsaW5nIG1lY2hhbmlzbVxyXG4gICAgICAgICAgICAvL3ZhciBtaWRkbGUgPSBNYXRoLmZsb29yKHRoaXMudGlsZUNvdW50IC8gMik7XHJcbiAgICAgICAgICAgIC8vdmFyIGxlZnQgPSB0aGlzLm1vZGVsLlBsYXllci5YIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlggPiAodGhpcy5tb2RlbC5XaWR0aCAtIDEgLSBtaWRkbGUpID8gdGhpcy5tb2RlbC5XaWR0aCAtIHRoaXMudGlsZUNvdW50XHJcbiAgICAgICAgICAgIC8vICAgIDogdGhpcy5tb2RlbC5QbGF5ZXIuWCAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHRvcCA9IHRoaXMubW9kZWwuUGxheWVyLlkgPCAobWlkZGxlKSA/IDBcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSA+ICh0aGlzLm1vZGVsLkhlaWdodCAtIDEgLSBtaWRkbGUpID8gdGhpcy5tb2RlbC5IZWlnaHQgLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5ZIC0gbWlkZGxlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZGVsLlRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubW9kZWwuVGlsZXNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNbal1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuUGxheWVyLlggPT0gaSAmJiB0aGlzLm1vZGVsLlBsYXllci5ZID09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5UaWxlc1tpXVtqXS5Jc1BsYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5UaWxlc1tpXVtqXS5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5EaXNwbGF5KHRoaXMubW9kZWwuVGlsZXNbaV1bal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSB0aGlzLm1vZGVsLlRpbGVzW3RoaXMubW9kZWwuUGxheWVyLlhdW3RoaXMubW9kZWwuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGN1cnJlbnRUaWxlKTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoQ20yazE1LmRpcmVjdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBDbTJrMTUuZGlyZWN0aW9uc1trZXldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93ZWQgPSBjdXJyZW50VGlsZS5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9PSAtMTtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3ZlLVwiICsgZGlyZWN0aW9uICsgXCItY29tbWFuZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBhbGxvd2VkID8gJ2lubGluZS1ibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5VmlldyB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlJbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudCA9IDxIVE1MSW1hZ2VFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yeS1pbWFnZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXcobW9kZWw6IFN0b3J5TW9kZWwpIHtcclxuICAgICAgICAgICAgaWYgKCFtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQuaW5uZXJUZXh0ID0gbW9kZWwuU3Rvcnk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnNyYyA9ICdpbWFnZXMvc3RvcnkvJyArIG1vZGVsLklkICsgJy5wbmcnO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS56SW5kZXggPSAnMic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJtb2RlbC9NYXBNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInZpZXcvTWFwVmlldy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInZpZXcvU3RvcnlWaWV3LnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3O1xyXG4gICAgICAgIHByaXZhdGUgbWFwTW9kZWw6IE1hcE1vZGVsO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0b3J5VmlldzogU3RvcnlWaWV3O1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbW1hbmRzOiB7IFtrZXk6IHN0cmluZ106IChhcmdzKSA9PiBhbnkgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtZXNzYWdlRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBzdGF0ZSBhbmQgY29tbWFuZHNcclxuICAgICAgICAgICAgdGhpcy5tYXBNb2RlbCA9IG5ldyBNYXBNb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzID0ge307XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIG1hcCB2aWV3XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldyA9IG5ldyBNYXBWaWV3KHRoaXMubWFwTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuRGlzcGxheSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcgPSBuZXcgU3RvcnlWaWV3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKCdtb3ZlJywgdGhpcy5tb3ZlQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS11cC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5VcCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLWRvd24tY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuRG93bik7XHJcbiAgICAgICAgICAgIH07IFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1yaWdodC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLWxlZnQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuTGVmdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZChrZXk6IHN0cmluZywgY29tbWFuZDogKGFyZ3MpID0+IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzW2tleV0gPSBjb21tYW5kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQ29tbWFuZCh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0cy5zcGxpY2UoMSwgcGFydHMubGVuZ3RoIC0gMSkgOiBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHNbY29tbWFuZF0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZUNvbW1hbmQoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMubWFwTW9kZWwuUGxheWVyLklzSW5TdG9yeSlcclxuICAgICAgICAgICAgLy8gIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGlsZSA9IHRoaXMubWFwTW9kZWwuVGlsZXNbdGhpcy5tYXBNb2RlbC5QbGF5ZXIuWF1bdGhpcy5tYXBNb2RlbC5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGlsZS5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pID09IC0xKSBcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyZSBuZW0gbWVoZXRzeic7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5tYXBNb2RlbC5Nb3ZlUGxheWVyKGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0LlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcuRHJhdyhyZXN1bHQuU3RvcnkpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuRGlzcGxheSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5NZXNzYWdlICsgKChyZXN1bHQuU3RvcnkgJiYgKCc8L2JyPicgKyByZXN1bHQuU3RvcnkuU3RvcnkpKSB8fCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkdhbWUudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gIHZhciBnYW1lID0gbmV3IENtMmsxNS5HYW1lKCk7XHJcbn1cclxuICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXI6IFBsYXllck1vZGVsO1xyXG4gICAgICAgIHB1YmxpYyBUaWxlczogVGlsZU1vZGVsW11bXTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
