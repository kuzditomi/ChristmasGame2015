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
        'bm_chosen': new Cm2k15.StoryModel('bm_chosen', 'Á szóval a {0}t választottad! Nézzük csak hogy tudod elkészíteni...<br/>' +
            '<ul><li>Kell majd bele {1} a raktár szobából,</li><li>az ügyes manók a műhelyben összeszerelik neked,</li><li> a festő szobában megkapja a színeit,</li><li> és végül ellátjuk a karácsony szellemével&trade;.</li></ul>'),
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
    })(GiftState || (GiftState = {}));
    var StoryLineSetter = (function () {
        function StoryLineSetter(gameAgent) {
            this.gameAgent = gameAgent;
            this.giftState = GiftState.None;
        }
        StoryLineSetter.prototype.UpdateBy = function (story) {
            if (!story)
                return;
            switch (story.Id) {
                case 'tm':
                    Cm2k15.canMoveOnBarnMap[1][0] += 'u';
                    break;
                case 'bm':
                    if (this.giftState == GiftState.None)
                        this.subscribeToGifts();
                    else if (this.giftState == GiftState.Component)
                        Cm2k15.canMoveOnFactoryMap[2][1] = 'r';
                    break;
                case 'bl':
                    this.giftState = GiftState.Component;
                    break;
                default:
                    return;
            }
            this.gameAgent.ReloadMap();
            this.gameAgent.Draw();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJTdG9yeUxpbmVTZXR0ZXIudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLlJlbG9hZE1hcCIsIkNtMmsxNS5NYXBNb2RlbC5nZXREaXJlY3Rpb25zIiwiQ20yazE1Lk1hcE1vZGVsLk1vdmVQbGF5ZXIiLCJDbTJrMTUuTWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5IiwiQ20yazE1Lk1hcE1vZGVsLkdlbmVyYXRlU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuVHJhbnNwb3J0IiwiQ20yazE1Lk1hcE1vZGVsLkxvYWRTdGF0ZSIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrU3Vycm91bmRWaXNpdGVkIiwiQ20yazE1Lk1hcE1vZGVsLk1hcmtWaXNpdGllZCIsIkNtMmsxNS5NYXBNb2RlbC5jbG9uZSIsIkNtMmsxNS5UaWxlVmlldyIsIkNtMmsxNS5UaWxlVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlVmlldy5pbml0aWFsaXplIiwiQ20yazE1LlRpbGVWaWV3LkRpc3BsYXkiLCJDbTJrMTUuTWFwVmlldyIsIkNtMmsxNS5NYXBWaWV3LmNvbnN0cnVjdG9yIiwiQ20yazE1Lk1hcFZpZXcuRHJhdyIsIkNtMmsxNS5TdG9yeVZpZXciLCJDbTJrMTUuU3RvcnlWaWV3LmNvbnN0cnVjdG9yIiwiQ20yazE1LlN0b3J5Vmlldy5EcmF3IiwiQ20yazE1LkdpZnQiLCJDbTJrMTUuR2lmdFN0YXRlIiwiQ20yazE1LlN0b3J5TGluZVNldHRlciIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuY29uc3RydWN0b3IiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLlVwZGF0ZUJ5IiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5zdWJzY3JpYmVUb0dpZnRzIiwiQ20yazE1LkdhbWUiLCJDbTJrMTUuR2FtZS5jb25zdHJ1Y3RvciIsIkNtMmsxNS5HYW1lLnJlZ2lzdGVyQ29tbWFuZHMiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmQiLCJDbTJrMTUuR2FtZS5vbkNvbW1hbmQiLCJDbTJrMTUuR2FtZS5tb3ZlQ29tbWFuZCIsIkNtMmsxNS5HYW1lLkRyYXciLCJDbTJrMTUuU3RhdGVNb2RlbCIsIkNtMmsxNS5TdGF0ZU1vZGVsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FPWjtBQVBELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDRkEsaUJBQVVBLEdBQUdBO1FBQ3RCQSxFQUFFQSxFQUFFQSxJQUFJQTtRQUNSQSxLQUFLQSxFQUFFQSxPQUFPQTtRQUNkQSxJQUFJQSxFQUFFQSxNQUFNQTtRQUNaQSxJQUFJQSxFQUFFQSxNQUFNQTtLQUNiQSxDQUFDQTtBQUNKQSxDQUFDQSxFQVBNLE1BQU0sS0FBTixNQUFNLFFBT1o7QUNQRCx5Q0FBeUM7QUFFekMsSUFBTyxNQUFNLENBMkJaO0FBM0JELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFPSUMsbUJBQVlBLFFBQWdCQTtZQUN4QkMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRU1ELDRDQUF3QkEsR0FBL0JBLFVBQWdDQSxTQUFpQkE7WUFDN0NFLElBQUlBLGVBQWVBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLENBQUNBLElBQUlBLE9BQUFBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLEVBQXBCQSxDQUFvQkEsQ0FBQ0EsQ0FBQ0E7WUFDcEZBLEVBQUVBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2RkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLENBQUNBO1FBRU1GLDZDQUF5QkEsR0FBaENBLFVBQWlDQSxVQUFvQkE7WUFDakRHLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFVBQVVBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqREEsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFDTEgsZ0JBQUNBO0lBQURBLENBekJBRCxBQXlCQ0MsSUFBQUQ7SUF6QllBLGdCQUFTQSxZQXlCckJBLENBQUFBO0FBQ0xBLENBQUNBLEVBM0JNLE1BQU0sS0FBTixNQUFNLFFBMkJaO0FDN0JELElBQU8sTUFBTSxDQStDWjtBQS9DRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ1hBO1FBQUFLO1FBR0FDLENBQUNBO1FBQURELHVCQUFDQTtJQUFEQSxDQUhBTCxBQUdDSyxJQUFBTDtJQUhZQSx1QkFBZ0JBLG1CQUc1QkEsQ0FBQUE7SUFFREE7UUFLSU8scUJBQW1CQSxNQUEwQkE7WUFBMUJDLHNCQUEwQkEsR0FBMUJBLGFBQTBCQTtZQUN6Q0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1JBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUN0Q0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFTUQsMEJBQUlBLEdBQVhBLFVBQVlBLFNBQWlCQTtZQUN6QkUsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUNwQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFdkJBLE1BQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQkEsS0FBS0EsaUJBQVVBLENBQUNBLEVBQUVBO29CQUNkQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDVEEsS0FBS0EsQ0FBQ0E7Z0JBQ1ZBLEtBQUtBLGlCQUFVQSxDQUFDQSxJQUFJQTtvQkFDaEJBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO29CQUNUQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsaUJBQVVBLENBQUNBLElBQUlBO29CQUNoQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ1RBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxpQkFBVUEsQ0FBQ0EsS0FBS0E7b0JBQ2pCQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDVEEsS0FBS0EsQ0FBQ0E7Z0JBQ1ZBO29CQUNJQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDdkJBLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLGFBQWFBLENBQUNBO29CQUMvQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDdEJBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO1lBQ3RCQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxpQkFBaUJBLEdBQUdBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3JEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNsQkEsQ0FBQ0E7UUFDTEYsa0JBQUNBO0lBQURBLENBeENBUCxBQXdDQ08sSUFBQVA7SUF4Q1lBLGtCQUFXQSxjQXdDdkJBLENBQUFBO0FBQ0xBLENBQUNBLEVBL0NNLE1BQU0sS0FBTixNQUFNLFFBK0NaO0FDL0NELElBQU8sTUFBTSxDQVVaO0FBVkQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYQTtRQUlJVSxvQkFBWUEsRUFBVUEsRUFBRUEsS0FBYUE7WUFDakNDLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2JBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUNMRCxpQkFBQ0E7SUFBREEsQ0FSQVYsQUFRQ1UsSUFBQVY7SUFSWUEsaUJBQVVBLGFBUXRCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQVZNLE1BQU0sS0FBTixNQUFNLFFBVVo7QUNWRCxJQUFPLE1BQU0sQ0FpSFo7QUFqSEQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQW1CQUEsa0JBQVdBLEdBQWFBLEVBQUVBLENBQUNBO0lBRXRDQSxjQUFPQSxHQUFHQTtRQUNOQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDaEZBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ3BGQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDN0VBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ3ZFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDNUVBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzlFQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNyRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDMUVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzNFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7SUFDRkEsbUJBQVlBLEdBQUdBO1FBQ1hBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3BEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN6RUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekRBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdkRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3REQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUMzREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDckRBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO0tBQ3hEQSxDQUFDQTtJQUVGQSxpQkFBVUEsR0FBR0E7UUFDVEEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDbkJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0lBRUZBLDBCQUFtQkEsR0FBR0E7UUFDbEJBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ1pBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ2xCQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNkQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUNoQkEsQ0FBQ0E7SUFFRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFDQSxPQUFPQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUxRkEsaUJBQVVBLEdBQUdBO1FBQ1RBLENBQUNBLEdBQUdBLEVBQUVBLFFBQVFBLENBQUNBO1FBQ2ZBLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLENBQUNBO0tBQ2xCQSxDQUFDQTtJQUNGQSwwQkFBbUJBLEdBQUdBO1FBQ2xCQSxDQUFDQSxJQUFJ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Q0FBQ0EsQ0FBQ0E7WUFDdkNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXJDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNqQkEsQ0FBQ0E7UUFFT1AsNEJBQVNBLEdBQWpCQSxVQUFrQkEsU0FBU0E7WUFDdkJRLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO1lBRWpDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkJBLElBQUlBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO2dCQUNqQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLEVBQUVBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUNqREEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDN0JBLENBQUNBO1lBRURBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUM1Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JB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QUlBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO0FBQy9CQSxDQUFDQSxFQUZNLE1BQU0sS0FBTixNQUFNLFFBRVo7QUNIRCxJQUFPLE1BQU0sQ0FLWjtBQUxELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFBQWdEO1FBR0FDLENBQUNBO1FBQURELGlCQUFDQTtJQUFEQSxDQUhBaEQsQUFHQ2dELElBQUFoRDtJQUhZQSxpQkFBVUEsYUFHdEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBTE0sTUFBTSxLQUFOLE1BQU0sUUFLWiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICBVcDogJ3VwJyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgRG93bjogJ2Rvd24nLFxyXG4gICAgTGVmdDogJ2xlZnQnXHJcbiAgfTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbGVNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElzVmlzaXRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgSXNQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFR5cGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgQWxsb3dlZE1vdmVzOiBzdHJpbmdbXTtcclxuICAgICAgICBwdWJsaWMgU3Rvcnk6IFN0b3J5TW9kZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbGVUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc1Zpc2l0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Jc1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0aWxlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblZhbHVlcyA9IE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5tYXAoayA9PiBDbTJrMTUuZGlyZWN0aW9uc1trXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WYWx1ZXMuaW5kZXhPZihkaXJlY3Rpb24pICE9IC0xICYmIHRoaXMuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsb3dlZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKGRpcmVjdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb24oZGlyZWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgU3VjY2VzczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgWTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBJc0luU3Rvcnk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllck1vZGVsID0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gcGxheWVyLlg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlkgPSBwbGF5ZXIuWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXNJblN0b3J5ID0gcGxheWVyLklzSW5TdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIDogUGxheWVyTW92ZVJlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGxheWVyTW92ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuU3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5VcDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5Eb3duOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSAnTW92ZSB3aGVyZT8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0Lk1lc3NhZ2UgPSBcIllvdSBoYXZlIG1vdmVkIFwiICsgZGlyZWN0aW9uICsgXCIuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBzdG9yeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5TdG9yeSA9IHN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWFwVHJhbnNwb3J0IHtcclxuICAgICAgICBtYXA6IHN0cmluZ1tdW107XHJcbiAgICAgICAgbW92ZW1lbnRzOiBzdHJpbmdbXVtdO1xyXG4gICAgICAgIHRpbGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdmFyIGdhbWVtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGZhY3RvcnltYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIHZpbGxhZ2VtYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGJhcm5tYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBjYW5Nb3ZlT25NYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkZhY3RvcnlNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPblZpbGxhZ2VNYXA6IHN0cmluZ1tdW107XHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbkJhcm5NYXA6IHN0cmluZ1tdW107XHJcblxyXG4gICAgZXhwb3J0IHZhciBtYXBUcmFuc3BvcnRzOiB7IFtrZXk6IHN0cmluZ106IElNYXBUcmFuc3BvcnQgfTtcclxuICAgIGV4cG9ydCB2YXIgaWdub3JlVGlsZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgZ2FtZW1hcCA9IFtcclxuICAgICAgICBbJy0nLCAnLScsICctJywgJy0nLCAnLScsICdlMScsICdlMicsICdlMycsICdlNCcsICdlNScsICdlNicsICdlNycsICdlOCddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2U5JywgJ2UxMCcsICdlMTEnLCAnZTEyJywgJ2UxMycsICdlMTQnLCAnZTE1JywgJ2UxNiddLFxyXG4gICAgICAgIFsnLScsICdtMScsICdtMicsICdtMycsICctJywgJ2UxNycsICdlMTcnLCAnZTE5JywgJ2UyMCcsICdlMjEnLCAnZTIyJywgJ2UyMycsICdlMjQnXSxcclxuICAgICAgICBbJy0nLCAnbTQnLCAnbTUnLCAnbTYnLCAnLScsICctJywgJy0nLCAnLScsICd1NScsICctJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ203JywgJ204JywgJ3UxdicsICd1MScsICd1MScsICd1MicsICd1MScsICd1MycsICd1MScsICd1MScsICd1NCcsICctJ10sXHJcbiAgICAgICAgWyctJywgJ3U1dicsICctJywgJy0nLCAnLScsICctJywgJ3U1ZycsICctJywgJy0nLCAnLScsICctJywgJ2gxJywgJ2gyJ10sXHJcbiAgICAgICAgWyctJywgJ3U1JywgJy0nLCAnLScsICdnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICctJywgJy0nLCAnaDMnLCAnaDQnXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2c2JywgJ2c3JywgJ2c4JywgJ2c5JywgJ2cxMCcsICdrNCcsICdrMScsICdrMScsICdrMSddLFxyXG4gICAgICAgIFsnLScsICd1NWInLCAnLScsICctJywgJ2cxMScsICdnMTInLCAnZzEzJywgJ2cxNCcsICdnMTUnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTEnLCAnaTInLCAnLScsICctJywgJy0nLCAnbCcsICctJywgJ2YxJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJ2kzJywgJ2k0JywgJ2k1JywgJ3UxYicsICd1MScsICd1NicsICctJywgJ2YyJywgJ2syJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWydrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrMScsICdrYicsICdrMScsICdrMScsICdrMycsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJywgJy0nLCAnLSddXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uTWFwID0gW1xyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJ3InLCAnbHInLCAnbHInLCAnbHInLCAnbHJkJywgJ3JsJywgJ3VscicsICdybCcsICdybCcsICdkbCcsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ3UnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICd1ZCcsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJ2QnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJ2R1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICdyJywgJ2xyJywgJ2xyJywgJ3VsJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICBdO1xyXG5cclxuICAgIGZhY3RvcnltYXAgPSBbXHJcbiAgICAgICAgWyctJywgJ3RleGl0JywgJy0nXSxcclxuICAgICAgICBbJ3RsJywgJ3RtJywgJ3RyJ10sXHJcbiAgICAgICAgWydibCcsICdibScsICdiciddLFxyXG4gICAgICAgIFsnLScsICdiZXhpdCcsICctJ11cclxuICAgIF07XHJcblxyXG4gICAgY2FuTW92ZU9uRmFjdG9yeU1hcCA9IFtcclxuICAgICAgICBbJycsICcnLCAnJ10sXHJcbiAgICAgICAgWydyJywgJ3VkbHInLCAnbCddLFxyXG4gICAgICAgIFsncicsICcnLCAnbCddLFxyXG4gICAgICAgIFsnJywgJ3UnLCAnJ11cclxuICAgIF07XHJcblxyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWyd0ZXhpdCcsJ2JleGl0JywndGwnLCd0bScsJ3RyJywnYmwnLCdibScsJ2JyJywnYmV4aXQnXSk7XHJcblxyXG4gICAgdmlsbGFnZW1hcCA9IFtcclxuICAgICAgICBbXCJtXCIsIFwicmV4aXR2XCJdLFxyXG4gICAgICAgIFtcImJleGl0dlwiLCBcIi1cIl0sXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uVmlsbGFnZU1hcCA9IFtcclxuICAgICAgICBbJ2RyJywnJ10sXHJcbiAgICAgICAgWycnLCcnXVxyXG4gICAgXTtcclxuICAgIGlnbm9yZVRpbGVzID0gaWdub3JlVGlsZXMuY29uY2F0KFsnbScsJ3JleGl0dicsJ2JleGl0diddKTtcclxuXHJcbiAgICBiYXJubWFwID0gW1xyXG4gICAgICAgIFtcInRleGl0YlwiLCBcIi1cIl0sXHJcbiAgICAgICAgW1wiYlwiLCBcInJleGl0YlwiXSxcclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25CYXJuTWFwID0gW1xyXG4gICAgICAgIFsnJywnJ10sXHJcbiAgICAgICAgWydyJywnJ11cclxuICAgIF07XHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ2InLCd0ZXhpdGInLCdyZXhpdGInXSk7XHJcblxyXG4gICAgbWFwVHJhbnNwb3J0cyA9IHtcclxuICAgICAgICAvLyBtYXAgPT4gZmFjdG9yeW1hcFxyXG4gICAgICAgICdnMTMnOiB7IG1hcDogZmFjdG9yeW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25GYWN0b3J5TWFwICwgdGlsZTogJ2JleGl0JyB9LFxyXG4gICAgICAgICdnMyc6IHsgbWFwOiBmYWN0b3J5bWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkZhY3RvcnlNYXAgLCB0aWxlOiAndG0nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiB2aWxsYWdlbWFwXHJcbiAgICAgICAgJ204JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcbiAgICAgICAgJ203JzogeyBtYXA6IHZpbGxhZ2VtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uVmlsbGFnZU1hcCwgdGlsZTogJ20nIH0sXHJcblxyXG4gICAgICAgIC8vIG1hcCA9PiBiYXJubWFwXHJcbiAgICAgICAgJ2kxJzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcbiAgICAgICAgJ2k1JzogeyBtYXA6IGJhcm5tYXAsIG1vdmVtZW50czogY2FuTW92ZU9uQmFybk1hcCwgdGlsZTogJ2InIH0sXHJcblxyXG4gICAgICAgIC8vIGZhY3RvcnltYXAgPT4gbWFwXHJcbiAgICAgICAgJ2JleGl0JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAnbCcgfSxcclxuICAgICAgICAndGV4aXQnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NWcnIH0sXHJcblxyXG4gICAgICAgIC8vIHZpbGxhZ2VtYXAgPT4gbWFwXHJcbiAgICAgICAgJ3JleGl0dic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3UxdicgfSxcclxuICAgICAgICAnYmV4aXR2JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTV2JyB9LFxyXG5cclxuICAgICAgICAvLyBiYXJubWFwID0+IG1hcFxyXG4gICAgICAgICdyZXhpdGInOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1MWInIH0sXHJcbiAgICAgICAgJ3RleGl0Yic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1YicgfSxcclxuICAgIH07XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCB2YXIgc3Rvcmllc1RpbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IFN0b3J5TW9kZWwgfTtcclxuICAgIGV4cG9ydCB2YXIgdHdvU3RhdGVTdG9yZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIHN0b3JpZXNUaWxlTWFwcGluZyA9IHtcclxuICAgICAgICAna2InOiBuZXcgU3RvcnlNb2RlbCgna2InLFxyXG4gICAgICAgICAgICAnw5xkdiBhIGrDoXTDqWtiYW4uIE55ZXJ0w6lsIGVneSBqZWd5ZXQgYSBNaWt1bMOhc2d5w6FyYmEsIHRhbMOhbGtvemhhdHN6IHNvayB2YXLDoXpzbGF0dGFsLCDDqXMgaGEgasOzIHZvbHTDoWwsIG3DqWcgYWrDoW5kw6lrb3QgaXMga2FwaGF0c3ouJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2InOiBuZXcgU3RvcnlNb2RlbCgnaTUnLFxyXG4gICAgICAgICAgICAnRXogYXogaXN0w6FsbMOzLCBpbm5lbiBpbmR1bCDDqXMgw6lya2V6aWsgYSB0w6lsYXDDsy4gQSBtYW7Ds2sgw6lwcCB0YWthcsOtdGFuYWssIHRhbmtvbG5haywgcG9sw61yb3p6w6FrIFJ1ZG9sZiBvcnLDoXQuIMOccmVzbmVrIHRhbMOhbG9kLCBtw6lnIG5lbSDDqXJrZXpldHQgZWwgYXogaWTFkSBheiBpbmR1bMOhc3JhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdCc6IG5ldyBTdG9yeU1vZGVsKCdiZXhpdCcsXHJcbiAgICAgICAgICAgICdTemlhISBNZWd0YWzDoWx0YWQgYSBNaWt1bMOhcyBnecOhcsOhdCwgw6luIGxlc3playBhIGthbGF1em9kLiBBbWVkZGlnIE1pa3Vsw6FzIGvDqXN6w7xsxZFkaWssIG1lZ2lzbWVyaGV0ZWQgYSBtxbFoZWx5w6l0LCBzxZF0IGtpIGlzIHByw7Niw6FsaGF0b2QhIEd5ZXJlIGJlbGplYmIsIG1lZ211dGF0b20hJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtJzogbmV3IFN0b3J5TW9kZWwoJ2JtJyxcclxuICAgICAgICAgICAgJ0jDoXQgw61tZS4gQmFscmEgdGFsw6Fsb2QgYSByYWt0w6FyYXQsIGpvYmJyYSBhIG3FsWhlbHl0LCBhIGvDtnZldGtlesWRIGZvbHlvc8OzbiBwZWRpZyBtZWd0YWzDoWxvZCBhIGZlc3TFkXN6b2LDoXQuIMOJcyBob2d5IG1pdCByZWp0IGEgbmVneWVkaWsgYWp0w7M/IEVneSBraXMgdmFyw6F6c2xhVC4uLiBNaXZlbCBpbHllbiBqw7Mgdm9sdMOhbCBpZMOpbiDigJMgbW9uZGphIGEgbWFuw7Mgw6lzIGVsZm9yZHVsIMOhdGphdsOtdGFuaSBhIHN0YXRpc3p0aWvDoWQgLSwgdsOhbGFzenRoYXRzeiBlZ3kgYWrDoW5kw6lrb3QgYSBNaWt1bMOhc2d5w6FyYsOzbDonICtcclxuICAgICAgICAgICAgJzx1bD48bGkgY2xhc3M9XCJhamFuZGVrXCIgaWQ9XCJzemFua29cIj5TesOhbmvDszwvbGk+PGxpIGNsYXNzPVwiYWphbmRla1wiIGlkPVwiaGludGFsb1wiPkhpbnRhbMOzPC9saT48bGkgY2xhc3M9XCJhamFuZGVrXCIgaWQ9XCJraXN2b25hdFwiPktpc3ZvbmF0PC9saT48L3VsPidcclxuICAgICAgICApLFxyXG4gICAgICAgICdibV9jaG9zZW4nOiBuZXcgU3RvcnlNb2RlbCgnYm1fY2hvc2VuJyxcclxuICAgICAgICAgICAgJ8OBIHN6w7N2YWwgYSB7MH10IHbDoWxhc3p0b3R0YWQhIE7DqXp6w7xrIGNzYWsgaG9neSB0dWRvZCBlbGvDqXN6w610ZW5pLi4uPGJyLz4nICtcclxuICAgICAgICAgICAgJzx1bD48bGk+S2VsbCBtYWpkIGJlbGUgezF9IGEgcmFrdMOhciBzem9iw6Fiw7NsLDwvbGk+PGxpPmF6IMO8Z3llcyBtYW7Ds2sgYSBtxbFoZWx5YmVuIMO2c3N6ZXN6ZXJlbGlrIG5la2VkLDwvbGk+PGxpPiBhIGZlc3TFkSBzem9iw6FiYW4gbWVna2FwamEgYSBzesOtbmVpdCw8L2xpPjxsaT4gw6lzIHbDqWfDvGwgZWxsw6F0anVrIGEga2Fyw6Fjc29ueSBzemVsbGVtw6l2ZWwmdHJhZGU7LjwvbGk+PC91bD4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm0yJzogbmV3IFN0b3J5TW9kZWwoJ2JtJyxcclxuICAgICAgICAgICAgJ8OcZHYgw7pqcmEgYSBnecOhcmJhbidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdDInOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQyJyxcclxuICAgICAgICAgICAgJ0V6IGEgYmVqw6FyYXQgYSBnecOhcmJhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bCc6IG5ldyBTdG9yeU1vZGVsKCd0bCcsXHJcbiAgICAgICAgICAgICdNQUdJQyEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAndG0nOiBuZXcgU3RvcnlNb2RlbCgndG0nLFxyXG4gICAgICAgICAgICAnSm9iYnJhIGZlc3RlZ2V0aGVzeiwgYmFscmEgcGVkaWcgbWluZGVuIMOpcnRlbG1ldCBueWVyLiBBeiBtZWcgYSBow6F0c8OzIGtpasOhcmF0IGF6IGVyZMWRIGZlbMOpLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0cic6IG5ldyBTdG9yeU1vZGVsKCd0cicsXHJcbiAgICAgICAgICAgICdFeiBhIGZlc3TFkXMgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JsJzogbmV3IFN0b3J5TW9kZWwoJ2JsJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHJha3TDoXIgc3pvYmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JyJzogbmV3IFN0b3J5TW9kZWwoJ2JyJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBhIHN6ZXJlbMWRcyBzem9iYS4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnbSc6IG5ldyBTdG9yeU1vZGVsKCdtJyxcclxuICAgICAgICAgICAgJ01hbsOzIGZhbHZhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2UyMCc6IG5ldyBTdG9yeU1vZGVsKCdlMjAnLFxyXG4gICAgICAgICAgICAnRXJkZcWRJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2gxJzogbmV3IFN0b3J5TW9kZWwoJ2gxJyxcclxuICAgICAgICAgICAgJ1RhdmFjc2thJ1xyXG4gICAgICAgICksXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0d29TdGF0ZVN0b3JlcyA9IFtcImJleGl0XCIsIFwiYm1cIl07XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGxheWVyTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeU1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTW92ZURpcmVjdGlvbnMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL21hcHMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhL3N0b3JpZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIFRpbGVzOlRpbGVNb2RlbFtdW107XHJcbiAgICAgICAgcHVibGljIFBsYXllcjpQbGF5ZXJNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIFdpZHRoOm51bWJlcjtcclxuICAgICAgICBwdWJsaWMgSGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUJhY2t1cDogU3RhdGVNb2RlbDtcclxuICAgICAgICBwcml2YXRlIHZpc2l0ZWRTdG9yaWVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1hcChnYW1lbWFwLCBjYW5Nb3ZlT25NYXApO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IDY7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSAxMjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgdGhpcy52aXNpdGVkU3RvcmllcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0bWFwO1xyXG4gICAgICAgIHByaXZhdGUgbGFzdG1vdmVtZW50cztcclxuICAgICAgICBwcml2YXRlIGxvYWRNYXAobWFwOnN0cmluZ1tdW10sIG1vdmVtZW50czpzdHJpbmdbXVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdG1hcCA9IG1hcDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0bW92ZW1lbnRzID0gbW92ZW1lbnRzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5XaWR0aCA9IG1hcC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuSGVpZ2h0ID0gbWFwWzBdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVGlsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5IZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLldpZHRoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IG5ldyBUaWxlTW9kZWwobWFwW2pdW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zKHRoaXMuZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHMsIGosIGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nW3RpbGUuVHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbaV1bal0gPSB0aWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVsb2FkTWFwKCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1hcCh0aGlzLmxhc3RtYXAsIHRoaXMubGFzdG1vdmVtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVtZW50TWFwID0ge1xyXG4gICAgICAgICAgICAndSc6IENtMmsxNS5kaXJlY3Rpb25zLlVwLFxyXG4gICAgICAgICAgICAnZCc6IENtMmsxNS5kaXJlY3Rpb25zLkRvd24sXHJcbiAgICAgICAgICAgICdsJzogQ20yazE1LmRpcmVjdGlvbnMuTGVmdCxcclxuICAgICAgICAgICAgJ3InOiBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGlyZWN0aW9ucyhtb3ZlbWVudHM6c3RyaW5nW11bXSwgeDpudW1iZXIsIHk6bnVtYmVyKTpzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlbWVudENlbGwgPSBtb3ZlbWVudHNbeF1beV07XHJcbiAgICAgICAgICAgIHJldHVybiBtb3ZlbWVudENlbGwuc3BsaXQoJycpLm1hcChkID0+IHRoaXMubW92ZW1lbnRNYXBbZF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVQbGF5ZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuUGxheWVyLk1vdmUoZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtTdXJyb3VuZFZpc2l0ZWQodGhpcy5QbGF5ZXIuWCwgdGhpcy5QbGF5ZXIuWSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICB0aWxlLklzVmlzaXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IG1hcFRyYW5zcG9ydHNbdGlsZS5UeXBlXTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRyYW5zcG9ydCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5TdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlN0b3J5LklkKycyJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLklzSW5TdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHdvU3RhdGVTdG9yZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSAhPSAtMSAmJiB0aGlzLnZpc2l0ZWRTdG9yaWVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZFN0b3JpZXMucHVzaCh0aWxlLlN0b3J5LklkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR2V0Q3VycmVudFN0b3J5KCk6U3RvcnlNb2RlbCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRpbGVzW3RoaXMuUGxheWVyLlhdW3RoaXMuUGxheWVyLlldLlN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBHZW5lcmF0ZVN0YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGVNb2RlbCgpO1xyXG4gICAgICAgICAgICBzdGF0ZS5QbGF5ZXIgPSB0aGlzLmNsb25lKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgc3RhdGUuVGlsZXMgPSB0aGlzLmNsb25lKHRoaXMuVGlsZXMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUcmFuc3BvcnQodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuR2VuZXJhdGVTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVCYWNrdXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlQmFja3VwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2FkU3RhdGUocHJldlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTWFwKHRyYW5zcG9ydC5tYXAsIHRyYW5zcG9ydC5tb3ZlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cCA9IHN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zcG9ydC5tYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdHJhbnNwb3J0Lm1hcFtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQubWFwW2ldW2pdID09IHRyYW5zcG9ydC50aWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlggPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5ZID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZFN0YXRlKHN0YXRlOiBTdGF0ZU1vZGVsKXtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyTW9kZWwoc3RhdGUuUGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IHN0YXRlLlRpbGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXJrU3Vycm91bmRWaXNpdGVkKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5KTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4ICsgMSwgeSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5IC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5IC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5IC0gMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4LCB5ICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggLSAxLCB5ICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE1hcmtWaXNpdGllZCh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGlsZXNbeF0gJiYgdGhpcy5UaWxlc1t4XVt5XSlcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlsZXNbeF1beV0uSXNWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvbmUob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGU7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG9iaiwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShvbGRTdGF0ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vZGVsL1RpbGVNb2RlbC50c1wiLz5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGlsZVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlciwgZWxlbWVudDogSFRNTERpdkVsZW1lbnQsIG1vZGVsOiBUaWxlTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShyb3csIGNvbCwgc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemUocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IHJvdyAqIHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGNvbCAqIHNpemUgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAndGlsZSc7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcHVibGljIERpc3BsYXkobW9kZWw6IFRpbGVNb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsndGlsZSddO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGVsLklzVmlzaXRlZCAmJiBDbTJrMTUuaWdub3JlVGlsZXMuaW5kZXhPZihtb2RlbC5UeXBlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidGlsZS1cIiArIG1vZGVsLlR5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdkYXJrJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5Jc1BsYXllcikge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRpbGVWaWV3LnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwVmlldyB7XHJcbiAgICAgICAgLy8gY29uc3RhbnRzXHJcbiAgICAgICAgdGlsZUNvdW50ID0gMTM7XHJcblxyXG4gICAgICAgIC8vIHZpZXdzXHJcbiAgICAgICAgdGlsZXM6IFRpbGVWaWV3W11bXTtcclxuXHJcbiAgICAgICAgLy8gbW9kZWxcclxuICAgICAgICBtb2RlbDogTWFwTW9kZWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihtb2RlbDogTWFwTW9kZWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWVtYXAgY29uc3RydWN0b3InKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXBFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgZ2FtZSBzdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGlsZSB2aWV3cyBcclxuICAgICAgICAgICAgdmFyIG1hcFdpZHRoID0gbWFwRWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgdmFyIHRpbGVTaXplID0gbWFwV2lkdGggLyB0aGlzLnRpbGVDb3VudDtcclxuICAgICAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGlsZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMucHVzaChbXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudGlsZUNvdW50OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbaV1bal0gPSBuZXcgVGlsZVZpZXcoaSwgaiwgdGlsZVNpemUsIGVsZW1lbnQsIHRoaXMubW9kZWwuVGlsZXNbal1baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KCkge1xyXG4gICAgICAgICAgICAvLyBzY3JvbGxpbmcgbWVjaGFuaXNtXHJcbiAgICAgICAgICAgIC8vdmFyIG1pZGRsZSA9IE1hdGguZmxvb3IodGhpcy50aWxlQ291bnQgLyAyKTtcclxuICAgICAgICAgICAgLy92YXIgbGVmdCA9IHRoaXMubW9kZWwuUGxheWVyLlggPCAobWlkZGxlKSA/IDBcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWCA+ICh0aGlzLm1vZGVsLldpZHRoIC0gMSAtIG1pZGRsZSkgPyB0aGlzLm1vZGVsLldpZHRoIC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gICAgOiB0aGlzLm1vZGVsLlBsYXllci5YIC0gbWlkZGxlO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdG9wID0gdGhpcy5tb2RlbC5QbGF5ZXIuWSA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5ZID4gKHRoaXMubW9kZWwuSGVpZ2h0IC0gMSAtIG1pZGRsZSkgPyB0aGlzLm1vZGVsLkhlaWdodCAtIHRoaXMudGlsZUNvdW50XHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kZWwuVGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5tb2RlbC5UaWxlc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy50aWxlc1tqXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5QbGF5ZXIuWCA9PSBpICYmIHRoaXMubW9kZWwuUGxheWVyLlkgPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLlRpbGVzW2ldW2pdLklzUGxheWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLlRpbGVzW2ldW2pdLklzUGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aWxlLkRpc3BsYXkodGhpcy5tb2RlbC5UaWxlc1tpXVtqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGlsZSA9IHRoaXMubW9kZWwuVGlsZXNbdGhpcy5tb2RlbC5QbGF5ZXIuWF1bdGhpcy5tb2RlbC5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3VycmVudFRpbGUpO1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhDbTJrMTUuZGlyZWN0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IENtMmsxNS5kaXJlY3Rpb25zW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dlZCA9IGN1cnJlbnRUaWxlLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmUtXCIgKyBkaXJlY3Rpb24gKyBcIi1jb21tYW5kXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vdmVCdXR0b24uc3R5bGUuZGlzcGxheSA9IGFsbG93ZWQgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlWaWV3IHtcclxuICAgICAgICBwcml2YXRlIHN0b3J5RWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yeScpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50ID0gPEhUTUxJbWFnZUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5LWltYWdlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhdyhtb2RlbDogU3RvcnlNb2RlbCkge1xyXG4gICAgICAgICAgICBpZiAoIW1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQuaW5uZXJIVE1MID0gbW9kZWwuU3Rvcnk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUltYWdlRWxlbWVudC5zdHlsZS56SW5kZXggPSAnMic7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LmNsYXNzTmFtZSA9ICdzdG9yeS0nICsgbW9kZWwuSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZW51bSBHaWZ0e1xyXG4gICAgICAgIEtpc3ZvbmF0LFxyXG4gICAgICAgIFN6YW5rbyxcclxuICAgICAgICBIaW50YWxvXHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBHaWZ0U3RhdGV7XHJcbiAgICAgICAgTm9uZSxcclxuICAgICAgICBDb21wb25lbnQsXHJcbiAgICAgICAgQXNzZW1ibGUsXHJcbiAgICAgICAgUGFpbnQsXHJcbiAgICAgICAgTWFnaWNcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlMaW5lU2V0dGVyIHtcclxuICAgICAgICBwcml2YXRlIGdhbWVBZ2VudDogSUdhbWVBZ2VudDtcclxuICAgICAgICBwcml2YXRlIGNob29zZW5HaWZ0OiBHaWZ0O1xyXG4gICAgICAgIHByaXZhdGUgZ2lmdFN0YXRlOiBHaWZ0U3RhdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihnYW1lQWdlbnQ6SUdhbWVBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudCA9IGdhbWVBZ2VudDtcclxuICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuTm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGVCeShzdG9yeTpTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghc3RvcnkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0b3J5LklkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0bSc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uQmFybk1hcFsxXVswXSArPSAndSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdibSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9HaWZ0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLkNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsyXVsxXSA9ICdyJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JsJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LlJlbG9hZE1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5EcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN1YnNjcmliZVRvR2lmdHMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXA6e1tHaWZ0XTogc3RyaW5nfSA9IHt9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQk0gPSBnaWZ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzJdWzFdID0gJ2wnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ2JtJ10uU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbJ2JtX2Nob3NlbiddLlN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7MH0nLCBnaWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnezF9JywgZ2lmdENvbXBvbmVudE1hcFt0aGF0LmNob29zZW5HaWZ0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuUmVsb2FkTWFwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXBbR2lmdC5LaXN2b25hdF0gPSAnbsOpaMOhbnkgZmFrb2NrYSwgcMOhciBoZW5nZXIgw6lzIGVneSBrw6ltw6lueSc7XHJcbiAgICAgICAgICAgIGdpZnRDb21wb25lbnRNYXBbR2lmdC5IaW50YWxvXSA9ICdwbMO8c3MgYm9yw610w6FzLCBmYSB0YWxwIMOpcyBueWVyZWcnO1xyXG4gICAgICAgICAgICBnaWZ0Q29tcG9uZW50TWFwW0dpZnQuU3phbmtvXSA9ICduw6low6FueSBmYSBsw6ljLCBlZ3kga2FwYXN6a29kw7Mgw6lzIGvDtnTDqWwnO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcblxyXG4gICAgICAgICAgICBzdG9yeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2hpbnRhbG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VuR2lmdCA9IEdpZnQuSGludGFsbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUJNKCdoaW50YWxvdmEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2lzdm9uYXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VuR2lmdCA9IEdpZnQuS2lzdm9uYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVCTSgna2lzdm9uYScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzemFua28nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VuR2lmdCA9IEdpZnQuU3phbmtvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlQk0oJ3N6w6Fua8OzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwibW9kZWwvTWFwTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L01hcFZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWV3L1N0b3J5Vmlldy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0b3J5TGluZVNldHRlci50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2FtZUFnZW50IHtcclxuICAgICAgICBEcmF3KCk7XHJcbiAgICAgICAgUmVsb2FkTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgICAgIHByaXZhdGUgbWFwVmlldzogTWFwVmlldztcclxuICAgICAgICBwcml2YXRlIG1hcE1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeVZpZXc6IFN0b3J5VmlldztcclxuICAgICAgICBwcml2YXRlIHN0b3J5TGluZVNldHRlcjogU3RvcnlMaW5lU2V0dGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbW1hbmRzOiB7IFtrZXk6IHN0cmluZ106IChhcmdzKSA9PiBhbnkgfTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHN0YXRlIGFuZCBjb21tYW5kc1xyXG4gICAgICAgICAgICB0aGlzLm1hcE1vZGVsID0gbmV3IE1hcE1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmRzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbWFwIHZpZXdcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3ID0gbmV3IE1hcFZpZXcodGhpcy5tYXBNb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5VmlldyA9IG5ldyBTdG9yeVZpZXcoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZ2VudDpJR2FtZUFnZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgRHJhdzogKCkgPT4gdGhpcy5EcmF3KCksXHJcbiAgICAgICAgICAgICAgICBSZWxvYWRNYXA6ICgpID0+IHRoaXMubWFwTW9kZWwuUmVsb2FkTWFwLmNhbGwodGhpcy5tYXBNb2RlbClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlMaW5lU2V0dGVyID0gbmV3IFN0b3J5TGluZVNldHRlcihhZ2VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKCdtb3ZlJywgdGhpcy5tb3ZlQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS11cC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5VcCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLWRvd24tY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuRG93bik7XHJcbiAgICAgICAgICAgIH07IFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1yaWdodC1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5SaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLWxlZnQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuTGVmdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZChrZXk6IHN0cmluZywgY29tbWFuZDogKGFyZ3MpID0+IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzW2tleV0gPSBjb21tYW5kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQ29tbWFuZCh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0cy5zcGxpY2UoMSwgcGFydHMubGVuZ3RoIC0gMSkgOiBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHNbY29tbWFuZF0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZUNvbW1hbmQoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMubWFwTW9kZWwuUGxheWVyLklzSW5TdG9yeSlcclxuICAgICAgICAgICAgLy8gIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGlsZSA9IHRoaXMubWFwTW9kZWwuVGlsZXNbdGhpcy5tYXBNb2RlbC5QbGF5ZXIuWF1bdGhpcy5tYXBNb2RlbC5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGlsZS5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pID09IC0xKSBcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyZSBuZW0gbWVoZXRzeic7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5tYXBNb2RlbC5Nb3ZlUGxheWVyKGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0LlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gdGhpcy5tYXBNb2RlbC5HZXRDdXJyZW50U3RvcnkoKTtcclxuICAgICAgICAgICAgdGhpcy5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5TGluZVNldHRlci5VcGRhdGVCeShzdG9yeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIERyYXcoKXtcclxuICAgICAgICAgICAgdmFyIHN0b3J5ID0gdGhpcy5tYXBNb2RlbC5HZXRDdXJyZW50U3RvcnkoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcuRHJhdyhzdG9yeSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5EcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkdhbWUudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gIHZhciBnYW1lID0gbmV3IENtMmsxNS5HYW1lKCk7XHJcbn1cclxuICIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlTW9kZWwge1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXI6IFBsYXllck1vZGVsO1xyXG4gICAgICAgIHB1YmxpYyBUaWxlczogVGlsZU1vZGVsW11bXTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
