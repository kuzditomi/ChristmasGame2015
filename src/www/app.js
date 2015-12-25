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
        ['-', 'm1', 'm2', 'm3', '-', 'e17', 'e18', 'e19', 'e20', 'e21', 'e22', 'e23', 'e24'],
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
        ['', 'ud', '', '', '', '', 'u', '', '', '', '', 'u', ''],
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
        ['r', 'r', 'l'],
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
        'b2': new Cm2k15.StoryModel('i2', 'Épp indul Mikulás. Felszállsz?<a id="finish">Igen</a>'),
        'bexit': new Cm2k15.StoryModel('bexit', 'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'),
        'bm': new Cm2k15.StoryModel('bm', 'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslaT... Mivel ilyen jó voltál idén – mondja a manó és elfordul átjavítani a statisztikád -, választhatsz egy ajándékot a Mikulásgyárból:' +
            '<ul><li class="ajandek" id="szanko">Szánkó</li><li class="ajandek" id="hintalo">Hintaló</li><li class="ajandek" id="kisvonat">Kisvonat</li></ul>'),
        'bm_chosen': new Cm2k15.StoryModel('bm_chosen', 'Á szóval a {0}t választottad! Nézzük csak hogy tudod elkészíteni...<br/>' +
            '<ul><li>Kell majd bele {1} a raktár szobából,</li><li>az ügyes manók a műhelyben összeszerelik neked,</li><li> a festő szobában megkapja a színeit,</li><li> és végül ellátjuk a karácsony szellemével&trade;.</li></ul>'),
        'bm2': new Cm2k15.StoryModel('bm', 'A gyár előszobájában vagy.'),
        'bexit2': new Cm2k15.StoryModel('bexit2', 'Ez a bejárat a gyárba.'),
        'tl': new Cm2k15.StoryModel('tl', 'MAGIC! <a id="showgift">MEGNÉZEM</a>'),
        'tl2': new Cm2k15.StoryModel('tl2', 'Szép lett. Grat'),
        'tm': new Cm2k15.StoryModel('tm', 'Jobbra festegethesz, balra pedig minden értelmet nyer. Az meg a hátsó kijárat az erdő felé.'),
        'tm2': new Cm2k15.StoryModel('tm2', 'Nagyon szép lett a játékod! A mikulás nemsokára indul, megtalálod az istállónál, addig nyugodtan nézz körül a birtokon.'),
        'tm3': new Cm2k15.StoryModel('tm', 'A gyár hátsó folyosóján vagy.'),
        'tr': new Cm2k15.StoryModel('tr', 'Ez a festős szoba.'),
        'bl': new Cm2k15.StoryModel('bl', 'Ez itt a raktár szoba.'),
        'br': new Cm2k15.StoryModel('br', 'Ez itt a szerelős szoba.'),
        'm': new Cm2k15.StoryModel('m', 'Manó falva'),
        'e20': new Cm2k15.StoryModel('e20', 'Erdeő'),
        'h1': new Cm2k15.StoryModel('h1', 'Tavacska'),
        'credit': new Cm2k15.StoryModel('credit', 'Boldog karácsonyt, köszi a játékot.')
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
        MapModel.prototype.Reveal = function () {
            for (var i = 0; i < this.stateBackup.Tiles.length; i++) {
                for (var j = 0; j < this.stateBackup.Tiles[i].length; j++) {
                    this.stateBackup.Tiles[i][j].IsVisited = true;
                }
            }
            this.stateBackup.Tiles[6][9].AllowedMoves = [Cm2k15.directions.Down];
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
    var Gift;
    (function (Gift) {
        Gift[Gift["Kisvonat"] = 0] = "Kisvonat";
        Gift[Gift["Szanko"] = 1] = "Szanko";
        Gift[Gift["Hintalo"] = 2] = "Hintalo";
    })(Gift || (Gift = {}));
    var GiftState;
    (function (GiftState) {
        GiftState[GiftState["None"] = 0] = "None";
        GiftState[GiftState["Component"] = 1] = "Component";
        GiftState[GiftState["Assemble"] = 2] = "Assemble";
        GiftState[GiftState["Paint"] = 3] = "Paint";
        GiftState[GiftState["Magic"] = 4] = "Magic";
        GiftState[GiftState["Done"] = 5] = "Done";
    })(GiftState || (GiftState = {}));
    var StoryLineSetter = (function () {
        function StoryLineSetter(gameAgent) {
            this.gameAgent = gameAgent;
            this.giftState = GiftState.None;
        }
        StoryLineSetter.prototype.UpdateBy = function (story) {
            var that = this;
            if (!story)
                return;
            switch (story.Id) {
                case 'bm':
                    if (this.giftState == GiftState.None)
                        this.subscribeToGifts();
                    else if (this.giftState == GiftState.Component)
                        Cm2k15.canMoveOnFactoryMap[2][1] = 'r';
                    else if (this.giftState == GiftState.Assemble)
                        Cm2k15.canMoveOnFactoryMap[2][1] = 'u';
                    break;
                case 'bl':
                    if (this.giftState == GiftState.None) {
                        this.giftState = GiftState.Component;
                        Cm2k15.storiesTileMapping['bm'].Story = Cm2k15.storiesTileMapping['bm2'].Story;
                    }
                    break;
                case 'br':
                    if (this.giftState == GiftState.Component)
                        this.giftState = GiftState.Assemble;
                    break;
                case 'tm':
                    if (this.giftState == GiftState.Paint)
                        Cm2k15.canMoveOnFactoryMap[1][1] = 'l';
                    break;
                case 'tm2':
                    if (this.giftState == GiftState.Magic) {
                        Cm2k15.canMoveOnFactoryMap[1][1] = 'u';
                        this.giftState = GiftState.Done;
                    }
                    else if (this.giftState == GiftState.Done) {
                        Cm2k15.storiesTileMapping['tm'].Story = Cm2k15.storiesTileMapping['tm3'].Story;
                        Cm2k15.storiesTileMapping['tm'].Id = 'tm';
                    }
                    break;
                case 'tr':
                    if (this.giftState == GiftState.Assemble)
                        this.giftState = GiftState.Paint;
                    break;
                case 'tl':
                    if (this.giftState == GiftState.Paint) {
                        this.giftState = GiftState.Magic;
                        Cm2k15.storiesTileMapping['tm'].Story = Cm2k15.storiesTileMapping['tm2'].Story;
                        Cm2k15.storiesTileMapping['tm'].Id = 'tm2';
                        Cm2k15.canMoveOnFactoryMap[1][1] = 'u';
                        this.subscribeShowGift();
                    }
                    break;
                case 'i2':
                    var storyElement = document.getElementById('story');
                    storyElement.addEventListener('click', function (e) {
                        if (e.target && e.target.id == 'finish') {
                            that.finishGame.apply(that);
                        }
                    });
                    break;
                default:
                    return;
            }
            this.gameAgent.ReloadMap();
            this.gameAgent.Draw();
            if (story.Id == 'tm2' && this.giftState == GiftState.Done) {
                this.revealMap();
            }
        };
        StoryLineSetter.prototype.subscribeShowGift = function () {
            var that = this;
            document.getElementById('story').addEventListener('click', function (e) {
                if (e && e.target && e.target.id == 'showgift') {
                    Cm2k15.storiesTileMapping['tl'].Id = that.choosenGift == Gift.Hintalo ? 'hintalo' : that.choosenGift == Gift.Szanko ? 'szanko' : 'kisvonat';
                    Cm2k15.storiesTileMapping['tl'].Story = Cm2k15.storiesTileMapping['tl2'].Story;
                    that.gameAgent.ReloadMap();
                    that.gameAgent.Draw();
                }
            });
        };
        StoryLineSetter.prototype.finishGame = function () {
            Cm2k15.canMoveOnBarnMap[1][0] = '';
            Cm2k15.storiesTileMapping['b2'].Story = Cm2k15.storiesTileMapping['credit'].Story;
            Cm2k15.storiesTileMapping['b2'].Id = Cm2k15.storiesTileMapping['credit'].Id;
            this.gameAgent.ReloadMap();
            this.gameAgent.Draw();
        };
        StoryLineSetter.prototype.revealMap = function () {
            Cm2k15.canMoveOnFactoryMap[1][1] = 'udlr';
            Cm2k15.canMoveOnFactoryMap[2][1] = 'udlr';
            Cm2k15.canMoveOnBarnMap[1][0] = 'ur';
            Cm2k15.storiesTileMapping['b'] = Cm2k15.storiesTileMapping['b2'];
            this.gameAgent.RevealMap();
        };
        StoryLineSetter.prototype.subscribeToGifts = function () {
            var _this = this;
            var that = this, giftComponentMap = {}, enableBM = function (gift) {
                Cm2k15.canMoveOnFactoryMap[2][1] = 'l';
                Cm2k15.storiesTileMapping['bm'].Story = Cm2k15.storiesTileMapping['bm_chosen'].Story
                    .replace('{0}', gift)
                    .replace('{1}', giftComponentMap[that.choosenGift]);
                _this.gameAgent.ReloadMap();
                _this.gameAgent.Draw();
            };
            giftComponentMap[Gift.Kisvonat] = 'néhány fakocka, pár henger és egy kémény';
            giftComponentMap[Gift.Hintalo] = 'plüss borítás, fa talp és nyereg';
            giftComponentMap[Gift.Szanko] = 'néhány fa léc, egy kapaszkodó és kötél';
            var story = document.getElementById('story');
            story.addEventListener('click', function (e) {
                if (e && e.target) {
                    switch (e.target.id) {
                        case 'hintalo':
                            that.choosenGift = Gift.Hintalo;
                            enableBM('hintalova');
                            return;
                        case 'kisvonat':
                            that.choosenGift = Gift.Kisvonat;
                            enableBM('kisvona');
                            return;
                        case 'szanko':
                            that.choosenGift = Gift.Szanko;
                            enableBM('szánkó');
                            return;
                    }
                }
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
                ReloadMap: function () { return _this.mapModel.ReloadMap.call(_this.mapModel); },
                RevealMap: function () { return _this.RevealMap(); }
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
        Game.prototype.RevealMap = function () {
            this.mapModel.Reveal();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJTdG9yeUxpbmVTZXR0ZXIudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLlJlbG9hZE1hcCIsIkNtMmsxNS5NYXBNb2RlbC5nZXREaXJlY3Rpb25zIiwiQ20yazE1Lk1hcE1vZGVsLk1vdmVQbGF5ZXIiLCJDbTJrMTUuTWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5IiwiQ20yazE1Lk1hcE1vZGVsLlJldmVhbCIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRyYXciLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HaWZ0IiwiQ20yazE1LkdpZnRTdGF0ZSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLmNvbnN0cnVjdG9yIiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5VcGRhdGVCeSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuc3Vic2NyaWJlU2hvd0dpZnQiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLmZpbmlzaEdhbWUiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLnJldmVhbE1hcCIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuc3Vic2NyaWJlVG9HaWZ0cyIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuR2FtZS5EcmF3IiwiQ20yazE1LkdhbWUuUmV2ZWFsTWFwIiwiQ20yazE1LlN0YXRlTW9kZWwiLCJDbTJrMTUuU3Rh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RUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDckVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzdFQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN2RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDekVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQzVFQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUM5RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDckVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzFFQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUMzRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDcEVBLENBQUNBO0lBQ0ZBLG1CQUFZQSxHQUFHQTtRQUNYQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDcERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3JEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekVBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3hEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN2REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDM0RBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3JEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUN4REEsQ0FBQ0E7SUFFRkEsaUJBQVVBLEdBQUdBO1FBQ1RBLENBQUNBLEdBQUdBLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ25CQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDbEJBLENBQUNBLEdBQUdBLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLENBQUNBO0tBQ3RCQSxDQUFDQTtJQUVGQSwwQkFBbUJBLEdBQUdBO1FBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNaQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNmQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNkQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUNoQkEsQ0FBQ0E7SUFFRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFDQSxPQUFPQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxPQUFP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b2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICBVcDogJ3VwJyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgRG93bjogJ2Rvd24nLFxyXG4gICAgTGVmdDogJ2xlZnQnXHJcbiAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElzVmlzaXRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgSXNQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFR5cGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgQWxsb3dlZE1vdmVzOiBzdHJpbmdbXTtcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbGVUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc1Zpc2l0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0aWxlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblZhbHVlcyA9IE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5tYXAoayA9PiBDbTJrMTUuZGlyZWN0aW9uc1trXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WYWx1ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9IC0xICYmIHRoaXMuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKGRpcmVjdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgU3VjY2VzczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgWTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBJc0luU3Rvcnk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllck1vZGVsID0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gcGxheWVyLlg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlkgPSBwbGF5ZXIuWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXNJblN0b3J5ID0gcGxheWVyLklzSW5TdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIDogUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGxheWVyTW92ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5VcDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5Eb3duOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSAnTW92ZSB3aGVyZT8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSBcIllvdSBoYXZlIG1vdmVkIFwiICsgZGlyZWN0aW9uICsgXCIuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBzdG9yeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5TdG9yeSA9IHN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWFwVHJhbnNwb3J0IHtcclxuICAgICAgICBtYXA6IHN0cmluZ1tdW107XHJcbiAgICAgICAgbW92ZW1lbnRzOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIHRpbGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdmFyIGdhbWVtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGZhY3RvcnltYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGJhcm5tYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25NYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkZhY3RvcnlNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPblZpbGxhZ2VNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkJhcm5NYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBtYXBUcmFuc3BvcnRzOiB7IFtrZXk6IHN0cmluZ106IElNYXBUcmFuc3BvcnQgfTtcclxuICAgIGV4cG9ydCB2YXIgaWdub3JlVGlsZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgZ2FtZW1hcCA9IFtcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlMScsICdlMicsICdlMycsICdlNCcsICdlNScsICdlNicsICdlNycsICdlOCddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2U5JywgJ2UxMCcsICdlMTEnLCAnZTEyJywgJ2UxMycsICdlMTQnLCAnZTE1JywgJ2UxNiddLFxyXG4gICAgICAgIFsnLScsICdtMScsICdtMicsICdtMycsICctJywgJ2UxNycsICdlMTgnLCAnZTE5JywgJ2UyMCcsICdlMjEnLCAnZTIyJywgJ2UyMycsICdlMjQnXSxcclxuICAgICAgICBbJy0nLCAnbTQnLCAnbTUnLCAnbTYnLCAnLScsICctJywgJy0nLCAnLScsICd1NScsICctJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ203JywgJ204JywgJ3UxdicsICd1MScsICd1MScsICd1MicsICd1MScsICd1MycsICd1MScsICd1MScsICd1NCcsICctJ10sXHJcbiAgICAgICAgWyctJywgJ3U1dicsICctJywgJy0nLCAnLScsICctJywgJ3U1ZycsICctJywgJy0nLCAnLScsICctJywgJ2gxJywgJ2gyJ10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICctJywgJy0nLCAnaDMnLCAnaDQnXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2c2JywgJ2c3JywgJ2c4JywgJ2c5JywgJ2cxMCcsICdrNCcsICdrMScsICdrMScsICdrMSddLFxyXG4gICAgICAgIFsnLScsICd1NWInLCAnLScsICctJywgJ2cxMScsICdnMTInLCAnZzEzJywgJ2cxNCcsICdnMTUnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTEnLCAnaTInLCAnLScsICctJywgJy0nLCAnbCcsICctJywgJ2YxJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kzJywgJ2k0JywgJ2k1JywgJ3UxYicsICd1MScsICd1NicsICctJywgJ2YyJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWydrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrYicsICdrMScsICdrMScsICdrMycsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uTWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJ3InLCAnbHInLCAnbHInLCAnbHInLCAnbHJkJywgJ3JsJywgJ3VscicsICdybCcsICdybCcsICdkbCcsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAndScsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZHUnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJ3InLCAnbHInLCAnbHInLCAndWwnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcblxyXG4gICAgZmFjdG9yeW1hcCA9IFtcclxuICAgICAgICBbJy0nLCAndGV4aXQnLCAnLSddLFxyXG4gICAgICAgIFsndGwnLCAndG0nLCAndHInXSxcclxuICAgICAgICBbJ2JsJywgJ2JtJywgJ2JyJ10sXHJcbiAgICAgICAgWyctJywgJ2JleGl0JywgJy0nXVxyXG4gICAgXTtcclxuXHJcbiAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnXSxcclxuICAgICAgICBbJ3InLCAncicsICdsJ10sXHJcbiAgICAgICAgWydyJywgJycsICdsJ10sXHJcbiAgICAgICAgWycnLCAndScsICcnXVxyXG4gICAgXTtcclxuXHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ3RleGl0JywnYmV4aXQnLCd0bCcsJ3RtJywndHInLCdibCcsJ2JtJywnYnInLCdiZXhpdCddKTtcclxuXHJcbiAgICB2aWxsYWdlbWFwID0gW1xyXG4gICAgICAgIFtcIm1cIiwgXCJyZXhpdHZcIl0sXHJcbiAgICAgICAgW1wiYmV4aXR2XCIsIFwiLVwiXSxcclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25WaWxsYWdlTWFwID0gW1xyXG4gICAgICAgIFsnZHInLCcnXSxcclxuICAgICAgICBbJycsJyddXHJcbiAgICBdO1xyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWydtJywncmV4aXR2JywnYmV4aXR2J10pO1xyXG5cclxuICAgIGJhcm5tYXAgPSBbXHJcbiAgICAgICAgW1widGV4aXRiXCIsIFwiLVwiXSxcclxuICAgICAgICBbXCJiXCIsIFwicmV4aXRiXCJdLFxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPbkJhcm5NYXAgPSBbXHJcbiAgICAgICAgWycnLCcnXSxcclxuICAgICAgICBbJ3InLCcnXVxyXG4gICAgXTtcclxuICAgIGlnbm9yZVRpbGVzID0gaWdub3JlVGlsZXMuY29uY2F0KFsnYicsJ3RleGl0YicsJ3JleGl0YiddKTtcclxuXHJcbiAgICBtYXBUcmFuc3BvcnRzID0ge1xyXG4gICAgICAgIC8vIG1hcCA9PiBmYWN0b3J5bWFwXHJcbiAgICAgICAgJ2cxMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAnYmV4aXQnIH0sXHJcbiAgICAgICAgJ2czJzogeyBtYXA6IGZhY3RvcnltYXAsIG1vdmVtZW50czogY2FuTW92ZU9uRmFjdG9yeU1hcCAsIHRpbGU6ICd0bScgfSxcclxuXHJcbiAgICAgICAgLy8gbWFwID0+IHZpbGxhZ2VtYXBcclxuICAgICAgICAnbTgnOiB7IG1hcDogdmlsbGFnZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25WaWxsYWdlTWFwLCB0aWxlOiAnbScgfSxcclxuICAgICAgICAnbTcnOiB7IG1hcDogdmlsbGFnZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25WaWxsYWdlTWFwLCB0aWxlOiAnbScgfSxcclxuXHJcbiAgICAgICAgLy8gbWFwID0+IGJhcm5tYXBcclxuICAgICAgICAnaTEnOiB7IG1hcDogYmFybm1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25CYXJuTWFwLCB0aWxlOiAnYicgfSxcclxuICAgICAgICAnaTUnOiB7IG1hcDogYmFybm1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25CYXJuTWFwLCB0aWxlOiAnYicgfSxcclxuXHJcbiAgICAgICAgLy8gZmFjdG9yeW1hcCA9PiBtYXBcclxuICAgICAgICAnYmV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICdsJyB9LFxyXG4gICAgICAgICd0ZXhpdCc6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1ZycgfSxcclxuXHJcbiAgICAgICAgLy8gdmlsbGFnZW1hcCA9PiBtYXBcclxuICAgICAgICAncmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTF2JyB9LFxyXG4gICAgICAgICdiZXhpdHYnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NXYnIH0sXHJcblxyXG4gICAgICAgIC8vIGJhcm5tYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxYicgfSxcclxuICAgICAgICAndGV4aXRiJzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTViJyB9LFxyXG4gICAgfTtcclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IHZhciBzdG9yaWVzVGlsZU1hcHBpbmc6IHsgW2tleTogc3RyaW5nXTogU3RvcnlNb2RlbCB9O1xyXG4gICAgZXhwb3J0IHZhciB0d29TdGF0ZVN0b3Jlczogc3RyaW5nW107XHJcblxyXG4gICAgc3Rvcmllc1RpbGVNYXBwaW5nID0ge1xyXG4gICAgICAgICdrYic6IG5ldyBTdG9yeU1vZGVsKCdrYicsXHJcbiAgICAgICAgICAgICfDnGR2IGEgasOhdMOpa2Jhbi4gTnllcnTDqWwgZWd5IGplZ3lldCBhIE1pa3Vsw6FzZ3nDoXJiYSwgdGFsw6Fsa296aGF0c3ogc29rIHZhcsOhenNsYXR0YWwsIMOpcyBoYSBqw7Mgdm9sdMOhbCwgbcOpZyBhasOhbmTDqWtvdCBpcyBrYXBoYXRzei4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYic6IG5ldyBTdG9yeU1vZGVsKCdpNScsXHJcbiAgICAgICAgICAgICdFeiBheiBpc3TDoWxsw7MsIGlubmVuIGluZHVsIMOpcyDDqXJrZXppayBhIHTDqWxhcMOzLiBBIG1hbsOzayDDqXBwIHRha2Fyw610YW5haywgdGFua29sbmFrLCBwb2zDrXJvenrDoWsgUnVkb2xmIG9ycsOhdC4gw5xyZXNuZWsgdGFsw6Fsb2QsIG3DqWcgbmVtIMOpcmtlemV0dCBlbCBheiBpZMWRIGF6IGluZHVsw6FzcmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2IyJzogbmV3IFN0b3J5TW9kZWwoJ2kyJyxcclxuICAgICAgICAgICAgJ8OJcHAgaW5kdWwgTWlrdWzDoXMuIEZlbHN6w6FsbHN6PzxhIGlkPVwiZmluaXNoXCI+SWdlbjwvYT4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQnOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQnLFxyXG4gICAgICAgICAgICAnU3ppYSEgTWVndGFsw6FsdGFkIGEgTWlrdWzDoXMgZ3nDoXLDoXQsIMOpbiBsZXN6ZWsgYSBrYWxhdXpvZC4gQW1lZGRpZyBNaWt1bMOhcyBrw6lzesO8bMWRZGlrLCBtZWdpc21lcmhldGVkIGEgbcWxaGVsecOpdCwgc8WRdCBraSBpcyBwcsOzYsOhbGhhdG9kISBHeWVyZSBiZWxqZWJiLCBtZWdtdXRhdG9tISdcclxuICAgICAgICApLFxyXG4gICAgICAgICdibSc6IG5ldyBTdG9yeU1vZGVsKCdibScsXHJcbiAgICAgICAgICAgICdIw6F0IMOtbWUuIEJhbHJhIHRhbMOhbG9kIGEgcmFrdMOhcmF0LCBqb2JicmEgYSBtxbFoZWx5dCwgYSBrw7Z2ZXRrZXrFkSBmb2x5b3PDs24gcGVkaWcgbWVndGFsw6Fsb2QgYSBmZXN0xZFzem9iw6F0LiDDiXMgaG9neSBtaXQgcmVqdCBhIG5lZ3llZGlrIGFqdMOzPyBFZ3kga2lzIHZhcsOhenNsYVQuLi4gTWl2ZWwgaWx5ZW4gasOzIHZvbHTDoWwgaWTDqW4g4oCTIG1vbmRqYSBhIG1hbsOzIMOpcyBlbGZvcmR1bCDDoXRqYXbDrXRhbmkgYSBzdGF0aXN6dGlrw6FkIC0sIHbDoWxhc3p0aGF0c3ogZWd5IGFqw6FuZMOpa290IGEgTWlrdWzDoXNnecOhcmLDs2w6JyArXHJcbiAgICAgICAgICAgICc8dWw+PGxpIGNsYXNzPVwiYWphbmRla1wiIGlkPVwic3phbmtvXCI+U3rDoW5rw7M8L2xpPjxsaSBjbGFzcz1cImFqYW5kZWtcIiBpZD1cImhpbnRhbG9cIj5IaW50YWzDszwvbGk+PGxpIGNsYXNzPVwiYWphbmRla1wiIGlkPVwia2lzdm9uYXRcIj5LaXN2b25hdDwvbGk+PC91bD4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm1fY2hvc2VuJzogbmV3IFN0b3J5TW9kZWwoJ2JtX2Nob3NlbicsXHJcbiAgICAgICAgICAgICfDgSBzesOzdmFsIGEgezB9dCB2w6FsYXN6dG90dGFkISBOw6l6esO8ayBjc2FrIGhvZ3kgdHVkb2QgZWxrw6lzesOtdGVuaS4uLjxici8+JyArXHJcbiAgICAgICAgICAgICc8dWw+PGxpPktlbGwgbWFqZCBiZWxlIHsxfSBhIHJha3TDoXIgc3pvYsOhYsOzbCw8L2xpPjxsaT5heiDDvGd5ZXMgbWFuw7NrIGEgbcWxaGVseWJlbiDDtnNzemVzemVyZWxpayBuZWtlZCw8L2xpPjxsaT4gYSBmZXN0xZEgc3pvYsOhYmFuIG1lZ2thcGphIGEgc3rDrW5laXQsPC9saT48bGk+IMOpcyB2w6lnw7xsIGVsbMOhdGp1ayBhIGthcsOhY3Nvbnkgc3plbGxlbcOpdmVsJnRyYWRlOy48L2xpPjwvdWw+J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtMic6IG5ldyBTdG9yeU1vZGVsKCdibScsXHJcbiAgICAgICAgICAgICdBIGd5w6FyIGVsxZFzem9iw6Fqw6FiYW4gdmFneS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQyJzogbmV3IFN0b3J5TW9kZWwoJ2JleGl0MicsXHJcbiAgICAgICAgICAgICdFeiBhIGJlasOhcmF0IGEgZ3nDoXJiYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndGwnOiBuZXcgU3RvcnlNb2RlbCgndGwnLFxyXG4gICAgICAgICAgICAnTUFHSUMhIDxhIGlkPVwic2hvd2dpZnRcIj5NRUdOw4laRU08L2E+J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RsMic6IG5ldyBTdG9yeU1vZGVsKCd0bDInLFxyXG4gICAgICAgICAgICAnU3rDqXAgbGV0dC4gR3JhdCdcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bSc6IG5ldyBTdG9yeU1vZGVsKCd0bScsXHJcbiAgICAgICAgICAgICdKb2JicmEgZmVzdGVnZXRoZXN6LCBiYWxyYSBwZWRpZyBtaW5kZW4gw6lydGVsbWV0IG55ZXIuIEF6IG1lZyBhIGjDoXRzw7Mga2lqw6FyYXQgYXogZXJkxZEgZmVsw6kuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RtMic6IG5ldyBTdG9yeU1vZGVsKCd0bTInLFxyXG4gICAgICAgICAgICAnTmFneW9uIHN6w6lwIGxldHQgYSBqw6F0w6lrb2QhIEEgbWlrdWzDoXMgbmVtc29rw6FyYSBpbmR1bCwgbWVndGFsw6Fsb2QgYXogaXN0w6FsbMOzbsOhbCwgYWRkaWcgbnl1Z29kdGFuIG7DqXp6IGvDtnLDvGwgYSBiaXJ0b2tvbi4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndG0zJzogbmV3IFN0b3J5TW9kZWwoJ3RtJyxcclxuICAgICAgICAgICAgJ0EgZ3nDoXIgaMOhdHPDsyBmb2x5b3PDs2rDoW4gdmFneS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndHInOiBuZXcgU3RvcnlNb2RlbCgndHInLFxyXG4gICAgICAgICAgICAnRXogYSBmZXN0xZFzIHN6b2JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdibCc6IG5ldyBTdG9yeU1vZGVsKCdibCcsXHJcbiAgICAgICAgICAgICdFeiBpdHQgYSByYWt0w6FyIHN6b2JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdicic6IG5ldyBTdG9yeU1vZGVsKCdicicsXHJcbiAgICAgICAgICAgICdFeiBpdHQgYSBzemVyZWzFkXMgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ20nOiBuZXcgU3RvcnlNb2RlbCgnbScsXHJcbiAgICAgICAgICAgICdNYW7DsyBmYWx2YSdcclxuICAgICAgICApLFxyXG4gICAgICAgICdlMjAnOiBuZXcgU3RvcnlNb2RlbCgnZTIwJyxcclxuICAgICAgICAgICAgJ0VyZGXFkSdcclxuICAgICAgICApLFxyXG4gICAgICAgICdoMSc6IG5ldyBTdG9yeU1vZGVsKCdoMScsXHJcbiAgICAgICAgICAgICdUYXZhY3NrYSdcclxuICAgICAgICApLFxyXG4gICAgICAgICdjcmVkaXQnOiBuZXcgU3RvcnlNb2RlbCgnY3JlZGl0JyxcclxuICAgICAgICAgICAgJ0JvbGRvZyBrYXLDoWNzb255dCwga8O2c3ppIGEgasOhdMOpa290LidcclxuICAgICAgICApLFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdHdvU3RhdGVTdG9yZXMgPSBbXCJiZXhpdFwiLCBcImJtXCJdO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRpbGVNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlBsYXllck1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RvcnlNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1vdmVEaXJlY3Rpb25zLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGF0YS9tYXBzLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGF0YS9zdG9yaWVzLnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBUaWxlczpUaWxlTW9kZWxbXVtdO1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXI6UGxheWVyTW9kZWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBXaWR0aDpudW1iZXI7XHJcbiAgICAgICAgcHVibGljIEhlaWdodDpudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGVCYWNrdXA6IFN0YXRlTW9kZWw7XHJcbiAgICAgICAgcHJpdmF0ZSB2aXNpdGVkU3Rvcmllczogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNYXAoZ2FtZW1hcCwgY2FuTW92ZU9uTWFwKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyTW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlggPSA2O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5ZID0gMTI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaXRlZFN0b3JpZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdG1hcDtcclxuICAgICAgICBwcml2YXRlIGxhc3Rtb3ZlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTWFwKG1hcDpzdHJpbmdbXVtdLCBtb3ZlbWVudHM6c3RyaW5nW11bXSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RtYXAgPSBtYXA7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdG1vdmVtZW50cyA9IG1vdmVtZW50cztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuV2lkdGggPSBtYXAubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLkhlaWdodCA9IG1hcFswXS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRpbGVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuSGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbaV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5XaWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSBuZXcgVGlsZU1vZGVsKG1hcFtqXVtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9ucyh0aGlzLmdldERpcmVjdGlvbnMobW92ZW1lbnRzLCBqLCBpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlR5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldW2pdID0gdGlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlbG9hZE1hcCgpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNYXAodGhpcy5sYXN0bWFwLCB0aGlzLmxhc3Rtb3ZlbWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlbWVudE1hcCA9IHtcclxuICAgICAgICAgICAgJ3UnOiBDbTJrMTUuZGlyZWN0aW9ucy5VcCxcclxuICAgICAgICAgICAgJ2QnOiBDbTJrMTUuZGlyZWN0aW9ucy5Eb3duLFxyXG4gICAgICAgICAgICAnbCc6IENtMmsxNS5kaXJlY3Rpb25zLkxlZnQsXHJcbiAgICAgICAgICAgICdyJzogQ20yazE1LmRpcmVjdGlvbnMuUmlnaHRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGdldERpcmVjdGlvbnMobW92ZW1lbnRzOnN0cmluZ1tdW10sIHg6bnVtYmVyLCB5Om51bWJlcik6c3RyaW5nW10ge1xyXG4gICAgICAgICAgICB2YXIgbW92ZW1lbnRDZWxsID0gbW92ZW1lbnRzW3hdW3ldO1xyXG4gICAgICAgICAgICByZXR1cm4gbW92ZW1lbnRDZWxsLnNwbGl0KCcnKS5tYXAoZCA9PiB0aGlzLm1vdmVtZW50TWFwW2RdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlUGxheWVyKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLlBsYXllci5Nb3ZlKGRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAgICAgdGlsZS5Jc1Zpc2l0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnQgPSBtYXBUcmFuc3BvcnRzW3RpbGUuVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UcmFuc3BvcnQodHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUuU3RvcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZpc2l0ZWRTdG9yaWVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUuU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbdGlsZS5TdG9yeS5JZCsnMiddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3b1N0YXRlU3RvcmVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgIT0gLTEgJiYgdGhpcy52aXNpdGVkU3Rvcmllcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpc2l0ZWRTdG9yaWVzLnB1c2godGlsZS5TdG9yeS5JZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLklzSW5TdG9yeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdldEN1cnJlbnRTdG9yeSgpOlN0b3J5TW9kZWwge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXS5TdG9yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZXZlYWwoKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaTwgdGhpcy5zdGF0ZUJhY2t1cC5UaWxlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqPCB0aGlzLnN0YXRlQmFja3VwLlRpbGVzW2ldLmxlbmd0aDtqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAuVGlsZXNbaV1bal0uSXNWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cC5UaWxlc1s2XVs5XS5BbGxvd2VkTW92ZXMgPSBbZGlyZWN0aW9ucy5Eb3duXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgR2VuZXJhdGVTdGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlTW9kZWwoKTtcclxuICAgICAgICAgICAgc3RhdGUuUGxheWVyID0gdGhpcy5jbG9uZSh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHN0YXRlLlRpbGVzID0gdGhpcy5jbG9uZSh0aGlzLlRpbGVzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVHJhbnNwb3J0KHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLkdlbmVyYXRlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQmFja3VwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldlN0YXRlID0gdGhpcy5zdGF0ZUJhY2t1cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZFN0YXRlKHByZXZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZE1hcCh0cmFuc3BvcnQubWFwLCB0cmFuc3BvcnQubW92ZW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAgPSBzdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc3BvcnQubWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRyYW5zcG9ydC5tYXBbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0Lm1hcFtpXVtqXSA9PSB0cmFuc3BvcnQudGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5YID0gajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRTdGF0ZShzdGF0ZTogU3RhdGVNb2RlbCl7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKHN0YXRlLlBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBzdGF0ZS5UaWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1N1cnJvdW5kVmlzaXRlZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrVmlzaXRpZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbGVzW3hdICYmIHRoaXMuVGlsZXNbeF1beV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW3hdW3ldLklzVmlzaXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNsb25lKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2xkU3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvYmosIG51bGwpO1xyXG4gICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2xkU3RhdGUsIG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbC9UaWxlTW9kZWwudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVWaWV3IHtcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY29udGVudDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIsIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LCBtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUocm93LCBjb2wsIHNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSByb3cgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBjb2wgKiBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3RpbGUnO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHB1YmxpYyBEaXNwbGF5KG1vZGVsOiBUaWxlTW9kZWwpIHtcclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ3RpbGUnXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1Zpc2l0ZWQgJiYgQ20yazE1Lmlnbm9yZVRpbGVzLmluZGV4T2YobW9kZWwuVHlwZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRpbGUtXCIgKyBtb2RlbC5UeXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnZGFyaycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInBsYXllclwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlVmlldy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcFZpZXcge1xyXG4gICAgICAgIC8vIGNvbnN0YW50c1xyXG4gICAgICAgIHRpbGVDb3VudCA9IDEzO1xyXG5cclxuICAgICAgICAvLyB2aWV3c1xyXG4gICAgICAgIHRpbGVzOiBUaWxlVmlld1tdW107XHJcblxyXG4gICAgICAgIC8vIG1vZGVsXHJcbiAgICAgICAgbW9kZWw6IE1hcE1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IobW9kZWw6IE1hcE1vZGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lbWFwIGNvbnN0cnVjdG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFwRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIGdhbWUgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRpbGUgdmlld3MgXHJcbiAgICAgICAgICAgIHZhciBtYXBXaWR0aCA9IG1hcEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB0aWxlU2l6ZSA9IG1hcFdpZHRoIC8gdGhpcy50aWxlQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbGVDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnB1c2goW10pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRpbGVDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW2ldW2pdID0gbmV3IFRpbGVWaWV3KGksIGosIHRpbGVTaXplLCBlbGVtZW50LCB0aGlzLm1vZGVsLlRpbGVzW2pdW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhdygpIHtcclxuICAgICAgICAgICAgLy8gc2Nyb2xsaW5nIG1lY2hhbmlzbVxyXG4gICAgICAgICAgICAvL3ZhciBtaWRkbGUgPSBNYXRoLmZsb29yKHRoaXMudGlsZUNvdW50IC8gMik7XHJcbiAgICAgICAgICAgIC8vdmFyIGxlZnQgPSB0aGlzLm1vZGVsLlBsYXllci5YIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlggPiAodGhpcy5tb2RlbC5XaWR0aCAtIDEgLSBtaWRkbGUpID8gdGhpcy5tb2RlbC5XaWR0aCAtIHRoaXMudGlsZUNvdW50XHJcbiAgICAgICAgICAgIC8vICAgIDogdGhpcy5tb2RlbC5QbGF5ZXIuWCAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHRvcCA9IHRoaXMubW9kZWwuUGxheWVyLlkgPCAobWlkZGxlKSA/IDBcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSA+ICh0aGlzLm1vZGVsLkhlaWdodCAtIDEgLSBtaWRkbGUpID8gdGhpcy5tb2RlbC5IZWlnaHQgLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5ZIC0gbWlkZGxlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZGVsLlRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubW9kZWwuVGlsZXNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNbal1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuUGxheWVyLlggPT0gaSAmJiB0aGlzLm1vZGVsLlBsYXllci5ZID09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5UaWxlc1tpXVtqXS5Jc1BsYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5UaWxlc1tpXVtqXS5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5EaXNwbGF5KHRoaXMubW9kZWwuVGlsZXNbaV1bal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSB0aGlzLm1vZGVsLlRpbGVzW3RoaXMubW9kZWwuUGxheWVyLlhdW3RoaXMubW9kZWwuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGN1cnJlbnRUaWxlKTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoQ20yazE1LmRpcmVjdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBDbTJrMTUuZGlyZWN0aW9uc1trZXldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93ZWQgPSBjdXJyZW50VGlsZS5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9PSAtMTtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3ZlLVwiICsgZGlyZWN0aW9uICsgXCItY29tbWFuZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBhbGxvd2VkID8gJ2lubGluZS1ibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5VmlldyB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlJbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudCA9IDxIVE1MSW1hZ2VFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yeS1pbWFnZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXcobW9kZWw6IFN0b3J5TW9kZWwpIHtcclxuICAgICAgICAgICAgaWYgKCFtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVySFRNTCA9IG1vZGVsLlN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzInO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5jbGFzc05hbWUgPSAnc3RvcnktJyArIG1vZGVsLklkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGVudW0gR2lmdHtcclxuICAgICAgICBLaXN2b25hdCxcclxuICAgICAgICBTemFua28sXHJcbiAgICAgICAgSGludGFsb1xyXG4gICAgfVxyXG5cclxuICAgIGVudW0gR2lmdFN0YXRle1xyXG4gICAgICAgIE5vbmUsXHJcbiAgICAgICAgQ29tcG9uZW50LFxyXG4gICAgICAgIEFzc2VtYmxlLFxyXG4gICAgICAgIFBhaW50LFxyXG4gICAgICAgIE1hZ2ljLFxyXG4gICAgICAgIERvbmVcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlMaW5lU2V0dGVyIHtcclxuICAgICAgICBwcml2YXRlIGdhbWVBZ2VudDogSUdhbWVBZ2VudDtcclxuICAgICAgICBwcml2YXRlIGNob29zZW5HaWZ0OiBHaWZ0O1xyXG4gICAgICAgIHByaXZhdGUgZ2lmdFN0YXRlOiBHaWZ0U3RhdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihnYW1lQWdlbnQ6SUdhbWVBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudCA9IGdhbWVBZ2VudDtcclxuICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuTm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGVCeShzdG9yeTpTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghc3RvcnkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0b3J5LklkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdibSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9HaWZ0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsyXVsxXSA9ICdyJztcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Bc3NlbWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsyXVsxXSA9ICd1JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JsJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuTm9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JpZXNUaWxlTWFwcGluZ1snYm0nXS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1snYm0yJ10uU3Rvcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYnInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Db21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdFN0YXRlID0gR2lmdFN0YXRlLkFzc2VtYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndG0nOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5QYWludClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsxXVsxXSA9ICdsJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RtMic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLk1hZ2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVPbkZhY3RvcnlNYXBbMV1bMV0gPSAndSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdFN0YXRlID0gR2lmdFN0YXRlLkRvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Eb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JpZXNUaWxlTWFwcGluZ1sndG0nXS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1sndG0zJ10uU3Rvcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JpZXNUaWxlTWFwcGluZ1sndG0nXS5JZCA9ICd0bSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndHInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Bc3NlbWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuUGFpbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0bCc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLlBhaW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuTWFnaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JpZXNUaWxlTWFwcGluZ1sndG0nXS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1sndG0yJ10uU3Rvcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JpZXNUaWxlTWFwcGluZ1sndG0nXS5JZCA9ICd0bTInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzFdWzFdID0gJ3UnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZVNob3dHaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaTInOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yeUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcnlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuaWQgPT0gJ2ZpbmlzaCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmlzaEdhbWUuYXBwbHkodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5SZWxvYWRNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgaWYoc3RvcnkuSWQgPT0gJ3RtMicgJiYgdGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkRvbmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV2ZWFsTWFwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3Vic2NyaWJlU2hvd0dpZnQoKXtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlOmFueSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5pZCA9PSAnc2hvd2dpZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1sndGwnXS5JZCA9IHRoYXQuY2hvb3NlbkdpZnQgPT0gR2lmdC5IaW50YWxvID8gJ2hpbnRhbG8nIDogdGhhdC5jaG9vc2VuR2lmdCA9PSBHaWZ0LlN6YW5rbyA/ICdzemFua28nIDogJ2tpc3ZvbmF0JztcclxuICAgICAgICAgICAgICAgICAgICBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWyd0bCddLlN0b3J5ID0gQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1sndGwyJ10uU3Rvcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nYW1lQWdlbnQuUmVsb2FkTWFwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nYW1lQWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmluaXNoR2FtZSgpe1xyXG4gICAgICAgICAgICBDbTJrMTUuY2FuTW92ZU9uQmFybk1hcFsxXVswXSA9ICcnO1xyXG4gICAgICAgICAgICBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWydiMiddLlN0b3J5ID0gQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1snY3JlZGl0J10uU3Rvcnk7XHJcbiAgICAgICAgICAgIENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ2IyJ10uSWQgPSBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWydjcmVkaXQnXS5JZDtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuUmVsb2FkTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LkRyYXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmV2ZWFsTWFwKCl7XHJcbiAgICAgICAgICAgIENtMmsxNS5jYW5Nb3ZlT25GYWN0b3J5TWFwWzFdWzFdID0gJ3VkbHInO1xyXG4gICAgICAgICAgICBDbTJrMTUuY2FuTW92ZU9uRmFjdG9yeU1hcFsyXVsxXSA9ICd1ZGxyJztcclxuICAgICAgICAgICAgQ20yazE1LmNhbk1vdmVPbkJhcm5NYXBbMV1bMF0gPSAndXInO1xyXG5cclxuICAgICAgICAgICAgQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1snYiddID0gQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1snYjInXTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuUmV2ZWFsTWFwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN1YnNjcmliZVRvR2lmdHMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXA6e1trZXk6c3RyaW5nXTogc3RyaW5nfSA9IHt9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQk0gPSBnaWZ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzJdWzFdID0gJ2wnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ2JtJ10uU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbJ2JtX2Nob3NlbiddLlN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7MH0nLCBnaWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnezF9JywgZ2lmdENvbXBvbmVudE1hcFt0aGF0LmNob29zZW5HaWZ0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuUmVsb2FkTWFwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXBbR2lmdC5LaXN2b25hdF0gPSAnbsOpaMOhbnkgZmFrb2NrYSwgcMOhciBoZW5nZXIgw6lzIGVneSBrw6ltw6lueSc7XHJcbiAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXBbR2lmdC5IaW50YWxvXSA9ICdwbMO8c3MgYm9yw610w6FzLCBmYSB0YWxwIMOpcyBueWVyZWcnO1xyXG4gICAgICAgICAgICBnaWZ0Q29tcG9uZW50TWFwW0dpZnQuU3phbmtvXSA9ICduw6low6FueSBmYSBsw6ljLCBlZ3kga2FwYXN6a29kw7Mgw6lzIGvDtnTDqWwnO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcblxyXG4gICAgICAgICAgICBzdG9yeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2hpbnRhbG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VuR2lmdCA9IEdpZnQuSGludGFsbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUJNKCdoaW50YWxvdmEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2lzdm9uYXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VuR2lmdCA9IEdpZnQuS2lzdm9uYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVCTSgna2lzdm9uYScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzemFua28nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VuR2lmdCA9IEdpZnQuU3phbmtvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlQk0oJ3N6w6Fua8OzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwibW9kZWwvTWFwTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L01hcFZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L1N0b3J5Vmlldy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0b3J5TGluZVNldHRlci50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2FtZUFnZW50IHtcclxuICAgICAgICBEcmF3KCk7XHJcbiAgICAgICAgUmVsb2FkTWFwKCk7XHJcbiAgICAgICAgUmV2ZWFsTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgICAgIHByaXZhdGUgbWFwVmlldzogTWFwVmlldztcclxuICAgICAgICBwcml2YXRlIG1hcE1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeVZpZXc6IFN0b3J5VmlldztcclxuICAgICAgICBwcml2YXRlIHN0b3J5TGluZVNldHRlcjogU3RvcnlMaW5lU2V0dGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbW1hbmRzOiB7IFtrZXk6IHN0cmluZ106IChhcmdzKSA9PiBhbnkgfTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHN0YXRlIGFuZCBjb21tYW5kc1xyXG4gICAgICAgICAgICB0aGlzLm1hcE1vZGVsID0gbmV3IE1hcE1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmRzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbWFwIHZpZXdcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3ID0gbmV3IE1hcFZpZXcodGhpcy5tYXBNb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5VmlldyA9IG5ldyBTdG9yeVZpZXcoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZ2VudDpJR2FtZUFnZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgRHJhdzogKCkgPT4gdGhpcy5EcmF3KCksXHJcbiAgICAgICAgICAgICAgICBSZWxvYWRNYXA6ICgpID0+IHRoaXMubWFwTW9kZWwuUmVsb2FkTWFwLmNhbGwodGhpcy5tYXBNb2RlbCksXHJcbiAgICAgICAgICAgICAgICBSZXZlYWxNYXA6ICgpID0+IHRoaXMuUmV2ZWFsTWFwKClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlMaW5lU2V0dGVyID0gbmV3IFN0b3J5TGluZVNldHRlcihhZ2VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKCdtb3ZlJywgdGhpcy5tb3ZlQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS11cC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5VcCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLWRvd24tY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuRG93bik7XHJcbiAgICAgICAgICAgIH07IFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1yaWdodC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLWxlZnQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuTGVmdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZChrZXk6IHN0cmluZywgY29tbWFuZDogKGFyZ3MpID0+IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzW2tleV0gPSBjb21tYW5kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQ29tbWFuZCh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0cy5zcGxpY2UoMSwgcGFydHMubGVuZ3RoIC0gMSkgOiBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHNbY29tbWFuZF0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZUNvbW1hbmQoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMubWFwTW9kZWwuUGxheWVyLklzSW5TdG9yeSlcclxuICAgICAgICAgICAgLy8gIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGlsZSA9IHRoaXMubWFwTW9kZWwuVGlsZXNbdGhpcy5tYXBNb2RlbC5QbGF5ZXIuWF1bdGhpcy5tYXBNb2RlbC5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGlsZS5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pID09IC0xKSBcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyZSBuZW0gbWVoZXRzeic7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5tYXBNb2RlbC5Nb3ZlUGxheWVyKGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0LlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gdGhpcy5tYXBNb2RlbC5HZXRDdXJyZW50U3RvcnkoKTtcclxuICAgICAgICAgICAgdGhpcy5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5TGluZVNldHRlci5VcGRhdGVCeShzdG9yeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIERyYXcoKXtcclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gdGhpcy5tYXBNb2RlbC5HZXRDdXJyZW50U3RvcnkoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcuRHJhdyhzdG9yeSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5EcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFJldmVhbE1hcCgpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcE1vZGVsLlJldmVhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJHYW1lLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICB2YXIgZ2FtZSA9IG5ldyBDbTJrMTUuR2FtZSgpO1xyXG59XHJcbiAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOiBQbGF5ZXJNb2RlbDtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6IFRpbGVNb2RlbFtdW107XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
