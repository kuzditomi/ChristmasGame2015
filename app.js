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
        'tl': new Cm2k15.StoryModel('tl', 'MAGIC!'),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJTdG9yeUxpbmVTZXR0ZXIudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLlJlbG9hZE1hcCIsIkNtMmsxNS5NYXBNb2RlbC5nZXREaXJlY3Rpb25zIiwiQ20yazE1Lk1hcE1vZGVsLk1vdmVQbGF5ZXIiLCJDbTJrMTUuTWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5IiwiQ20yazE1Lk1hcE1vZGVsLlJldmVhbCIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRyYXciLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HaWZ0IiwiQ20yazE1LkdpZnRTdGF0ZSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLmNvbnN0cnVjdG9yIiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5VcGRhdGVCeSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuZmluaXNoR2FtZSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIucmV2ZWFsTWFwIiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5zdWJzY3JpYmVUb0dpZnRzIiwiQ20yazE1LkdhbWUiLCJDbTJrMTUuR2FtZS5jb25zdHJ1Y3RvciIsIkNtMmsxNS5HYW1lLnJlZ2lzdGVyQ29tbWFuZHMiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmQiLCJDbTJrMTUuR2FtZS5vbkNvbW1hbmQiLCJDbTJrMTUuR2FtZS5tb3ZlQ29tbWFuZCIsIkNtMmsxNS5HYW1lLkRyYXciLCJDbTJrMTUuR2FtZS5SZXZlYWxNYXAiLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFP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QSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDN0VBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3ZFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzlFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDMUVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDeERBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdkRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUMzREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0lBRUZBLDBCQUFtQkEsR0FBR0E7UUFDbEJBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ1pBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQ2ZBLENBQUNBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1FBQ2RBLENBQUNBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ2hCQSxDQUFDQTtJQUVGQSxrQkFBV0EsR0FBR0Esa0JBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLE9BQU9BLEVBQUNBLE9BQU9BLEVBQUNBLElBQUlBLEVBQUNBLElBQUlBLEVBQUNBLElBQUlBLEVBQUNBLElBQUlBLEVBQUNBLElBQUlBLEVBQUNBLElBQUlBLEVBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO0lBRTFGQSxpQkFBVUEsR0FBR0E7UUFD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LElBQUFwRDtJQUhZQSxpQkFBVUEsYUFHdEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBTE0sTUFBTSxLQUFOLE1BQU0sUUFLWiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICBVcDogJ3VwJyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgRG93bjogJ2Rvd24nLFxyXG4gICAgTGVmdDogJ2xlZnQnXHJcbiAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElzVmlzaXRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgSXNQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFR5cGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgQWxsb3dlZE1vdmVzOiBzdHJpbmdbXTtcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbGVUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc1Zpc2l0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0aWxlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblZhbHVlcyA9IE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5tYXAoayA9PiBDbTJrMTUuZGlyZWN0aW9uc1trXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WYWx1ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9IC0xICYmIHRoaXMuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKGRpcmVjdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgU3VjY2VzczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgWTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBJc0luU3Rvcnk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllck1vZGVsID0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gcGxheWVyLlg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlkgPSBwbGF5ZXIuWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXNJblN0b3J5ID0gcGxheWVyLklzSW5TdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIDogUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGxheWVyTW92ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5VcDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5Eb3duOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSAnTW92ZSB3aGVyZT8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSBcIllvdSBoYXZlIG1vdmVkIFwiICsgZGlyZWN0aW9uICsgXCIuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBzdG9yeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5TdG9yeSA9IHN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWFwVHJhbnNwb3J0IHtcclxuICAgICAgICBtYXA6IHN0cmluZ1tdW107XHJcbiAgICAgICAgbW92ZW1lbnRzOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIHRpbGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdmFyIGdhbWVtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGZhY3RvcnltYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGJhcm5tYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25NYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkZhY3RvcnlNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPblZpbGxhZ2VNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkJhcm5NYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBtYXBUcmFuc3BvcnRzOiB7IFtrZXk6IHN0cmluZ106IElNYXBUcmFuc3BvcnQgfTtcclxuICAgIGV4cG9ydCB2YXIgaWdub3JlVGlsZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgZ2FtZW1hcCA9IFtcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlMScsICdlMicsICdlMycsICdlNCcsICdlNScsICdlNicsICdlNycsICdlOCddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2U5JywgJ2UxMCcsICdlMTEnLCAnZTEyJywgJ2UxMycsICdlMTQnLCAnZTE1JywgJ2UxNiddLFxyXG4gICAgICAgIFsnLScsICdtMScsICdtMicsICdtMycsICctJywgJ2UxNycsICdlMTgnLCAnZTE5JywgJ2UyMCcsICdlMjEnLCAnZTIyJywgJ2UyMycsICdlMjQnXSxcclxuICAgICAgICBbJy0nLCAnbTQnLCAnbTUnLCAnbTYnLCAnLScsICctJywgJy0nLCAnLScsICd1NScsICctJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ203JywgJ204JywgJ3UxdicsICd1MScsICd1MScsICd1MicsICd1MScsICd1MycsICd1MScsICd1MScsICd1NCcsICctJ10sXHJcbiAgICAgICAgWyctJywgJ3U1dicsICctJywgJy0nLCAnLScsICctJywgJ3U1ZycsICctJywgJy0nLCAnLScsICctJywgJ2gxJywgJ2gyJ10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICctJywgJy0nLCAnaDMnLCAnaDQnXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2c2JywgJ2c3JywgJ2c4JywgJ2c5JywgJ2cxMCcsICdrNCcsICdrMScsICdrMScsICdrMSddLFxyXG4gICAgICAgIFsnLScsICd1NWInLCAnLScsICctJywgJ2cxMScsICdnMTInLCAnZzEzJywgJ2cxNCcsICdnMTUnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTEnLCAnaTInLCAnLScsICctJywgJy0nLCAnbCcsICctJywgJ2YxJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kzJywgJ2k0JywgJ2k1JywgJ3UxYicsICd1MScsICd1NicsICctJywgJ2YyJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWydrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrYicsICdrMScsICdrMScsICdrMycsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uTWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJ3InLCAnbHInLCAnbHInLCAnbHInLCAnbHJkJywgJ3JsJywgJ3VscicsICdybCcsICdybCcsICdkbCcsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAndScsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnZHUnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJ3InLCAnbHInLCAnbHInLCAndWwnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcblxyXG4gICAgZmFjdG9yeW1hcCA9IFtcclxuICAgICAgICBbJy0nLCAndGV4aXQnLCAnLSddLFxyXG4gICAgICAgIFsndGwnLCAndG0nLCAndHInXSxcclxuICAgICAgICBbJ2JsJywgJ2JtJywgJ2JyJ10sXHJcbiAgICAgICAgWyctJywgJ2JleGl0JywgJy0nXVxyXG4gICAgXTtcclxuXHJcbiAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnXSxcclxuICAgICAgICBbJ3InLCAncicsICdsJ10sXHJcbiAgICAgICAgWydyJywgJycsICdsJ10sXHJcbiAgICAgICAgWycnLCAndScsICcnXVxyXG4gICAgXTtcclxuXHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ3RleGl0JywnYmV4aXQnLCd0bCcsJ3RtJywndHInLCdibCcsJ2JtJywnYnInLCdiZXhpdCddKTtcclxuXHJcbiAgICB2aWxsYWdlbWFwID0gW1xyXG4gICAgICAgIFtcIm1cIiwgXCJyZXhpdHZcIl0sXHJcbiAgICAgICAgW1wiYmV4aXR2XCIsIFwiLVwiXSxcclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25WaWxsYWdlTWFwID0gW1xyXG4gICAgICAgIFsnZHInLCcnXSxcclxuICAgICAgICBbJycsJyddXHJcbiAgICBdO1xyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWydtJywncmV4aXR2JywnYmV4aXR2J10pO1xyXG5cclxuICAgIGJhcm5tYXAgPSBbXHJcbiAgICAgICAgW1widGV4aXRiXCIsIFwiLVwiXSxcclxuICAgICAgICBbXCJiXCIsIFwicmV4aXRiXCJdLFxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPbkJhcm5NYXAgPSBbXHJcbiAgICAgICAgWycnLCcnXSxcclxuICAgICAgICBbJ3InLCcnXVxyXG4gICAgXTtcclxuICAgIGlnbm9yZVRpbGVzID0gaWdub3JlVGlsZXMuY29uY2F0KFsnYicsJ3RleGl0YicsJ3JleGl0YiddKTtcclxuXHJcbiAgICBtYXBUcmFuc3BvcnRzID0ge1xyXG4gICAgICAgIC8vIG1hcCA9PiBmYWN0b3J5bWFwXHJcbiAgICAgICAgJ2cxMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAnYmV4aXQnIH0sXHJcbiAgICAgICAgJ2czJzogeyBtYXA6IGZhY3RvcnltYXAsIG1vdmVtZW50czogY2FuTW92ZU9uRmFjdG9yeU1hcCAsIHRpbGU6ICd0bScgfSxcclxuXHJcbiAgICAgICAgLy8gbWFwID0+IHZpbGxhZ2VtYXBcclxuICAgICAgICAnbTgnOiB7IG1hcDogdmlsbGFnZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25WaWxsYWdlTWFwLCB0aWxlOiAnbScgfSxcclxuICAgICAgICAnbTcnOiB7IG1hcDogdmlsbGFnZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25WaWxsYWdlTWFwLCB0aWxlOiAnbScgfSxcclxuXHJcbiAgICAgICAgLy8gbWFwID0+IGJhcm5tYXBcclxuICAgICAgICAnaTEnOiB7IG1hcDogYmFybm1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25CYXJuTWFwLCB0aWxlOiAnYicgfSxcclxuICAgICAgICAnaTUnOiB7IG1hcDogYmFybm1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25CYXJuTWFwLCB0aWxlOiAnYicgfSxcclxuXHJcbiAgICAgICAgLy8gZmFjdG9yeW1hcCA9PiBtYXBcclxuICAgICAgICAnYmV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICdsJyB9LFxyXG4gICAgICAgICd0ZXhpdCc6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1ZycgfSxcclxuXHJcbiAgICAgICAgLy8gdmlsbGFnZW1hcCA9PiBtYXBcclxuICAgICAgICAncmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTF2JyB9LFxyXG4gICAgICAgICdiZXhpdHYnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NXYnIH0sXHJcblxyXG4gICAgICAgIC8vIGJhcm5tYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxYicgfSxcclxuICAgICAgICAndGV4aXRiJzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTViJyB9LFxyXG4gICAgfTtcclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IHZhciBzdG9yaWVzVGlsZU1hcHBpbmc6IHsgW2tleTogc3RyaW5nXTogU3RvcnlNb2RlbCB9O1xyXG4gICAgZXhwb3J0IHZhciB0d29TdGF0ZVN0b3Jlczogc3RyaW5nW107XHJcblxyXG4gICAgc3Rvcmllc1RpbGVNYXBwaW5nID0ge1xyXG4gICAgICAgICdrYic6IG5ldyBTdG9yeU1vZGVsKCdrYicsXHJcbiAgICAgICAgICAgICfDnGR2IGEgasOhdMOpa2Jhbi4gTnllcnTDqWwgZWd5IGplZ3lldCBhIE1pa3Vsw6FzZ3nDoXJiYSwgdGFsw6Fsa296aGF0c3ogc29rIHZhcsOhenNsYXR0YWwsIMOpcyBoYSBqw7Mgdm9sdMOhbCwgbcOpZyBhasOhbmTDqWtvdCBpcyBrYXBoYXRzei4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYic6IG5ldyBTdG9yeU1vZGVsKCdpNScsXHJcbiAgICAgICAgICAgICdFeiBheiBpc3TDoWxsw7MsIGlubmVuIGluZHVsIMOpcyDDqXJrZXppayBhIHTDqWxhcMOzLiBBIG1hbsOzayDDqXBwIHRha2Fyw610YW5haywgdGFua29sbmFrLCBwb2zDrXJvenrDoWsgUnVkb2xmIG9ycsOhdC4gw5xyZXNuZWsgdGFsw6Fsb2QsIG3DqWcgbmVtIMOpcmtlemV0dCBlbCBheiBpZMWRIGF6IGluZHVsw6FzcmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2IyJzogbmV3IFN0b3J5TW9kZWwoJ2kyJyxcclxuICAgICAgICAgICAgJ8OJcHAgaW5kdWwgTWlrdWzDoXMuIEZlbHN6w6FsbHN6PzxhIGlkPVwiZmluaXNoXCI+SWdlbjwvYT4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQnOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQnLFxyXG4gICAgICAgICAgICAnU3ppYSEgTWVndGFsw6FsdGFkIGEgTWlrdWzDoXMgZ3nDoXLDoXQsIMOpbiBsZXN6ZWsgYSBrYWxhdXpvZC4gQW1lZGRpZyBNaWt1bMOhcyBrw6lzesO8bMWRZGlrLCBtZWdpc21lcmhldGVkIGEgbcWxaGVsecOpdCwgc8WRdCBraSBpcyBwcsOzYsOhbGhhdG9kISBHeWVyZSBiZWxqZWJiLCBtZWdtdXRhdG9tISdcclxuICAgICAgICApLFxyXG4gICAgICAgICdibSc6IG5ldyBTdG9yeU1vZGVsKCdibScsXHJcbiAgICAgICAgICAgICdIw6F0IMOtbWUuIEJhbHJhIHRhbMOhbG9kIGEgcmFrdMOhcmF0LCBqb2JicmEgYSBtxbFoZWx5dCwgYSBrw7Z2ZXRrZXrFkSBmb2x5b3PDs24gcGVkaWcgbWVndGFsw6Fsb2QgYSBmZXN0xZFzem9iw6F0LiDDiXMgaG9neSBtaXQgcmVqdCBhIG5lZ3llZGlrIGFqdMOzPyBFZ3kga2lzIHZhcsOhenNsYVQuLi4gTWl2ZWwgaWx5ZW4gasOzIHZvbHTDoWwgaWTDqW4g4oCTIG1vbmRqYSBhIG1hbsOzIMOpcyBlbGZvcmR1bCDDoXRqYXbDrXRhbmkgYSBzdGF0aXN6dGlrw6FkIC0sIHbDoWxhc3p0aGF0c3ogZWd5IGFqw6FuZMOpa290IGEgTWlrdWzDoXNnecOhcmLDs2w6JyArXHJcbiAgICAgICAgICAgICc8dWw+PGxpIGNsYXNzPVwiYWphbmRla1wiIGlkPVwic3phbmtvXCI+U3rDoW5rw7M8L2xpPjxsaSBjbGFzcz1cImFqYW5kZWtcIiBpZD1cImhpbnRhbG9cIj5IaW50YWzDszwvbGk+PGxpIGNsYXNzPVwiYWphbmRla1wiIGlkPVwia2lzdm9uYXRcIj5LaXN2b25hdDwvbGk+PC91bD4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm1fY2hvc2VuJzogbmV3IFN0b3J5TW9kZWwoJ2JtX2Nob3NlbicsXHJcbiAgICAgICAgICAgICfDgSBzesOzdmFsIGEgezB9dCB2w6FsYXN6dG90dGFkISBOw6l6esO8ayBjc2FrIGhvZ3kgdHVkb2QgZWxrw6lzesOtdGVuaS4uLjxici8+JyArXHJcbiAgICAgICAgICAgICc8dWw+PGxpPktlbGwgbWFqZCBiZWxlIHsxfSBhIHJha3TDoXIgc3pvYsOhYsOzbCw8L2xpPjxsaT5heiDDvGd5ZXMgbWFuw7NrIGEgbcWxaGVseWJlbiDDtnNzemVzemVyZWxpayBuZWtlZCw8L2xpPjxsaT4gYSBmZXN0xZEgc3pvYsOhYmFuIG1lZ2thcGphIGEgc3rDrW5laXQsPC9saT48bGk+IMOpcyB2w6lnw7xsIGVsbMOhdGp1ayBhIGthcsOhY3Nvbnkgc3plbGxlbcOpdmVsJnRyYWRlOy48L2xpPjwvdWw+J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtMic6IG5ldyBTdG9yeU1vZGVsKCdibScsXHJcbiAgICAgICAgICAgICdBIGd5w6FyIGVsxZFzem9iw6Fqw6FiYW4gdmFneS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmV4aXQyJzogbmV3IFN0b3J5TW9kZWwoJ2JleGl0MicsXHJcbiAgICAgICAgICAgICdFeiBhIGJlasOhcmF0IGEgZ3nDoXJiYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndGwnOiBuZXcgU3RvcnlNb2RlbCgndGwnLFxyXG4gICAgICAgICAgICAnTUFHSUMhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RtJzogbmV3IFN0b3J5TW9kZWwoJ3RtJyxcclxuICAgICAgICAgICAgJ0pvYmJyYSBmZXN0ZWdldGhlc3osIGJhbHJhIHBlZGlnIG1pbmRlbiDDqXJ0ZWxtZXQgbnllci4gQXogbWVnIGEgaMOhdHPDsyBraWrDoXJhdCBheiBlcmTFkSBmZWzDqS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndG0yJzogbmV3IFN0b3J5TW9kZWwoJ3RtMicsXHJcbiAgICAgICAgICAgICdOYWd5b24gc3rDqXAgbGV0dCBhIGrDoXTDqWtvZCEgQSBtaWt1bMOhcyBuZW1zb2vDoXJhIGluZHVsLCBtZWd0YWzDoWxvZCBheiBpc3TDoWxsw7Nuw6FsLCBhZGRpZyBueXVnb2R0YW4gbsOpenoga8O2csO8bCBhIGJpcnRva29uLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bTMnOiBuZXcgU3RvcnlNb2RlbCgndG0nLFxyXG4gICAgICAgICAgICAnQSBnecOhciBow6F0c8OzIGZvbHlvc8OzasOhbiB2YWd5LidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0cic6IG5ldyBTdG9yeU1vZGVsKCd0cicsXHJcbiAgICAgICAgICAgICdFeiBhIGZlc3TFkXMgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JsJzogbmV3IFN0b3J5TW9kZWwoJ2JsJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHJha3TDoXIgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JyJzogbmV3IFN0b3J5TW9kZWwoJ2JyJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHN6ZXJlbMWRcyBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnbSc6IG5ldyBTdG9yeU1vZGVsKCdtJyxcclxuICAgICAgICAgICAgJ01hbsOzIGZhbHZhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2UyMCc6IG5ldyBTdG9yeU1vZGVsKCdlMjAnLFxyXG4gICAgICAgICAgICAnRXJkZcWRJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2gxJzogbmV3IFN0b3J5TW9kZWwoJ2gxJyxcclxuICAgICAgICAgICAgJ1RhdmFjc2thJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2NyZWRpdCc6IG5ldyBTdG9yeU1vZGVsKCdjcmVkaXQnLFxyXG4gICAgICAgICAgICAnQm9sZG9nIGthcsOhY3Nvbnl0LCBrw7ZzemkgYSBqw6F0w6lrb3QuJ1xyXG4gICAgICAgICksXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0d29TdGF0ZVN0b3JlcyA9IFtcImJleGl0XCIsIFwiYm1cIl07XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGxheWVyTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTW92ZURpcmVjdGlvbnMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL21hcHMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL3N0b3JpZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFRpbGVzOlRpbGVNb2RlbFtdW107XHJcbiAgICAgICAgcHVibGljIFBsYXllcjpQbGF5ZXJNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIFdpZHRoOm51bWJlcjtcclxuICAgICAgICBwdWJsaWMgSGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUJhY2t1cDogU3RhdGVNb2RlbDtcclxuICAgICAgICBwcml2YXRlIHZpc2l0ZWRTdG9yaWVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1hcChnYW1lbWFwLCBjYW5Nb3ZlT25NYXApO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IDY7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSAxMjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgdGhpcy52aXNpdGVkU3RvcmllcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0bWFwO1xyXG4gICAgICAgIHByaXZhdGUgbGFzdG1vdmVtZW50cztcclxuICAgICAgICBwcml2YXRlIGxvYWRNYXAobWFwOnN0cmluZ1tdW10sIG1vdmVtZW50czpzdHJpbmdbXVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdG1hcCA9IG1hcDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0bW92ZW1lbnRzID0gbW92ZW1lbnRzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5XaWR0aCA9IG1hcC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuSGVpZ2h0ID0gbWFwWzBdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5IZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLldpZHRoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IG5ldyBUaWxlTW9kZWwobWFwW2pdW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKHRoaXMuZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHMsIGosIGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nW3RpbGUuVHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbaV1bal0gPSB0aWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVsb2FkTWFwKCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1hcCh0aGlzLmxhc3RtYXAsIHRoaXMubGFzdG1vdmVtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVtZW50TWFwID0ge1xyXG4gICAgICAgICAgICAndSc6IENtMmsxNS5kaXJlY3Rpb25zLlVwLFxyXG4gICAgICAgICAgICAnZCc6IENtMmsxNS5kaXJlY3Rpb25zLkRvd24sXHJcbiAgICAgICAgICAgICdsJzogQ20yazE1LmRpcmVjdGlvbnMuTGVmdCxcclxuICAgICAgICAgICAgJ3InOiBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHM6c3RyaW5nW11bXSwgeDpudW1iZXIsIHk6bnVtYmVyKTpzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlbWVudENlbGwgPSBtb3ZlbWVudHNbeF1beV07XHJcbiAgICAgICAgICAgIHJldHVybiBtb3ZlbWVudENlbGwuc3BsaXQoJycpLm1hcChkID0+IHRoaXMubW92ZW1lbnRNYXBbZF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVQbGF5ZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuUGxheWVyLk1vdmUoZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICB0aWxlLklzVmlzaXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IG1hcFRyYW5zcG9ydHNbdGlsZS5UeXBlXTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRyYW5zcG9ydCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5TdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlN0b3J5LklkKycyJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLklzSW5TdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHdvU3RhdGVTdG9yZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSAmJiB0aGlzLnZpc2l0ZWRTdG9yaWVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZFN0b3JpZXMucHVzaCh0aWxlLlN0b3J5LklkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR2V0Q3VycmVudFN0b3J5KCk6U3RvcnlNb2RlbCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldLlN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJldmVhbCgpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCB0aGlzLnN0YXRlQmFja3VwLlRpbGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGo8IHRoaXMuc3RhdGVCYWNrdXAuVGlsZXNbaV0ubGVuZ3RoO2orKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cC5UaWxlc1tpXVtqXS5Jc1Zpc2l0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwLlRpbGVzWzZdWzldLkFsbG93ZWRNb3ZlcyA9IFtkaXJlY3Rpb25zLkRvd25dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBHZW5lcmF0ZVN0YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGVNb2RlbCgpO1xyXG4gICAgICAgICAgICBzdGF0ZS5QbGF5ZXIgPSB0aGlzLmNsb25lKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgc3RhdGUuVGlsZXMgPSB0aGlzLmNsb25lKHRoaXMuVGlsZXMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUcmFuc3BvcnQodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuR2VuZXJhdGVTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVCYWNrdXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlQmFja3VwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2FkU3RhdGUocHJldlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTWFwKHRyYW5zcG9ydC5tYXAsIHRyYW5zcG9ydC5tb3ZlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cCA9IHN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zcG9ydC5tYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdHJhbnNwb3J0Lm1hcFtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQubWFwW2ldW2pdID09IHRyYW5zcG9ydC50aWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlggPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5ZID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZFN0YXRlKHN0YXRlOiBTdGF0ZU1vZGVsKXtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyTW9kZWwoc3RhdGUuUGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IHN0YXRlLlRpbGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrU3Vycm91bmRWaXNpdGVkKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5IC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5IC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5IC0gMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5ICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5ICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE1hcmtWaXNpdGllZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGlsZXNbeF0gJiYgdGhpcy5UaWxlc1t4XVt5XSlcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbeF1beV0uSXNWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvbmUob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGU7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG9iaiwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvbGRTdGF0ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vZGVsL1RpbGVNb2RlbC50c1wiLz5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGlsZVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlciwgZWxlbWVudDogSFRNTERpdkVsZW1lbnQsIG1vZGVsOiBUaWxlTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShyb3csIGNvbCwgc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemUocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IHJvdyAqIHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGNvbCAqIHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSc7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcHVibGljIERpc3BsYXkobW9kZWw6IFRpbGVNb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsndGlsZSddO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGVsLklzVmlzaXRlZCAmJiBDbTJrMTUuaWdub3JlVGlsZXMuaW5kZXhPZihtb2RlbC5UeXBlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidGlsZS1cIiArIG1vZGVsLlR5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdkYXJrJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1BsYXllcikge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRpbGVWaWV3LnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwVmlldyB7XHJcbiAgICAgICAgLy8gY29uc3RhbnRzXHJcbiAgICAgICAgdGlsZUNvdW50ID0gMTM7XHJcblxyXG4gICAgICAgIC8vIHZpZXdzXHJcbiAgICAgICAgdGlsZXM6IFRpbGVWaWV3W11bXTtcclxuXHJcbiAgICAgICAgLy8gbW9kZWxcclxuICAgICAgICBtb2RlbDogTWFwTW9kZWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihtb2RlbDogTWFwTW9kZWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWVtYXAgY29uc3RydWN0b3InKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXBFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgZ2FtZSBzdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGlsZSB2aWV3cyBcclxuICAgICAgICAgICAgdmFyIG1hcFdpZHRoID0gbWFwRWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgdmFyIHRpbGVTaXplID0gbWFwV2lkdGggLyB0aGlzLnRpbGVDb3VudDtcclxuICAgICAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGlsZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMucHVzaChbXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudGlsZUNvdW50OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbaV1bal0gPSBuZXcgVGlsZVZpZXcoaSwgaiwgdGlsZVNpemUsIGVsZW1lbnQsIHRoaXMubW9kZWwuVGlsZXNbal1baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KCkge1xyXG4gICAgICAgICAgICAvLyBzY3JvbGxpbmcgbWVjaGFuaXNtXHJcbiAgICAgICAgICAgIC8vdmFyIG1pZGRsZSA9IE1hdGguZmxvb3IodGhpcy50aWxlQ291bnQgLyAyKTtcclxuICAgICAgICAgICAgLy92YXIgbGVmdCA9IHRoaXMubW9kZWwuUGxheWVyLlggPCAobWlkZGxlKSA/IDBcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWCA+ICh0aGlzLm1vZGVsLldpZHRoIC0gMSAtIG1pZGRsZSkgPyB0aGlzLm1vZGVsLldpZHRoIC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gICAgOiB0aGlzLm1vZGVsLlBsYXllci5YIC0gbWlkZGxlO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdG9wID0gdGhpcy5tb2RlbC5QbGF5ZXIuWSA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5ZID4gKHRoaXMubW9kZWwuSGVpZ2h0IC0gMSAtIG1pZGRsZSkgPyB0aGlzLm1vZGVsLkhlaWdodCAtIHRoaXMudGlsZUNvdW50XHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kZWwuVGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5tb2RlbC5UaWxlc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy50aWxlc1tqXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5QbGF5ZXIuWCA9PSBpICYmIHRoaXMubW9kZWwuUGxheWVyLlkgPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLlRpbGVzW2ldW2pdLklzUGxheWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLlRpbGVzW2ldW2pdLklzUGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aWxlLkRpc3BsYXkodGhpcy5tb2RlbC5UaWxlc1tpXVtqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGlsZSA9IHRoaXMubW9kZWwuVGlsZXNbdGhpcy5tb2RlbC5QbGF5ZXIuWF1bdGhpcy5tb2RlbC5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3VycmVudFRpbGUpO1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhDbTJrMTUuZGlyZWN0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IENtMmsxNS5kaXJlY3Rpb25zW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dlZCA9IGN1cnJlbnRUaWxlLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmUtXCIgKyBkaXJlY3Rpb24gKyBcIi1jb21tYW5kXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vdmVCdXR0b24uc3R5bGUuZGlzcGxheSA9IGFsbG93ZWQgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlWaWV3IHtcclxuICAgICAgICBwcml2YXRlIHN0b3J5RWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yeScpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50ID0gPEhUTUxJbWFnZUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5LWltYWdlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhdyhtb2RlbDogU3RvcnlNb2RlbCkge1xyXG4gICAgICAgICAgICBpZiAoIW1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQuaW5uZXJIVE1MID0gbW9kZWwuU3Rvcnk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS56SW5kZXggPSAnMic7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LmNsYXNzTmFtZSA9ICdzdG9yeS0nICsgbW9kZWwuSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZW51bSBHaWZ0e1xyXG4gICAgICAgIEtpc3ZvbmF0LFxyXG4gICAgICAgIFN6YW5rbyxcclxuICAgICAgICBIaW50YWxvXHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBHaWZ0U3RhdGV7XHJcbiAgICAgICAgTm9uZSxcclxuICAgICAgICBDb21wb25lbnQsXHJcbiAgICAgICAgQXNzZW1ibGUsXHJcbiAgICAgICAgUGFpbnQsXHJcbiAgICAgICAgTWFnaWMsXHJcbiAgICAgICAgRG9uZVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeUxpbmVTZXR0ZXIge1xyXG4gICAgICAgIHByaXZhdGUgZ2FtZUFnZW50OiBJR2FtZUFnZW50O1xyXG4gICAgICAgIHByaXZhdGUgY2hvb3NlbkdpZnQ6IEdpZnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBnaWZ0U3RhdGU6IEdpZnRTdGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGdhbWVBZ2VudDpJR2FtZUFnZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50ID0gZ2FtZUFnZW50O1xyXG4gICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5Ob25lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZUJ5KHN0b3J5OlN0b3J5TW9kZWwpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzdG9yeSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RvcnkuSWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JtJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0dpZnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuQ29tcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzJdWzFdID0gJ3InO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkFzc2VtYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzJdWzFdID0gJ3UnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYmwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Ob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdFN0YXRlID0gR2lmdFN0YXRlLkNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1RpbGVNYXBwaW5nWydibSddLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nWydibTInXS5TdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdicic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuQXNzZW1ibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0bSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLlBhaW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzFdWzFdID0gJ2wnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndG0yJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuTWFnaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsxXVsxXSA9ICd1JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuRG9uZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkRvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1RpbGVNYXBwaW5nWyd0bSddLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nWyd0bTMnXS5TdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1RpbGVNYXBwaW5nWyd0bSddLklkID0gJ3RtJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0cic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkFzc2VtYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5QYWludDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RsJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuUGFpbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5NYWdpYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1RpbGVNYXBwaW5nWyd0bSddLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nWyd0bTInXS5TdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1RpbGVNYXBwaW5nWyd0bSddLklkID0gJ3RtMic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVPbkZhY3RvcnlNYXBbMV1bMV0gPSAndSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaTInOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yeUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcnlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuaWQgPT0gJ2ZpbmlzaCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmlzaEdhbWUuYXBwbHkodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5SZWxvYWRNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgaWYoc3RvcnkuSWQgPT0gJ3RtMicgJiYgdGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkRvbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlYWxNYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaW5pc2hHYW1lKCl7XHJcbiAgICAgICAgICAgIENtMmsxNS5jYW5Nb3ZlT25CYXJuTWFwWzFdWzBdID0gJyc7XHJcbiAgICAgICAgICAgIENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ2IyJ10uU3RvcnkgPSBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWydjcmVkaXQnXS5TdG9yeTtcclxuICAgICAgICAgICAgQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1snYjInXS5JZCA9IENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ2NyZWRpdCddLklkO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5SZWxvYWRNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuRHJhdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZXZlYWxNYXAoKXtcclxuICAgICAgICAgICAgQ20yazE1LmNhbk1vdmVPbkZhY3RvcnlNYXBbMV1bMV0gPSAndWRscic7XHJcbiAgICAgICAgICAgIENtMmsxNS5jYW5Nb3ZlT25GYWN0b3J5TWFwWzJdWzFdID0gJ3VkbHInO1xyXG4gICAgICAgICAgICBDbTJrMTUuY2FuTW92ZU9uQmFybk1hcFsxXVswXSA9ICd1cic7XHJcblxyXG4gICAgICAgICAgICBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWydiJ10gPSBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWydiMiddO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5SZXZlYWxNYXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3Vic2NyaWJlVG9HaWZ0cygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZ2lmdENvbXBvbmVudE1hcDp7W2tleTpzdHJpbmddOiBzdHJpbmd9ID0ge30sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVCTSA9IGdpZnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVPbkZhY3RvcnlNYXBbMl1bMV0gPSAnbCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JpZXNUaWxlTWFwcGluZ1snYm0nXS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1snYm1fY2hvc2VuJ10uU3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3swfScsIGdpZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7MX0nLCBnaWZ0Q29tcG9uZW50TWFwW3RoYXQuY2hvb3NlbkdpZnRdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5SZWxvYWRNYXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5EcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZ2lmdENvbXBvbmVudE1hcFtHaWZ0Lktpc3ZvbmF0XSA9ICduw6low6FueSBmYWtvY2thLCBww6FyIGhlbmdlciDDqXMgZWd5IGvDqW3DqW55JztcclxuICAgICAgICAgICAgZ2lmdENvbXBvbmVudE1hcFtHaWZ0LkhpbnRhbG9dID0gJ3Bsw7xzcyBib3LDrXTDoXMsIGZhIHRhbHAgw6lzIG55ZXJlZyc7XHJcbiAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXBbR2lmdC5TemFua29dID0gJ27DqWjDoW55IGZhIGzDqWMsIGVneSBrYXBhc3prb2TDsyDDqXMga8O2dMOpbCc7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnknKTtcclxuXHJcbiAgICAgICAgICAgIHN0b3J5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS50YXJnZXQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaGludGFsbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNob29zZW5HaWZ0ID0gR2lmdC5IaW50YWxvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlQk0oJ2hpbnRhbG92YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdraXN2b25hdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNob29zZW5HaWZ0ID0gR2lmdC5LaXN2b25hdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUJNKCdraXN2b25hJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N6YW5rbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNob29zZW5HaWZ0ID0gR2lmdC5TemFua287XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVCTSgnc3rDoW5rw7MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJtb2RlbC9NYXBNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInZpZXcvTWFwVmlldy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInZpZXcvU3RvcnlWaWV3LnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RvcnlMaW5lU2V0dGVyLnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHYW1lQWdlbnQge1xyXG4gICAgICAgIERyYXcoKTtcclxuICAgICAgICBSZWxvYWRNYXAoKTtcclxuICAgICAgICBSZXZlYWxNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3O1xyXG4gICAgICAgIHByaXZhdGUgbWFwTW9kZWw6IE1hcE1vZGVsO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0b3J5VmlldzogU3RvcnlWaWV3O1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlMaW5lU2V0dGVyOiBTdG9yeUxpbmVTZXR0ZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29tbWFuZHM6IHsgW2tleTogc3RyaW5nXTogKGFyZ3MpID0+IGFueSB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgc3RhdGUgYW5kIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIHRoaXMubWFwTW9kZWwgPSBuZXcgTWFwTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBtYXAgdmlld1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcgPSBuZXcgTWFwVmlldyh0aGlzLm1hcE1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlWaWV3ID0gbmV3IFN0b3J5VmlldygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFnZW50OklHYW1lQWdlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3OiAoKSA9PiB0aGlzLkRyYXcoKSxcclxuICAgICAgICAgICAgICAgIFJlbG9hZE1hcDogKCkgPT4gdGhpcy5tYXBNb2RlbC5SZWxvYWRNYXAuY2FsbCh0aGlzLm1hcE1vZGVsKSxcclxuICAgICAgICAgICAgICAgIFJldmVhbE1hcDogKCkgPT4gdGhpcy5SZXZlYWxNYXAoKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUxpbmVTZXR0ZXIgPSBuZXcgU3RvcnlMaW5lU2V0dGVyKGFnZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoJ21vdmUnLCB0aGlzLm1vdmVDb21tYW5kKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXVwLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlVwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtZG93bi1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5Eb3duKTtcclxuICAgICAgICAgICAgfTsgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXJpZ2h0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtbGVmdC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kKGtleTogc3RyaW5nLCBjb21tYW5kOiAoYXJncykgPT4gYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNba2V5XSA9IGNvbW1hbmQuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Db21tYW5kKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gcGFydHNbMF07XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzLnNwbGljZSgxLCBwYXJ0cy5sZW5ndGggLSAxKSA6IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kc1tjb21tYW5kXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlQ29tbWFuZChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5tYXBNb2RlbC5QbGF5ZXIuSXNJblN0b3J5KVxyXG4gICAgICAgICAgICAvLyAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tYXBNb2RlbC5UaWxlc1t0aGlzLm1hcE1vZGVsLlBsYXllci5YXVt0aGlzLm1hcE1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaWxlLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgPT0gLTEpIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJlIG5lbSBtZWhldHN6JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLm1hcE1vZGVsLk1vdmVQbGF5ZXIoZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5NZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RvcnkgPSB0aGlzLm1hcE1vZGVsLkdldEN1cnJlbnRTdG9yeSgpO1xyXG4gICAgICAgICAgICB0aGlzLkRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlMaW5lU2V0dGVyLlVwZGF0ZUJ5KHN0b3J5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRHJhdygpe1xyXG4gICAgICAgICAgICB2YXIgc3RvcnkgPSB0aGlzLm1hcE1vZGVsLkdldEN1cnJlbnRTdG9yeSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Vmlldy5EcmF3KHN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRyYXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV2ZWFsTWFwKCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwTW9kZWwuUmV2ZWFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkdhbWUudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gIHZhciBnYW1lID0gbmV3IENtMmsxNS5HYW1lKCk7XHJcbn1cclxuICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXI6IFBsYXllck1vZGVsO1xyXG4gICAgICAgIHB1YmxpYyBUaWxlczogVGlsZU1vZGVsW11bXTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
