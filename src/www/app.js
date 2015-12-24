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
        ['r', '', 'l'],
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
        'bm': new Cm2k15.StoryModel('bm', 'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslaT... Mivel ilyen jó voltál idén – mondja a manó és elfordul átjavítani a statisztikád -, választhatsz egy ajándékot a Mikulásgyárból:' +
            '<ul><li class="ajandek" id="szanko">Szánkó</li><li class="ajandek" id="hintalo">Hintaló</li><li class="ajandek" id="kisvonat">Kisvonat</li></ul>'),
        'bm2': new Cm2k15.StoryModel('bm', 'Üdv újra a gyárban'),
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
    Cm2k15.twoStateStores = ["bexit", "bm"];
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
            this.lastmap = map;
            this.lastmovements = movements;
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
        MapModel.prototype.ReloadMap = function () {
            this.loadMap(this.lastmap, this.lastmovements);
        };
        MapModel.prototype.getDirections = function (movements, x, y) {
            var _this = this;
            var movementCell = movements[x][y];
            return movementCell.split('').map(function (d) { return _this.movementMap[d]; });
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
        MapModel.prototype.GetCurrentStory = function () {
            return this.Tiles[this.Player.X][this.Player.Y].Story;
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
        MapView.prototype.Draw = function () {
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
            this.storyElement.innerHTML = model.Story;
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
        function StoryLineSetter(gameAgent) {
            this.gameAgent = gameAgent;
        }
        StoryLineSetter.prototype.UpdateBy = function (story) {
            if (!story)
                return;
            switch (story.Id) {
                case 'tm':
                    Cm2k15.canMoveOnBarnMap[1][0] += 'u';
                    break;
                case 'bm':
                    this.subscribeToGifts();
                    break;
                default:
                    return;
            }
            this.gameAgent.Draw();
        };
        StoryLineSetter.prototype.subscribeToGifts = function () {
            var _this = this;
            var enableBM = function () {
                Cm2k15.canMoveOnFactoryMap[2][1] = 'udlr';
                _this.gameAgent.ReloadMap();
                _this.gameAgent.Draw();
            };
            var story = document.getElementById('story');
            story.addEventListener('click', function (e) {
                if (e && e.target && e.target.id == 'hintalo')
                    enableBM();
            });
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
            var _this = this;
            // initialize state and commands
            this.mapModel = new Cm2k15.MapModel();
            this.commands = {};
            this.registerCommands();
            // create map view
            this.mapView = new Cm2k15.MapView(this.mapModel);
            this.mapView.Draw();
            this.storyView = new Cm2k15.StoryView();
            var agent = {
                Draw: function () { return _this.Draw(); },
                ReloadMap: function () { return _this.mapModel.ReloadMap.call(_this.mapModel); }
            };
            this.storyLineSetter = new Cm2k15.StoryLineSetter(agent);
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
            var story = this.mapModel.GetCurrentStory();
            this.Draw();
            this.storyLineSetter.UpdateBy(story);
        };
        Game.prototype.Draw = function () {
            var story = this.mapModel.GetCurrentStory();
            this.storyView.Draw(story);
            this.mapView.Draw();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJTdG9yeUxpbmVTZXR0ZXIudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLlJlbG9hZE1hcCIsIkNtMmsxNS5NYXBNb2RlbC5nZXREaXJlY3Rpb25zIiwiQ20yazE1Lk1hcE1vZGVsLk1vdmVQbGF5ZXIiLCJDbTJrMTUuTWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5IiwiQ20yazE1Lk1hcE1vZGVsLkdlbmVyYXRlU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuVHJhbnNwb3J0IiwiQ20yazE1Lk1hcE1vZGVsLkxvYWRTdGF0ZSIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrU3Vycm91bmRWaXNpdGVkIiwiQ20yazE1Lk1hcE1vZGVsLk1hcmtWaXNpdGllZCIsIkNtMmsxNS5NYXBNb2RlbC5jbG9uZSIsIkNtMmsxNS5UaWxlVmlldyIsIkNtMmsxNS5UaWxlVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlVmlldy5pbml0aWFsaXplIiwiQ20yazE1LlRpbGVWaWV3LkRpc3BsYXkiLCJDbTJrMTUuTWFwVmlldyIsIkNtMmsxNS5NYXBWaWV3LmNvbnN0cnVjdG9yIiwiQ20yazE1Lk1hcFZpZXcuRHJhdyIsIkNtMmsxNS5TdG9yeVZpZXciLCJDbTJrMTUuU3RvcnlWaWV3LmNvbnN0cnVjdG9yIiwiQ20yazE1LlN0b3J5Vmlldy5EcmF3IiwiQ20yazE1LlN0b3J5TGluZVNldHRlciIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuY29uc3RydWN0b3IiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLlVwZGF0ZUJ5IiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5zdWJzY3JpYmVUb0dpZnRzIiwiQ20yazE1LkdhbWUiLCJDbTJrMTUuR2FtZS5jb25zdHJ1Y3RvciIsIkNtMmsxNS5HYW1lLnJlZ2lzdGVyQ29tbWFuZHMiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmQiLCJDbTJrMTUuR2FtZS5vbkNvbW1hbmQiLCJDbTJrMTUuR2FtZS5tb3ZlQ29tbWFuZCIsIkNtMmsxNS5HYW1lLkRyYXciLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtL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SUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDN0VBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3ZFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzlFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDMUVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekRBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdkRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUMzREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0lBRUZBLDBCQUFtQkEsR0FBR0E7UUFDbEJBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ1pBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ2xCQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNkQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUNoQkEsQ0FBQ0E7SUFFRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFDQSxPQUFPQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUxRkEsaUJBQVVBLEdBQUdBO1FBQ1RBLENBQUNBLEdBQUdBLEVBQUVBLFFBQVFBLENBQUNBO1FBQ2ZBLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLENBQUNBO0tBQ2xCQSxDQUFDQTtJQUNGQSwwQkFBbUJBLEdBQUdBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFDQSxFQUFFQSxDQUFDQTtRQUNUQSxDQUFDQSxF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Q0FBQ0E7d0JBQ3hDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDbEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO1lBQ0xBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU9SLDRCQUFTQSxHQUFqQkEsVUFBa0JBLEtBQWlCQTtZQUMvQlMsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsa0JBQVdBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzVDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7UUFFT1Qsc0NBQW1CQSxHQUEzQkEsVUFBNEJBLENBQVFBLEVBQUVBLENBQVFBO1lBQzFDVSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBRTVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBRWhDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3BDQSxDQUFDQTtRQUVPViwrQkFBWUEsR0FBcEJBLFVBQXFCQSxDQUFRQSxFQUFFQSxDQUFRQTtZQUNuQ1csRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFT1gsd0JBQUtBLEdBQWJBLFVBQWNBLEdBQUdBO1lBQ2JZLElBQUlBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1lBQzdCQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsU0FBU0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDOUJBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ3JDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7UUFDTFosZUFBQ0E7SUFBREEsQ0E3SkFaLEFBNkpDWSxJQUFBWjtJQTdKWUEsZUFBUUEsV0E2SnBCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQS9KTSxNQUFNLEtBQU4sTUFBTSxRQStKWjtBQ3RLRCw2Q0FBNkM7QUFDN0MsSUFBTyxNQUFNLENBa0NaO0FBbENELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFJSXlCLGtCQUFtQkEsR0FBV0EsRUFBRUEsR0FBV0EsRUFBRUEsSUFBWUEsRUFBRUEsT0FBdUJBLEVBQUVBLEtBQWdCQTtZQUNoR0MsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7UUFFT0QsNkJBQVVBLEdBQWxCQSxVQUFtQkEsR0FBV0EsRUFBRUEsR0FBV0EsRUFBRUEsSUFBWUE7WUFDckRFLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBQzNDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDbkVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3BDQSxDQUFDQTtRQUVNRiwwQkFBT0EsR0FBZEEsVUFBZUEsS0FBZ0JBO1lBQzNCRyxJQUFJQSxPQUFPQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUV2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsSUFBSUEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xFQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN2Q0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3pCQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDakJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUMvQ0EsQ0FBQ0E7UUFDTEgsZUFBQ0E7SUFBREEsQ0FoQ0F6QixBQWdDQ3lCLElBQUF6QjtJQWhDWUEsZUFBUUEsV0FnQ3BCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQWxDTSxNQUFNLEtBQU4sTUFBTSxRQWtDWjtBQ25DRCxtQ0FBbUM7QUFFbkMsSUFBTyxNQUFNLENBb0VaO0FBcEVELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFVSTZCLGlCQUFtQkEsS0FBZUE7WUFUbENDLFlBQVlBO1lBQ1pBLGNBQVNBLEdBQUdBLEVBQUVBLENBQUNBO1lBU1hBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0E7WUFFbkNBLElBQUlBLFVBQVVBLEdBQW1CQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUVoRUEsd0JBQXdCQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFbkJBLHFCQUFxQkE7WUFDckJBLElBQUlBLFFBQVFBLEdBQUdBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBO1lBQ3RDQSxJQUFJQSxRQUFRQSxHQUFHQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDaEJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDdENBLElBQUlBLE9BQU9BLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO29CQUM1Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsZUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsUUFBUUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pGQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDcENBLENBQUNBO1lBQ0xBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU1ELHNCQUFJQSxHQUFYQTtZQUNJRSxzQkFBc0JBO1lBQ3RCQSw4Q0FBOENBO1lBQzlDQSwrQ0FBK0NBO1lBQy9DQSwrRkFBK0ZBO1lBQy9GQSxxQ0FBcUNBO1lBRXJDQSw4Q0FBOENBO1lBQzlDQSxpR0FBaUdBO1lBQ2pHQSxtQ0FBbUNBO1lBRW5DQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDL0NBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUNsREEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO29CQUMzQ0EsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNKQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDNUNBLENBQUNBO29CQUVEQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFD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RCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ2JBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO0FBQy9CQSxDQUFDQSxFQUZNLE1BQU0sS0FBTixNQUFNLFFBRVo7QUNIRCxJQUFPLE1BQU0sQ0FLWjtBQUxELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFBQThDO1FBR0FDLENBQUNBO1FBQURELGlCQUFDQTtJQUFEQSxDQUhBOUMsQUFHQzhDLElBQUE5QztJQUhZQSxpQkFBVUEsYUFHdEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBTE0sTUFBTSxLQUFOLE1BQU0sUUFLWiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICBVcDogJ3VwJyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgRG93bjogJ2Rvd24nLFxyXG4gICAgTGVmdDogJ2xlZnQnXHJcbiAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElzVmlzaXRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgSXNQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFR5cGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgQWxsb3dlZE1vdmVzOiBzdHJpbmdbXTtcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbGVUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc1Zpc2l0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0aWxlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblZhbHVlcyA9IE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5tYXAoayA9PiBDbTJrMTUuZGlyZWN0aW9uc1trXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WYWx1ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9IC0xICYmIHRoaXMuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKGRpcmVjdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgU3VjY2VzczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgWTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBJc0luU3Rvcnk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllck1vZGVsID0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gcGxheWVyLlg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlkgPSBwbGF5ZXIuWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXNJblN0b3J5ID0gcGxheWVyLklzSW5TdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIDogUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGxheWVyTW92ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5VcDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5Eb3duOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSAnTW92ZSB3aGVyZT8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSBcIllvdSBoYXZlIG1vdmVkIFwiICsgZGlyZWN0aW9uICsgXCIuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBzdG9yeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5TdG9yeSA9IHN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWFwVHJhbnNwb3J0IHtcclxuICAgICAgICBtYXA6IHN0cmluZ1tdW107XHJcbiAgICAgICAgbW92ZW1lbnRzOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIHRpbGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdmFyIGdhbWVtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGZhY3RvcnltYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGJhcm5tYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25NYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkZhY3RvcnlNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPblZpbGxhZ2VNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkJhcm5NYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBtYXBUcmFuc3BvcnRzOiB7IFtrZXk6IHN0cmluZ106IElNYXBUcmFuc3BvcnQgfTtcclxuICAgIGV4cG9ydCB2YXIgaWdub3JlVGlsZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgZ2FtZW1hcCA9IFtcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlMScsICdlMicsICdlMycsICdlNCcsICdlNScsICdlNicsICdlNycsICdlOCddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2U5JywgJ2UxMCcsICdlMTEnLCAnZTEyJywgJ2UxMycsICdlMTQnLCAnZTE1JywgJ2UxNiddLFxyXG4gICAgICAgIFsnLScsICdtMScsICdtMicsICdtMycsICctJywgJ2UxNycsICdlMTcnLCAnZTE5JywgJ2UyMCcsICdlMjEnLCAnZTIyJywgJ2UyMycsICdlMjQnXSxcclxuICAgICAgICBbJy0nLCAnbTQnLCAnbTUnLCAnbTYnLCAnLScsICctJywgJy0nLCAnLScsICd1NScsICctJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ203JywgJ204JywgJ3UxdicsICd1MScsICd1MScsICd1MicsICd1MScsICd1MycsICd1MScsICd1MScsICd1NCcsICctJ10sXHJcbiAgICAgICAgWyctJywgJ3U1dicsICctJywgJy0nLCAnLScsICctJywgJ3U1ZycsICctJywgJy0nLCAnLScsICctJywgJ2gxJywgJ2gyJ10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICctJywgJy0nLCAnaDMnLCAnaDQnXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2c2JywgJ2c3JywgJ2c4JywgJ2c5JywgJ2cxMCcsICdrNCcsICdrMScsICdrMScsICdrMSddLFxyXG4gICAgICAgIFsnLScsICd1NWInLCAnLScsICctJywgJ2cxMScsICdnMTInLCAnZzEzJywgJ2cxNCcsICdnMTUnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTEnLCAnaTInLCAnLScsICctJywgJy0nLCAnbCcsICctJywgJ2YxJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kzJywgJ2k0JywgJ2k1JywgJ3UxYicsICd1MScsICd1NicsICctJywgJ2YyJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWydrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrYicsICdrMScsICdrMScsICdrMycsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uTWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJ3InLCAnbHInLCAnbHInLCAnbHInLCAnbHJkJywgJ3JsJywgJ3VscicsICdybCcsICdybCcsICdkbCcsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ2QnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ2R1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICdyJywgJ2xyJywgJ2xyJywgJ3VsJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICBdO1xyXG5cclxuICAgIGZhY3RvcnltYXAgPSBbXHJcbiAgICAgICAgWyctJywgJ3RleGl0JywgJy0nXSxcclxuICAgICAgICBbJ3RsJywgJ3RtJywgJ3RyJ10sXHJcbiAgICAgICAgWydibCcsICdibScsICdiciddLFxyXG4gICAgICAgIFsnLScsICdiZXhpdCcsICctJ11cclxuICAgIF07XHJcblxyXG4gICAgY2FuTW92ZU9uRmFjdG9yeU1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsncicsICcnLCAnbCddLFxyXG4gICAgICAgIFsnJywgJ3UnLCAnJ11cclxuICAgIF07XHJcblxyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWyd0ZXhpdCcsJ2JleGl0JywndGwnLCd0bScsJ3RyJywnYmwnLCdibScsJ2JyJywnYmV4aXQnXSk7XHJcblxyXG4gICAgdmlsbGFnZW1hcCA9IFtcclxuICAgICAgICBbXCJtXCIsIFwicmV4aXR2XCJdLFxyXG4gICAgICAgIFtcImJleGl0dlwiLCBcIi1cIl0sXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uVmlsbGFnZU1hcCA9IFtcclxuICAgICAgICBbJ2RyJywnJ10sXHJcbiAgICAgICAgWycnLCcnXVxyXG4gICAgXTtcclxuICAgIGlnbm9yZVRpbGVzID0gaWdub3JlVGlsZXMuY29uY2F0KFsnbScsJ3JleGl0dicsJ2JleGl0diddKTtcclxuXHJcbiAgICBiYXJubWFwID0gW1xyXG4gICAgICAgIFtcInRleGl0YlwiLCBcIi1cIl0sXHJcbiAgICAgICAgW1wiYlwiLCBcInJleGl0YlwiXSxcclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25CYXJuTWFwID0gW1xyXG4gICAgICAgIFsnJywnJ10sXHJcbiAgICAgICAgWydyJywnJ11cclxuICAgIF07XHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ2InLCd0ZXhpdGInLCdyZXhpdGInXSk7XHJcblxyXG4gICAgbWFwVHJhbnNwb3J0cyA9IHtcclxuICAgICAgICAvLyBtYXAgPT4gZmFjdG9yeW1hcFxyXG4gICAgICAgICdnMTMnOiB7IG1hcDogZmFjdG9yeW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25GYWN0b3J5TWFwICwgdGlsZTogJ2JleGl0JyB9LFxyXG4gICAgICAgICdnMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAndG0nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiB2aWxsYWdlbWFwXHJcbiAgICAgICAgJ204JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcbiAgICAgICAgJ203JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiBiYXJubWFwXHJcbiAgICAgICAgJ2kxJzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcbiAgICAgICAgJ2k1JzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcblxyXG4gICAgICAgIC8vIGZhY3RvcnltYXAgPT4gbWFwXHJcbiAgICAgICAgJ2JleGl0JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAnbCcgfSxcclxuICAgICAgICAndGV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NWcnIH0sXHJcblxyXG4gICAgICAgIC8vIHZpbGxhZ2VtYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0dic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxdicgfSxcclxuICAgICAgICAnYmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTV2JyB9LFxyXG5cclxuICAgICAgICAvLyBiYXJubWFwID0+IG1hcFxyXG4gICAgICAgICdyZXhpdGInOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1MWInIH0sXHJcbiAgICAgICAgJ3RleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1YicgfSxcclxuICAgIH07XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCB2YXIgc3Rvcmllc1RpbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IFN0b3J5TW9kZWwgfTtcclxuICAgIGV4cG9ydCB2YXIgdHdvU3RhdGVTdG9yZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIHN0b3JpZXNUaWxlTWFwcGluZyA9IHtcclxuICAgICAgICAna2InOiBuZXcgU3RvcnlNb2RlbCgna2InLFxyXG4gICAgICAgICAgICAnw5xkdiBhIGrDoXTDqWtiYW4uIE55ZXJ0w6lsIGVneSBqZWd5ZXQgYSBNaWt1bMOhc2d5w6FyYmEsIHRhbMOhbGtvemhhdHN6IHNvayB2YXLDoXpzbGF0dGFsLCDDqXMgaGEgasOzIHZvbHTDoWwsIG3DqWcgYWrDoW5kw6lrb3QgaXMga2FwaGF0c3ouJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2InOiBuZXcgU3RvcnlNb2RlbCgnaTUnLFxyXG4gICAgICAgICAgICAnRXogYXogaXN0w6FsbMOzLCBpbm5lbiBpbmR1bCDDqXMgw6lya2V6aWsgYSB0w6lsYXDDsy4gQSBtYW7Ds2sgw6lwcCB0YWthcsOtdGFuYWssIHRhbmtvbG5haywgcG9sw61yb3p6w6FrIFJ1ZG9sZiBvcnLDoXQuIMOccmVzbmVrIHRhbMOhbG9kLCBtw6lnIG5lbSDDqXJrZXpldHQgZWwgYXogaWTFkSBheiBpbmR1bMOhc3JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdCc6IG5ldyBTdG9yeU1vZGVsKCdiZXhpdCcsXHJcbiAgICAgICAgICAgICdTemlhISBNZWd0YWzDoWx0YWQgYSBNaWt1bMOhcyBnecOhcsOhdCwgw6luIGxlc3playBhIGthbGF1em9kLiBBbWVkZGlnIE1pa3Vsw6FzIGvDqXN6w7xsxZFkaWssIG1lZ2lzbWVyaGV0ZWQgYSBtxbFoZWx5w6l0LCBzxZF0IGtpIGlzIHByw7Niw6FsaGF0b2QhIEd5ZXJlIGJlbGplYmIsIG1lZ211dGF0b20hJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtJzogbmV3IFN0b3J5TW9kZWwoJ2JtJyxcclxuICAgICAgICAgICAgJ0jDoXQgw61tZS4gQmFscmEgdGFsw6Fsb2QgYSByYWt0w6FyYXQsIGpvYmJyYSBhIG3FsWhlbHl0LCBhIGvDtnZldGtlesWRIGZvbHlvc8OzbiBwZWRpZyBtZWd0YWzDoWxvZCBhIGZlc3TFkXN6b2LDoXQuIMOJcyBob2d5IG1pdCByZWp0IGEgbmVneWVkaWsgYWp0w7M/IEVneSBraXMgdmFyw6F6c2xhVC4uLiBNaXZlbCBpbHllbiBqw7Mgdm9sdMOhbCBpZMOpbiDigJMgbW9uZGphIGEgbWFuw7Mgw6lzIGVsZm9yZHVsIMOhdGphdsOtdGFuaSBhIHN0YXRpc3p0aWvDoWQgLSwgdsOhbGFzenRoYXRzeiBlZ3kgYWrDoW5kw6lrb3QgYSBNaWt1bMOhc2d5w6FyYsOzbDonICtcclxuICAgICAgICAgICAgJzx1bD48bGkgY2xhc3M9XCJhamFuZGVrXCIgaWQ9XCJzemFua29cIj5TesOhbmvDszwvbGk+PGxpIGNsYXNzPVwiYWphbmRla1wiIGlkPVwiaGludGFsb1wiPkhpbnRhbMOzPC9saT48bGkgY2xhc3M9XCJhamFuZGVrXCIgaWQ9XCJraXN2b25hdFwiPktpc3ZvbmF0PC9saT48L3VsPidcclxuICAgICAgICApLFxyXG4gICAgICAgICdibTInOiBuZXcgU3RvcnlNb2RlbCgnYm0nLFxyXG4gICAgICAgICAgICAnw5xkdiDDumpyYSBhIGd5w6FyYmFuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JleGl0Mic6IG5ldyBTdG9yeU1vZGVsKCdiZXhpdDInLFxyXG4gICAgICAgICAgICAnRXogYSBiZWrDoXJhdCBhIGd5w6FyYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RsJzogbmV3IFN0b3J5TW9kZWwoJ3RsJyxcclxuICAgICAgICAgICAgJ01BR0lDISdcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bSc6IG5ldyBTdG9yeU1vZGVsKCd0bScsXHJcbiAgICAgICAgICAgICdKb2JicmEgZmVzdGVnZXRoZXN6LCBiYWxyYSBwZWRpZyBtaW5kZW4gw6lydGVsbWV0IG55ZXIuIEF6IG1lZyBhIGjDoXRzw7Mga2lqw6FyYXQgYXogZXJkxZEgZmVsw6kuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RyJzogbmV3IFN0b3J5TW9kZWwoJ3RyJyxcclxuICAgICAgICAgICAgJ0V6IGEgZmVzdMWRcyBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmwnOiBuZXcgU3RvcnlNb2RlbCgnYmwnLFxyXG4gICAgICAgICAgICAnRXogaXR0IGEgcmFrdMOhciBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYnInOiBuZXcgU3RvcnlNb2RlbCgnYnInLFxyXG4gICAgICAgICAgICAnRXogaXR0IGEgc3plcmVsxZFzIHN6b2JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdtJzogbmV3IFN0b3J5TW9kZWwoJ20nLFxyXG4gICAgICAgICAgICAnTWFuw7MgZmFsdmEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnZTIwJzogbmV3IFN0b3J5TW9kZWwoJ2UyMCcsXHJcbiAgICAgICAgICAgICdFcmRlxZEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnaDEnOiBuZXcgU3RvcnlNb2RlbCgnaDEnLFxyXG4gICAgICAgICAgICAnVGF2YWNza2EnXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHR3b1N0YXRlU3RvcmVzID0gW1wiYmV4aXRcIiwgXCJibVwiXTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQbGF5ZXJNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0b3J5TW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvbWFwcy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvc3Rvcmllcy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcE1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6VGlsZU1vZGVsW11bXTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOlBsYXllck1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgV2lkdGg6bnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBIZWlnaHQ6bnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRlQmFja3VwOiBTdGF0ZU1vZGVsO1xyXG4gICAgICAgIHByaXZhdGUgdmlzaXRlZFN0b3JpZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFwKGdhbWVtYXAsIGNhbk1vdmVPbk1hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5YID0gNjtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IDEyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWRTdG9yaWVzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxhc3RtYXA7XHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0bW92ZW1lbnRzO1xyXG4gICAgICAgIHByaXZhdGUgbG9hZE1hcChtYXA6c3RyaW5nW11bXSwgbW92ZW1lbnRzOnN0cmluZ1tdW10pIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0bWFwID0gbWFwO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3Rtb3ZlbWVudHMgPSBtb3ZlbWVudHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLldpZHRoID0gbWFwLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5IZWlnaHQgPSBtYXBbMF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuV2lkdGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlID0gbmV3IFRpbGVNb2RlbChtYXBbal1baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aWxlLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnModGhpcy5nZXREaXJlY3Rpb25zKG1vdmVtZW50cywgaiwgaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbdGlsZS5UeXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXVtqXSA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWxvYWRNYXAoKXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFwKHRoaXMubGFzdG1hcCwgdGhpcy5sYXN0bW92ZW1lbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZW1lbnRNYXAgPSB7XHJcbiAgICAgICAgICAgICd1JzogQ20yazE1LmRpcmVjdGlvbnMuVXAsXHJcbiAgICAgICAgICAgICdkJzogQ20yazE1LmRpcmVjdGlvbnMuRG93bixcclxuICAgICAgICAgICAgJ2wnOiBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0LFxyXG4gICAgICAgICAgICAncic6IENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREaXJlY3Rpb25zKG1vdmVtZW50czpzdHJpbmdbXVtdLCB4Om51bWJlciwgeTpudW1iZXIpOnN0cmluZ1tdIHtcclxuICAgICAgICAgICAgdmFyIG1vdmVtZW50Q2VsbCA9IG1vdmVtZW50c1t4XVt5XTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdmVtZW50Q2VsbC5zcGxpdCgnJykubWFwKGQgPT4gdGhpcy5tb3ZlbWVudE1hcFtkXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVBsYXllcihkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gdGhpcy5QbGF5ZXIuTW92ZShkaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgIHRpbGUuSXNWaXNpdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gbWFwVHJhbnNwb3J0c1t0aWxlLlR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHJhbnNwb3J0KHRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLlN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52aXNpdGVkU3Rvcmllcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nW3RpbGUuU3RvcnkuSWQrJzInXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0d29TdGF0ZVN0b3Jlcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xICYmIHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkU3Rvcmllcy5wdXNoKHRpbGUuU3RvcnkuSWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRDdXJyZW50U3RvcnkoKTpTdG9yeU1vZGVsIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV0uU3Rvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEdlbmVyYXRlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLlBsYXllciA9IHRoaXMuY2xvbmUodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICBzdGF0ZS5UaWxlcyA9IHRoaXMuY2xvbmUodGhpcy5UaWxlcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5HZW5lcmF0ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZUJhY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZTdGF0ZSA9IHRoaXMuc3RhdGVCYWNrdXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRTdGF0ZShwcmV2U3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNYXAodHJhbnNwb3J0Lm1hcCwgdHJhbnNwb3J0Lm1vdmVtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNwb3J0Lm1hcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmFuc3BvcnQubWFwW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydC5tYXBbaV1bal0gPT0gdHJhbnNwb3J0LnRpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMb2FkU3RhdGUoc3RhdGU6IFN0YXRlTW9kZWwpe1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbChzdGF0ZS5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbGVzID0gc3RhdGUuVGlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE1hcmtTdXJyb3VuZFZpc2l0ZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkgLSAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1Zpc2l0aWVkKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaWxlc1t4XSAmJiB0aGlzLlRpbGVzW3hdW3ldKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UaWxlc1t4XVt5XS5Jc1Zpc2l0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjbG9uZShvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9sZFN0YXRlID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2JqLCBudWxsKTtcclxuICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IGhpc3Rvcnkuc3RhdGU7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG9sZFN0YXRlLCBudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9kZWwvVGlsZU1vZGVsLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBUaWxlVmlldyB7XHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIGNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyLCBlbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgbW9kZWw6IFRpbGVNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKHJvdywgY29sLCBzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZShyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gcm93ICogc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gY29sICogc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd0aWxlJztcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwdWJsaWMgRGlzcGxheShtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gWyd0aWxlJ107XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNWaXNpdGVkICYmIENtMmsxNS5pZ25vcmVUaWxlcy5pbmRleE9mKG1vZGVsLlR5cGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0aWxlLVwiICsgbW9kZWwuVHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2RhcmsnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGVsLklzUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZVZpZXcudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBWaWV3IHtcclxuICAgICAgICAvLyBjb25zdGFudHNcclxuICAgICAgICB0aWxlQ291bnQgPSAxMztcclxuXHJcbiAgICAgICAgLy8gdmlld3NcclxuICAgICAgICB0aWxlczogVGlsZVZpZXdbXVtdO1xyXG5cclxuICAgICAgICAvLyBtb2RlbFxyXG4gICAgICAgIG1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKG1vZGVsOiBNYXBNb2RlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZW1hcCBjb25zdHJ1Y3RvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aWxlIHZpZXdzIFxyXG4gICAgICAgICAgICB2YXIgbWFwV2lkdGggPSBtYXBFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgdGlsZVNpemUgPSBtYXBXaWR0aCAvIHRoaXMudGlsZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50aWxlQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tpXVtqXSA9IG5ldyBUaWxlVmlldyhpLCBqLCB0aWxlU2l6ZSwgZWxlbWVudCwgdGhpcy5tb2RlbC5UaWxlc1tqXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXcoKSB7XHJcbiAgICAgICAgICAgIC8vIHNjcm9sbGluZyBtZWNoYW5pc21cclxuICAgICAgICAgICAgLy92YXIgbWlkZGxlID0gTWF0aC5mbG9vcih0aGlzLnRpbGVDb3VudCAvIDIpO1xyXG4gICAgICAgICAgICAvL3ZhciBsZWZ0ID0gdGhpcy5tb2RlbC5QbGF5ZXIuWCA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5YID4gKHRoaXMubW9kZWwuV2lkdGggLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuV2lkdGggLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgICA6IHRoaXMubW9kZWwuUGxheWVyLlggLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b3AgPSB0aGlzLm1vZGVsLlBsYXllci5ZIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgPiAodGhpcy5tb2RlbC5IZWlnaHQgLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuSGVpZ2h0IC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2RlbC5UaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1vZGVsLlRpbGVzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzW2pdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlBsYXllci5YID09IGkgJiYgdGhpcy5tb2RlbC5QbGF5ZXIuWSA9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuRGlzcGxheSh0aGlzLm1vZGVsLlRpbGVzW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tb2RlbC5UaWxlc1t0aGlzLm1vZGVsLlBsYXllci5YXVt0aGlzLm1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50VGlsZSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gQ20yazE1LmRpcmVjdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1cIiArIGRpcmVjdGlvbiArIFwiLWNvbW1hbmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbW92ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYWxsb3dlZCA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0b3J5SW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnktaW1hZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KG1vZGVsOiBTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudC5pbm5lckhUTUwgPSBtb2RlbC5TdG9yeTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLnpJbmRleCA9ICcyJztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuY2xhc3NOYW1lID0gJ3N0b3J5LScgKyBtb2RlbC5JZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlMaW5lU2V0dGVyIHtcclxuICAgICAgICBwcml2YXRlIGdhbWVBZ2VudDogSUdhbWVBZ2VudDtcclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoZ2FtZUFnZW50OiBJR2FtZUFnZW50KXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQgPSBnYW1lQWdlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlQnkoc3Rvcnk6IFN0b3J5TW9kZWwpe1xyXG4gICAgICAgICAgICBpZighc3RvcnkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0b3J5LklkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0bSc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uQmFybk1hcFsxXVswXSArPSAndSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdibSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0dpZnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LkRyYXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3Vic2NyaWJlVG9HaWZ0cygpe1xyXG4gICAgICAgICAgICB2YXIgZW5hYmxlQk0gPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsyXVsxXSA9ICd1ZGxyJztcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LlJlbG9hZE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcblxyXG4gICAgICAgICAgICBzdG9yeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5pZCA9PSAnaGludGFsbycpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlQk0oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZGVsL01hcE1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9NYXBWaWV3LnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9TdG9yeVZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeUxpbmVTZXR0ZXIudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdhbWVBZ2VudCB7XHJcbiAgICAgICAgRHJhdygpO1xyXG4gICAgICAgIFJlbG9hZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgICAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXBNb2RlbDogTWFwTW9kZWw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RvcnlWaWV3OiBTdG9yeVZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUxpbmVTZXR0ZXI6IFN0b3J5TGluZVNldHRlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kczogeyBba2V5OiBzdHJpbmddOiAoYXJncykgPT4gYW55IH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBzdGF0ZSBhbmQgY29tbWFuZHNcclxuICAgICAgICAgICAgdGhpcy5tYXBNb2RlbCA9IG5ldyBNYXBNb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzID0ge307XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIG1hcCB2aWV3XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldyA9IG5ldyBNYXBWaWV3KHRoaXMubWFwTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcgPSBuZXcgU3RvcnlWaWV3KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnQ6SUdhbWVBZ2VudCA9IHtcclxuICAgICAgICAgICAgICAgIERyYXc6ICgpID0+IHRoaXMuRHJhdygpLFxyXG4gICAgICAgICAgICAgICAgUmVsb2FkTWFwOiAoKSA9PiB0aGlzLm1hcE1vZGVsLlJlbG9hZE1hcC5jYWxsKHRoaXMubWFwTW9kZWwpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5TGluZVNldHRlciA9IG5ldyBTdG9yeUxpbmVTZXR0ZXIoYWdlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmRzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZCgnbW92ZScsIHRoaXMubW92ZUNvbW1hbmQpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtdXAtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuVXApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1kb3duLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkRvd24pO1xyXG4gICAgICAgICAgICB9OyBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtcmlnaHQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuUmlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1sZWZ0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkxlZnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmQoa2V5OiBzdHJpbmcsIGNvbW1hbmQ6IChhcmdzKSA9PiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kc1trZXldID0gY29tbWFuZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNvbW1hbmQodGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSBwYXJ0c1swXTtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHMuc3BsaWNlKDEsIHBhcnRzLmxlbmd0aCAtIDEpIDogW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVDb21tYW5kKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAvL2lmICh0aGlzLm1hcE1vZGVsLlBsYXllci5Jc0luU3RvcnkpXHJcbiAgICAgICAgICAgIC8vICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSB0aGlzLm1hcE1vZGVsLlRpbGVzW3RoaXMubWFwTW9kZWwuUGxheWVyLlhdW3RoaXMubWFwTW9kZWwuUGxheWVyLlldO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSkgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VycmUgbmVtIG1laGV0c3onO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubWFwTW9kZWwuTW92ZVBsYXllcihkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzdG9yeSA9IHRoaXMubWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUxpbmVTZXR0ZXIuVXBkYXRlQnkoc3RvcnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBEcmF3KCl7XHJcbiAgICAgICAgICAgIHZhciBzdG9yeSA9IHRoaXMubWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3LkRyYXcoc3RvcnkpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuRHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJHYW1lLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICB2YXIgZ2FtZSA9IG5ldyBDbTJrMTUuR2FtZSgpO1xyXG59XHJcbiAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOiBQbGF5ZXJNb2RlbDtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6IFRpbGVNb2RlbFtdW107XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
