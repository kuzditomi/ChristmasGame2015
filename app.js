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
        ['-', '-', '-', '-', '-', '-', 's', '-', '-', '-', '-', '-', '-']
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
        's': new Cm2k15.StoryModel('s', 'Szia! Ez az idei karácsonyi játékunk, sok szeretettel és gondoskodással készítettük számodra. Ez egy kalandjáték, ahol a feladataid közé tartozik a térképen előrejutni - ezt a nyilak segítségével teheted meg, illetve különböző feladatok teljesítése. Jó szórakozást hozzá!'),
        'kb': new Cm2k15.StoryModel('kb', 'Üdv a játékban. Nyertél egy jegyet a Mikulásgyárba, találkozhatsz sok varázslattal, és ha jó voltál, még ajándékot is kaphatsz.'),
        'b': new Cm2k15.StoryModel('i5', 'Ez az istálló, innen indul és ide érkezik a télapó. A manók épp takarítanak, tankolnak, polírozzák Rudolf orrát. Üresnek találod, még nem érkezett el az idő az indulásra.'),
        'b2': new Cm2k15.StoryModel('i2', 'Épp indul Mikulás. Felszállsz?<a id="finish" class="btn">Igen</a>'),
        'bexit': new Cm2k15.StoryModel('bexit', 'Szia! Megtaláltad Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom hogyan!'),
        'bm': new Cm2k15.StoryModel('bm', 'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslatot... Mivel ilyen jó voltál idén – mondja a manó és elfordul átjavítani a statisztikád -, választhatsz egy ajándékot a Mikulásgyárból:' +
            '<div class="btn" id="szanko">Szánkó</div><div class="ajandek btn" id="hintalo">Hintaló</div><div class="ajandek btn" id="kisvonat">Kisvonat</div>'),
        'bm_chosen': new Cm2k15.StoryModel('bm_chosen', 'Á, szóval a {0}t választottad! Nézzük csak hogy tudod elkészíteni...<br/>' +
            '<ul><li>Kell majd bele {1} a raktár szobából,</li><li>az ügyes manók a műhelyben összeszerelik neked,</li><li> a festő szobában megkapja a színeit,</li><li> és végül ellátjuk a karácsony szellemével&trade;.</li></ul>'),
        'bm2': new Cm2k15.StoryModel('bm', 'A gyár előszobájában vagy. Jobbra találod a műhelyt, a festő szoba pedig a következő folyosón van.'),
        'bexit2': new Cm2k15.StoryModel('bexit2', 'Ez a bejárat a gyárba.'),
        'tl': new Cm2k15.StoryModel('tl', 'Félénken nyitsz be a szobába, de hamar rájössz, hogy itt történik a varázslat. A kívánt játékod ezzel az adalékkal elkészült! <a class="btn" id="showgift">MEGNÉZEM</a>'),
        'tl2': new Cm2k15.StoryModel('tl2', 'Szép lett! Örömmel távozol a varázslatos szobából azon tanakodva, hogy lesz-e esélyed találkozni Mikulással.'),
        'tm': new Cm2k15.StoryModel('tm', 'Jobbra festheted le az ajándékod. A bal oldali ajtó mögül mindenféle fura hangok, zajok és színes fények szűrődnek ki. Az az ajtó pedig a hátsó kijárat az erdő felé.'),
        'tm2': new Cm2k15.StoryModel('tm2', 'Nagyon szép lett a játékod, gratulálok az elkészítéséhez, több ilyen szorgos kézre lenne szükségünk! Mikulás nemsokára indul, megtalálod az istállónál, addig nyugodtan nézz körül a birtokon.'),
        'tm3': new Cm2k15.StoryModel('tm', 'A gyár hátsó folyosóján vagy.'),
        'tr': new Cm2k15.StoryModel('tr', 'Ez a festős szoba. Minden manó elfoglalt, így a festést neked kell megoldanod. Ehhez szerencsére rengeteg festéket és ecsetet hagytak a manók. Miután összepingáltad az ajándékod, hatalmas kíváncsiság tör rád az utolsó szobával kapcsolatban. Nézd meg, mi rejtőzhet az ajtó mögött!'),
        'bl': new Cm2k15.StoryModel('bl', 'Ez itt a raktár. Egy bent sertepertélő manó a segítségedre siet, a kezedbe nyomja az ajándékod elkészítéséhez szükséges alapanyagokat. Megköszönöd neki. Irány összeszerelni!'),
        'br': new Cm2k15.StoryModel('br', 'Ez itt Mikulás műhelye. Egy zöld sityakos manó épp az egyik ajándékdobozzal bohóckodik, KIVÁLÓ A HANGULAT, amikor betoppansz. Először megrémül, majd fülig érő mosollyal odarohan hozzád, kiveszi az alkatrészeket a kezedből és egy pillanat alatt összeszereli. Már csak egy kis festés hiányzik!'),
        'm': new Cm2k15.StoryModel('m', 'Ez a gyár közelében található apró falucska ad otthont a gyárban dolgozó NAGYON SZORGOS manók számára. A házuk úgy tűnhet, hogy mézeskalácsból van, de eszedbe ne jusson belekóstolni!'),
        'e20': new Cm2k15.StoryModel('e20', 'Ez a gyárhoz tartozó erdő, innen nyerik a manók az ajándékok KIVÁLÓ MINŐSÉGŰ alapanyagát.'),
        'h1': new Cm2k15.StoryModel('h1', 'Ebben a tavacskában pihennek a pingvinek, amikor épp nem kell besegíteni a manóknak, vagy épp nem beöltözőset játszanak.'),
        'credit': new Cm2k15.StoryModel('credit', 'Boldog karácsonyt kívánunk, köszi, hogy végigjátszottad az idei játékunk! <br/>Réka és Tomi')
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
            var tile = this.Tiles[this.Player.X][this.Player.Y];
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
            this.storyView = new Cm2k15.StoryView();
            this.Draw();
            var agent = {
                Draw: function () { return _this.Draw(); },
                ReloadMap: function () { return _this.mapModel.ReloadMap.call(_this.mapModel); },
                RevealMap: function () { return _this.RevealMap(); }
            };
            this.storyLineSetter = new Cm2k15.StoryLineSetter(agent);
        }
        Game.prototype.registerCommands = function () {
            var _this = this;
            var that = this;
            this.registerCommand('move', this.moveCommand);
            document.addEventListener('keyup', function (e) {
                switch (e.keyCode) {
                    case 37:
                        that.onCommand('move ' + Cm2k15.directions.Left);
                        break;
                    case 38:
                        that.onCommand('move ' + Cm2k15.directions.Up);
                        break;
                    case 39:
                        that.onCommand('move ' + Cm2k15.directions.Right);
                        break;
                    case 40:
                        that.onCommand('move ' + Cm2k15.directions.Down);
                        break;
                }
            });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL01vdmVEaXJlY3Rpb25zLnRzIiwibW9kZWwvVGlsZU1vZGVsLnRzIiwibW9kZWwvUGxheWVyTW9kZWwudHMiLCJtb2RlbC9TdG9yeU1vZGVsLnRzIiwiZGF0YS9tYXBzLnRzIiwiZGF0YS9zdG9yaWVzLnRzIiwibW9kZWwvTWFwTW9kZWwudHMiLCJ2aWV3L1RpbGVWaWV3LnRzIiwidmlldy9NYXBWaWV3LnRzIiwidmlldy9TdG9yeVZpZXcudHMiLCJTdG9yeUxpbmVTZXR0ZXIudHMiLCJHYW1lLnRzIiwiYXBwLnRzIiwibW9kZWwvU3RhdGVNb2RlbC50cyJdLCJuYW1lcyI6WyJDbTJrMTUiLCJDbTJrMTUuVGlsZU1vZGVsIiwiQ20yazE1LlRpbGVNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5UaWxlTW9kZWwuQWxsb3dNb3ZlbWVudEluRGlyZWN0aW9uIiwiQ20yazE1LlRpbGVNb2RlbC5BbGxvd01vdmVtZW50SW5EaXJlY3Rpb25zIiwiQ20yazE1LlBsYXllck1vdmVSZXN1bHQiLCJDbTJrMTUuUGxheWVyTW92ZVJlc3VsdC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbCIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5QbGF5ZXJNb2RlbC5Nb3ZlIiwiQ20yazE1LlN0b3J5TW9kZWwiLCJDbTJrMTUuU3RvcnlNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbCIsIkNtMmsxNS5NYXBNb2RlbC5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBNb2RlbC5sb2FkTWFwIiwiQ20yazE1Lk1hcE1vZGVsLlJlbG9hZE1hcCIsIkNtMmsxNS5NYXBNb2RlbC5nZXREaXJlY3Rpb25zIiwiQ20yazE1Lk1hcE1vZGVsLk1vdmVQbGF5ZXIiLCJDbTJrMTUuTWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5IiwiQ20yazE1Lk1hcE1vZGVsLlJldmVhbCIsIkNtMmsxNS5NYXBNb2RlbC5HZW5lcmF0ZVN0YXRlIiwiQ20yazE1Lk1hcE1vZGVsLlRyYW5zcG9ydCIsIkNtMmsxNS5NYXBNb2RlbC5Mb2FkU3RhdGUiLCJDbTJrMTUuTWFwTW9kZWwuTWFya1N1cnJvdW5kVmlzaXRlZCIsIkNtMmsxNS5NYXBNb2RlbC5NYXJrVmlzaXRpZWQiLCJDbTJrMTUuTWFwTW9kZWwuY2xvbmUiLCJDbTJrMTUuVGlsZVZpZXciLCJDbTJrMTUuVGlsZVZpZXcuY29uc3RydWN0b3IiLCJDbTJrMTUuVGlsZVZpZXcuaW5pdGlhbGl6ZSIsIkNtMmsxNS5UaWxlVmlldy5EaXNwbGF5IiwiQ20yazE1Lk1hcFZpZXciLCJDbTJrMTUuTWFwVmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5NYXBWaWV3LkRyYXciLCJDbTJrMTUuU3RvcnlWaWV3IiwiQ20yazE1LlN0b3J5Vmlldy5jb25zdHJ1Y3RvciIsIkNtMmsxNS5TdG9yeVZpZXcuRHJhdyIsIkNtMmsxNS5HaWZ0IiwiQ20yazE1LkdpZnRTdGF0ZSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLmNvbnN0cnVjdG9yIiwiQ20yazE1LlN0b3J5TGluZVNldHRlci5VcGRhdGVCeSIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuc3Vic2NyaWJlU2hvd0dpZnQiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLmZpbmlzaEdhbWUiLCJDbTJrMTUuU3RvcnlMaW5lU2V0dGVyLnJldmVhbE1hcCIsIkNtMmsxNS5TdG9yeUxpbmVTZXR0ZXIuc3Vic2NyaWJlVG9HaWZ0cyIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuR2FtZS5EcmF3IiwiQ20yazE1LkdhbWUuUmV2ZWFsTWFwIiwiQ20yazE1LlN0YXRlTW9kZWwiLCJDbTJrMTUuU3Rh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RUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDckVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzdFQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUN2RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDekVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBO1FBQzVFQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUM5RUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7UUFDckVBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1FBQzFFQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUMzRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7S0FDcEVBLENBQUNBO0lBQ0ZBLG1CQUFZQSxHQUFHQTtRQUNYQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDcERBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3JEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDekVBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3hEQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN2REEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUN0REEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDM0RBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1FBQ3JEQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUN4REEsQ0FBQ0E7SUFFRkEsaUJBQVVBLEdBQUdBO1FBQ1RBLENBQUNBLEdBQUdBLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLENBQUNBO1FBQ25CQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDbEJBLENBQUNBLEdBQUdBLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLENBQUNBO0tBQ3RCQSxDQUFDQTtJQUVGQSwwQkFBbUJBLEdBQUdBO1FBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNaQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNmQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNkQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQTtLQUNoQkEsQ0FBQ0E7SUFFRkEsa0JBQVdBLEdBQUdBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFDQSxPQUFPQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxJQUFJQSxFQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUxRkEsaUJBQVVBLEdBQUdBO1FBQ1RBLENBQUNBLEdBQUdBLEVBQUVBLFFBQVFBLENBQUNBO1FBQ2ZBLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLENBQUNBO0tBQ2xCQSxDQUFDQTtJQUNGQSwwQkFBbUJBLEdBQUdBO1FBQ2xCQSxDQUFDQSxJQUFJQSxFQUFDQSxFQUFFQSxDQUFDQTtRQUNUQSxDQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxDQUFDQTtLQUNWQSxDQUFDQTtJQUNGQSxrQkFBV0EsR0FBR0Esa0JBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLEVBQUNBLFFBQVFBLEVBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO0lBRTFEQSxjQUFPQSxHQUFHQTtRQUNOQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxDQUFDQTtRQUNmQSxDQUFDQSxHQUFHQSxFQUFFQSxRQUFRQSxDQUFDQTtLQUNsQkEsQ0FBQ0E7SUFDRkEsdUJBQWdCQSxHQUFHQTtRQUNmQSxDQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxDQUFDQTtRQUNQQSxDQUFDQSxHQUFHQSxFQUFDQSxFQUFFQSxDQUFDQTtLQUNYQSxDQUFDQTtJQUNGQSxrQkFBV0EsR0FBR0Esa0JBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLEVBQUNBLFFBQVFBLEVBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO0lBRTFEQSxvQkFBYUEsR0FBR0E7UUFDWkEsb0JBQW9CQTtRQUNwQkEsS0FBS0EsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsaUJBQVVBLEVBQUVBLFNBQVNBLEVBQUVBLDBCQUFtQkEsRUFBR0EsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUE7UUFDMUVBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGlCQUFVQSxFQUFFQSxTQUFTQSxFQUFFQSwwQkFBbUJBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBO1FBRXRFQSxvQkFBb0JBO1FBQ3BCQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxpQkFBVUEsRUFBRUEsU0FBU0EsRUFBRUEsMEJBQW1CQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQTtRQUNwRUEsSUFBSUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsaUJBQVVBLEVBQUVBLFNBQVNBLEVBQUVBLDBCQUFtQkEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUE7UUFFcEVBLGlCQUFpQkE7UUFDakJBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGNBQU9BLEVBQUVBLFNBQVNBLEVBQUVBLHVCQUFnQkEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUE7UUFDOURBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGNBQU9BLEVBQUVBLFNBQVNBLEVBQUVBLHVCQUFnQkEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUE7UUFFOURBLG9CQUFvQkE7UUFDcEJBLE9BQU9BLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGNBQU9BLEVBQUVBLFNBQVNBLEVBQUVBLG1CQUFZQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQTtRQUM3REEsT0FBT0EsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsY0FBT0EsRUFBRUEsU0FBU0EsRUFBRUEsbUJBQVlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBO1FBRS9EQSxvQkFBb0JBO1FBQ3BCQSxRQUFRQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxjQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSxtQkFBWUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUE7UUFDaEVBLFFBQVFBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGNBQU9BLEVBQUVBLFNBQVNBLEVBQUVBLG1CQUFZQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQTtRQUVoRUEsaUJBQWlCQTtRQUNqQkEsUUFBUUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsY0FBT0EsRUFBRUEsU0FBU0EsRUFBRUEsbUJBQVlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBO1FBQ2hFQSxRQUFRQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxjQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSxtQkFBWUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUE7S0FDbkVBLENBQUNBO0FBQ05BLENBQUNBLEVBakhNLE1BQU0sS0FBTixNQUFNLFFBaUhaO0FDakhELElBQU8sTUFBTSxDQTBFWjtBQTFFRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBSVhBLHlCQUFrQkEsR0FBR0E7UUFDakJBLEdBQUdBLEVBQUdBLElBQUlBLGlCQUFVQSxDQUFDQSxHQUFHQSxFQUNwQkEsaVJBQWlSQSxDQUNwUkE7UUFDREEsSUFBSUEsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3JCQSxpSUFBaUlBLENBQ3BJQTtRQUNEQSxHQUFHQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDcEJBLDRLQUE0S0EsQ0FDL0tBO1FBQ0RBLElBQUlBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxJQUFJQSxFQUNyQkEsbUVBQW1FQSxDQUN0RUE7UUFDREEsT0FBT0EsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLE9BQU9BLEVBQzNCQSx3S0FBd0tBLENBQzNLQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLHFTQUFxU0E7WUFDclNBLG1KQUFtSkEsQ0FDdEpBO1FBQ0RBLFdBQVdBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxXQUFXQSxFQUNuQ0EsMkVBQTJFQTtZQUMzRUEsME5BQTBOQSxDQUM3TkE7UUFDREEsS0FBS0EsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3RCQSxvR0FBb0dBLENBQ3ZHQTtRQUNEQSxRQUFRQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsUUFBUUEsRUFDN0JBLHdCQUF3QkEsQ0FDM0JBO1FBQ0RBLElBQUlBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxJQUFJQSxFQUNyQkEseUtBQXlLQSxDQUM1S0E7UUFDREEsS0FBS0EsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLEtBQUtBLEVBQ3ZCQSw4R0FBOEdBLENBQ2pIQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLHVLQUF1S0EsQ0FDMUtBO1FBQ0RBLEtBQUtBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxLQUFLQSxFQUN2QkEsZ01BQWdNQSxDQUNuTUE7UUFDREEsS0FBS0EsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3RCQSwrQkFBK0JBLENBQ2xDQTtRQUNEQSxJQUFJQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsSUFBSUEsRUFDckJBLHlSQUF5UkEsQ0FDNVJBO1FBQ0RBLElBQUlBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxJQUFJQSxFQUNyQkEsK0tBQStLQSxDQUNsTEE7UUFDREEsSUFBSUEsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3JCQSxxU0FBcVNBLENBQ3hTQTtRQUNEQSxHQUFHQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsR0FBR0EsRUFDbkJBLHdMQUF3TEEsQ0FDM0xBO1FBQ0RBLEtBQUtBLEVBQUVBLElBQUlBLGlCQUFVQSxDQUFDQSxLQUFLQSxFQUN2QkEsMkZBQTJGQSxDQUM5RkE7UUFDREEsSUFBSUEsRUFBRUEsSUFBSUEsaUJBQVVBLENBQUNBLElBQUlBLEVBQ3JCQSwwSEFBMEhBLENBQzdIQTtRQUNEQSxRQUFRQSxFQUFFQSxJQUFJQSxpQkFBVUEsQ0FBQ0EsUUFBUUEsRUFDN0JBLDZGQUE2RkEsQ0FDaEdBO0tBRUpBLENBQUNBO0lBRUZBLHFCQUFjQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUNyQ0EsQ0FBQ0EsRUExRU0sTUFBTSxLQUFOLE1BQU0sUUEwRVo7QUMxRUQsb0NBQW9DO0FBQ3BDLHNDQUFzQztBQUN0QyxxQ0FBcUM7QUFDckMseUNBQXlDO0FBQ3pDLHVDQUF1QztBQUN2QywwQ0FBMEM7QUFFMUMsSUFBTyxNQUFNLENBcUxaO0FBckxELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFVSVk7WUFtRFFDLGdCQUFXQSxHQUFHQTtnQkFDbEJBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBO2dCQUN6QkEsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUE7Z0JBQzNCQSxHQUFHQSxFQUFFQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQTtnQkFDM0JBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBO2FBQy9CQSxDQUFDQTtZQXZERUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsY0FBT0EsRUFBRUEsbUJBQVlBLENBQUNBLENBQUNBO1lBQ3BDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxrQkFBV0EsRUFBRUEsQ0FBQ0E7WUFFaENBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUVuQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFFekJBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDYkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSx5QkFBa0JBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV2REEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQzdCQSxFQUFFQSxDQUFBQSxDQUFDQSxxQkFBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQy9GQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNoREEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ2xDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUlPRCwwQkFBT0EsR0FBZkEsVUFBZ0JBLEdBQWNBLEVBQUVBLFNBQW9CQTtZQUNoREUsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLFNBQVNBLENBQUNBO1lBRS9CQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFNUJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEVBQUVBLENBQUNBO1lBRWhCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDbkNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNuQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxnQkFBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRXBDQSxJQUFJQSxDQUFDQSx5QkFBeUJBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNwRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EseUJBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFM0NBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO2dCQUM1QkEsQ0FBQ0E7WUFDTEEsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFTUYsNEJBQVNBLEdBQWhCQTtZQUNJRyxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNuREEsQ0FBQ0E7UUFTT0gsZ0NBQWFBLEdBQXJCQSxVQUFzQkEsU0FBb0JBLEVBQUVBLENBQVFBLEVBQUVBLENBQVFBO1lBQTlESSxpQkFHQ0E7WUFGR0EsSUFBSUEsWUFBWUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLENBQUNBLElBQUlBLE9BQUFBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLEVBQW5CQSxDQUFtQkEsQ0FBQ0EsQ0FBQ0E7UUFDaEVBLENBQUNBO1FBRU1KLDZCQUFVQSxHQUFqQkEsVUFBa0JBLFNBQVNBO1lBQ3ZCSyxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUUzQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2REEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFFdEJBLElBQUlBLFNBQVNBLEdBQUdBLG9CQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDekNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO29CQUNaQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtvQkFDMUJBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNoREEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDM0RBLENBQUNBO2dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDYkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSx5QkFBa0JBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUV2REEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBQzdCQSxFQUFFQSxDQUFBQSxDQUFDQSxxQkFBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQy9GQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDaERBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDSkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ2xDQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVEQSwyQkFBMkJBO1lBQzNCQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFFTUwsa0NBQWVBLEdBQXRCQTtZQUNJTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUMxREEsQ0FBQ0E7UUFFTU4seUJBQU1BLEdBQWJBO1lBQ0lPLEdBQUdBLENBQUFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUNBLENBQUNBLEVBQUVBLEVBQUNBLENBQUNBO2dCQUNqREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBRUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsRUFBQ0EsQ0FBQ0EsRUFBRUEsRUFBQ0EsQ0FBQ0E7b0JBQ3JEQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDbERBLENBQUNBO1lBQ0xBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLEdBQUdBLENBQUNBLGlCQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNsRUEsQ0FBQ0E7UUFFT1AsZ0NBQWFBLEdBQXJCQTtZQUNJUSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxpQkFBVUEsRUFBRUEsQ0FBQ0E7WUFDN0JBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3ZDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUVyQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDakJBLENBQUNBO1FBRU9SLDRCQUFTQSxHQUFqQkEsVUFBa0JBLFNBQVNBO1lBQ3ZCUyxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUVqQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtnQkFDakNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxFQUFFQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtnQkFDakRBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO1lBQzdCQSxDQUFDQTtZQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDNUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3hDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDbEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO1lBQ0xBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU9ULDRCQUFTQSxHQUFqQkEsVUFBa0JBLEtBQWlCQTtZQUMvQlUsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsa0JBQVdBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzVDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7UUFFT1Ysc0NBQW1CQSxHQUEzQkEsVUFBNEJBLENBQVFBLEVBQUVBLENBQVFBO1lBQzFDVyxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBRTVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBRWhDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3BDQSxDQUFDQTtRQUVPWCwrQkFBWUEsR0FBcEJBLFVBQXFCQSxDQUFRQSxFQUFFQSxDQUFRQTtZQUNuQ1ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFT1osd0JBQUtBLEdBQWJBLFVBQWNBLEdBQUdBO1lBQ2JhLElBQUlBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1lBQzdCQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsU0FBU0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDOUJBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ3JDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7UUFDTGIsZUFBQ0E7SUFBREEsQ0FuTEFaLEFBbUxDWSxJQUFBWjtJQW5MWUEsZUFBUUEsV0FtTHBCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQXJMTSxNQUFNLEtBQU4sTUFBTSxRQXFMWjtBQzVMRCw2Q0FBNkM7QUFDN0MsSUFBTyxNQUFNLENBa0NaO0FBbENELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFJSTBCLGtCQUFtQkEsR0FBV0EsRUFBRUEsR0FBV0EsRUFBRUEsSUFBWUEsRUFBRUEsT0FBdUJBLEVBQUVBLEtBQWdCQTtZQUNoR0MsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7UUFFT0QsNkJBQVVBLEdBQWxCQSxVQUFtQkEsR0FBV0EsRUFBRUEsR0FBV0EsRUFBRUEsSUFBWUE7WUFDckRFLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBQzNDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDbkVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3BDQSxDQUFDQTtRQUVNRiwwQkFBT0EsR0FBZEEsVUFBZUEsS0FBZ0JBO1lBQzNCRyxJQUFJQSxPQUFPQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUV2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsSUFBSUEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xFQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN2Q0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3pCQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDakJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUMvQ0EsQ0FBQ0E7UUFDTEgsZUFBQ0E7SUFBREEsQ0FoQ0ExQixBQWdDQzBCLElBQUExQjtJQWhDWUEsZUFBUUEsV0FnQ3BCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQWxDTSxNQUFNLEtBQU4sTUFBTSxRQWtDWjtBQ25DRCxtQ0FBbUM7QUFFbkMsSUFBTyxNQUFNLENBb0VaO0FBcEVELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEE7UUFVSThCLGlCQUFtQkEsS0FBZUE7WUFUbENDLFlBQVlBO1lBQ1pBLGNBQVNBLEdBQUdBLEVBQUVBLENBQUNBO1lBU1hBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0E7WUFFbkNBLElBQUlBLFVBQVVBLEdBQW1CQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUVoRUEsd0JBQXdCQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFbkJBLHFCQUFxQkE7WUFDckJBLElBQUlBLFFBQVFBLEdBQUdBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBO1lBQ3RDQSxJQUFJQSxRQUFRQSxHQUFHQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDaEJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDdENBLElBQUlBLE9BQU9BLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO29CQUM1Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsZUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsUUFBUUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pGQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDcENBLENBQUNBO1lBQ0xBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU1ELHNCQUFJQSxHQUFYQTtZQUNJRSxzQkFBc0JBO1lBQ3RCQSw4Q0FBOENBO1lBQzlDQSwrQ0FBK0NBO1lBQy9DQSwrRkFBK0ZBO1lBQy9GQSxxQ0FBcUNBO1lBRXJDQSw4Q0FBOENBO1lBQzlDQSxpR0FBaUdBO1lBQ2pHQSxtQ0FBbUNBO1lBRW5DQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDL0NBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUNsREEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO29CQUMzQ0EsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNKQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDNUNBLENBQUNBO29CQUVEQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekNBLENBQUNBO1lBQ0xBLENBQUNBO1lBRURBLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzdFQSwyQkFBMkJBO1lBQzNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFBQSxHQUFHQTtnQkFDdENBLElBQUlBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN2Q0EsSUFBSUEsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pFQSxJQUFJQSxVQUFVQSxHQUFHQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxHQUFHQSxTQUFTQSxHQUFHQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFFM0VBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLEdBQUdBLGNBQWNBLEdBQUdBLE1BQU1BLENBQUNBO1lBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNQQSxDQUFDQTtRQUNMRixjQUFDQTtJQUFEQSxDQWxFQTlCLEFBa0VDOEIsSUFBQTlCO0lBbEVZQSxjQUFPQSxVQWtFbkJBLENBQUFBO0FBQ0xBLENBQUNBLEVBcEVNLE1BQU0sS0FBTixNQUFNLFFBb0VaO0FDdEVELElBQU8sTUFBTSxDQTBCWjtBQTFCRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBQ1hBO1FBSUlpQztZQUNJQyxJQUFJQSxDQUFDQSxZQUFZQSxHQUFtQkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDckVBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBcUJBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1FBQ3RGQSxDQUFDQTtRQUVNRCx3QkFBSUEsR0FBWEEsVUFBWUEsS0FBaUJBO1lBQ3pCRSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDVEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ2pDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO2dCQUM5Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDdENBLE1BQU1BLENBQUNBO1lBQ1hBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBO1lBRTFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLGNBQWNBLENBQUNBO1lBQ3REQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1lBRTFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBO1FBQzNEQSxDQUFDQTtRQUNMRixnQkFBQ0E7SUFBREEsQ0F4QkFqQyxBQXdCQ2lDLElBQUFqQztJQXhCWUEsZ0JBQVNBLFlBd0JyQkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUExQk0sTUFBTSxLQUFOLE1BQU0sUUEwQlo7QUMxQkQsSUFBTyxNQUFNLENBc0taO0FBdEtELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWEEsSUFBS0EsSUFJSkE7SUFKREEsV0FBS0EsSUFBSUE7UUFDTG9DLHVDQUFRQSxDQUFBQTtRQUNSQSxtQ0FBTUEsQ0FBQUE7UUFDTkEscUNBQU9BLENBQUFBO0lBQ1hBLENBQUNBLEVBSklwQyxJQUFJQSxLQUFKQSxJQUFJQSxRQUlSQTtJQUVEQSxJQUFLQSxTQU9KQTtJQVBEQSxXQUFLQSxTQUFTQTtRQUNWcUMseUNBQUlBLENBQUFBO1FBQ0pBLG1EQUFTQSxDQUFBQTtRQUNUQSxpREFBUUEsQ0FBQUE7UUFDUkEsMkNBQUtBLENBQUFBO1FBQ0xBLDJDQUFLQSxDQUFBQTtRQUNMQSx5Q0FBSUEsQ0FBQUE7SUFDUkEsQ0FBQ0EsRUFQSXJDLFNBQVNBLEtBQVRBLFNBQVNBLFFBT2JBO0lBRURBO1FBS0lzQyx5QkFBbUJBLFNBQW9CQTtZQUNuQ0MsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0E7WUFDM0JBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO1FBQ3BDQSxDQUFDQTtRQUVNRCxrQ0FBUUEsR0FBZkEsVUFBZ0JBLEtBQWdCQTtZQUM1QkUsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFaEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBO2dCQUNQQSxNQUFNQSxDQUFDQTtZQUVYQSxNQUFNQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDZkEsS0FBS0EsSUFBSUE7b0JBQ0xBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO3dCQUNoQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtvQkFDNUJBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBO3dCQUMxQ0EsMEJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDcENBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBO3dCQUN6Q0EsMEJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDcENBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxJQUFJQTtvQkFDTEEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2xDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQTt3QkFDckNBLHlCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EseUJBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDckVBLENBQUNBO29CQUNEQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsSUFBSUE7b0JBQ0xBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBO3dCQUNyQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7b0JBQ3hDQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsSUFBSUE7b0JBQ0xBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNqQ0EsMEJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDcENBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxLQUFLQTtvQkFDTkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ25DQSwwQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO3dCQUNoQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBQ3BDQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pDQSx5QkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLHlCQUFrQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ2pFQSx5QkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO29CQUN2Q0EsQ0FBQ0E7b0JBQ0RBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxJQUFJQTtvQkFDTEEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7d0JBQ3BDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDckNBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxJQUFJQTtvQkFDTEEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7d0JBQ2xDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDakNBLHlCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EseUJBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDakVBLHlCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBQ3BDQSwwQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO3dCQUNoQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtvQkFDN0JBLENBQUNBO29CQUNEQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsSUFBSUE7b0JBQ0xBLElBQUlBLFlBQVlBLEdBQUdBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO29CQUVwREEsWUFBWUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFDQSxDQUFLQTt3QkFDMUNBLEVBQUVBLENBQUFBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLElBQUlBLFFBQVFBLENBQUNBLENBQUFBLENBQUNBOzRCQUNwQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ2hDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0hBLEtBQUtBLENBQUNBO2dCQUNWQTtvQkFDSUEsTUFBTUEsQ0FBQ0E7WUFDZkEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDM0JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBRXRCQSxFQUFFQSxDQUFBQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkRBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1lBQ3JCQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVPRiwyQ0FBaUJBLEdBQXpCQTtZQUNJRyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNoQkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFVQSxDQUFLQTtnQkFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDO29CQUM1SSxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQy9FLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLENBQUM7WUFDTCxDQUFDLENBQUNBLENBQUNBO1FBQ1BBLENBQUNBO1FBRU9ILG9DQUFVQSxHQUFsQkE7WUFDSUksTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNuQ0EsTUFBTUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxrQkFBa0JBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ2xGQSxNQUFNQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLE1BQU1BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDNUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFFT0osbUNBQVNBLEdBQWpCQTtZQUNJSyxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBO1lBQzFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBO1lBQzFDQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1lBRXJDQSxNQUFNQSxDQUFDQSxrQkFBa0JBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDakVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1FBQy9CQSxDQUFDQTtRQUVPTCwwQ0FBZ0JBLEdBQXhCQTtZQUFBTSxpQkFxQ0NBO1lBcENHQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxFQUNYQSxnQkFBZ0JBLEdBQTBCQSxFQUFFQSxFQUM1Q0EsUUFBUUEsR0FBR0EsVUFBQUEsSUFBSUE7Z0JBQ1hBLDBCQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBRWhDQSx5QkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLHlCQUFrQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsS0FBS0E7cUJBQ2pFQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQTtxQkFDcEJBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hEQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtnQkFDM0JBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQzFCQSxDQUFDQSxDQUFDQTtZQUVOQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLDBDQUEwQ0EsQ0FBQ0E7WUFDN0VBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0Esa0NBQWtDQSxDQUFDQTtZQUNwRUEsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSx3Q0FBd0NBLENBQUNBO1lBRXpFQSxJQUFJQSxLQUFLQSxHQUFHQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUU3Q0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFDQSxDQUFLQTtnQkFDbENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO29CQUNoQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2xCQSxLQUFLQSxTQUFTQTs0QkFDVkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7NEJBQ2hDQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTs0QkFDdEJBLE1BQU1BLENBQUNBO3dCQUNYQSxLQUFLQSxVQUFVQTs0QkFDWEEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7NEJBQ2pDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTs0QkFDcEJBLE1BQU1BLENBQUNBO3dCQUNYQSxLQUFLQSxRQUFRQTs0QkFDVEEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7NEJBQy9CQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTs0QkFDbkJBLE1BQU1BLENBQUNBO29CQUNmQSxDQUFDQTtnQkFDTEEsQ0FBQ0E7WUFDTEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDUEEsQ0FBQ0E7UUFDTE4sc0JBQUNBO0lBQURBLENBckpBdEMsQUFxSkNzQyxJQUFBdEM7SUFySllBLHNCQUFlQSxrQkFxSjNCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQXRLTSxNQUFNLEtBQU4sTUFBTSxRQXNLWjtBQ3RLRCx5Q0FBeUM7QUFDekMsdUNBQXVDO0FBQ3ZDLHlDQUF5QztBQUN6QywwQ0FBMEM7QUFFMUMsSUFBTyxNQUFNLENBaUhaO0FBakhELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFPWEE7UUFTSTZDO1lBVEpDLGlCQXlHQ0E7WUEvRk9BLGdDQUFnQ0E7WUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLGVBQVFBLEVBQUVBLENBQUNBO1lBQy9CQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUV4QkEsa0JBQWtCQTtZQUNsQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsY0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLGdCQUFTQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFFWkEsSUFBSUEsS0FBS0EsR0FBY0E7Z0JBQ25CQSxJQUFJQSxFQUFFQSxjQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxFQUFYQSxDQUFXQTtnQkFDdkJBLFNBQVNBLEVBQUVBLGNBQU1BLE9BQUFBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEVBQTNDQSxDQUEyQ0E7Z0JBQzVEQSxTQUFTQSxFQUFFQSxjQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxFQUFoQkEsQ0FBZ0JBO2FBQ3BDQSxDQUFDQTtZQUVGQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxzQkFBZUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBO1FBRU9ELCtCQUFnQkEsR0FBeEJBO1lBQUFFLGlCQWlDQ0E7WUFoQ0dBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2hCQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUUvQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFVQSxDQUFLQTtnQkFDOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLEtBQUssRUFBRTt3QkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqRCxLQUFLLENBQUM7b0JBQ1YsS0FBSyxFQUFFO3dCQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDVixLQUFLLEVBQUU7d0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbEQsS0FBSyxDQUFDO29CQUNWLEtBQUssRUFBRTt3QkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqRCxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNMLENBQUMsQ0FBQ0EsQ0FBQ0E7WUFFSEEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQTtnQkFDakRBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ25EQSxDQUFDQSxDQUFDQTtZQUNGQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLE9BQU9BLEdBQUdBO2dCQUNuREEsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDckRBLENBQUNBLENBQUNBO1lBQ0ZBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsR0FBR0E7Z0JBQ3BEQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0REEsQ0FBQ0EsQ0FBQ0E7WUFDRkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQTtnQkFDbkRBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3JEQSxDQUFDQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUVPRiw4QkFBZUEsR0FBdkJBLFVBQXdCQSxHQUFVQSxFQUFFQSxPQUFxQkE7WUFDckRHLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzVDQSxDQUFDQTtRQUVPSCx3QkFBU0EsR0FBakJBLFVBQWtCQSxJQUFJQTtZQUNsQkksSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLElBQUlBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZCQSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNyRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3Q0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFT0osMEJBQVdBLEdBQW5CQSxVQUFvQkEsU0FBU0E7WUFDekJLLHFDQUFxQ0E7WUFDckNBLFdBQVdBO1lBRVhBLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RGQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbERBLE1BQU1BLENBQUNBLGtCQUFrQkEsQ0FBQ0E7WUFFOUJBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbEJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO1lBQzFCQSxDQUFDQTtZQUVEQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFFWkEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLENBQUNBO1FBRU9MLG1CQUFJQSxHQUFaQTtZQUNJTSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ3hCQSxDQUFDQTtRQUVPTix3QkFBU0EsR0FBakJBO1lBQ0lPLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUNMUCxXQUFDQTtJQUFEQSxDQXpHQTdDLEFBeUdDNkMsSUFBQTdDO0lBekdZQSxXQUFJQSxPQXlHaEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBakhNLE1BQU0sS0FBTixNQUFNLFFBaUhaO0FDdEhELCtCQUErQjtBQUMvQixJQUFPLE1BQU0sQ0FFWjtBQUZELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDYkEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7QUFDL0JBLENBQUNBLEVBRk0sTUFBTSxLQUFOLE1BQU0sUUFFWjtBQ0hELElBQU8sTUFBTSxDQUtaO0FBTEQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYQTtRQUFBcUQ7UUFHQUMsQ0FBQ0E7UUFBREQsaUJBQUNBO0lBQURBLENBSEFyRCxBQUdDcUQsSUFBQXJEO0lBSFlBLGlCQUFVQSxhQUd0QkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUFMTSxNQUFNLEtBQU4sTUFBTSxRQUtaIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBDbTJrMTUge1xyXG4gIGV4cG9ydCB2YXIgZGlyZWN0aW9ucyA9IHtcclxuICAgIFVwOiAndXAnLFxyXG4gICAgUmlnaHQ6ICdyaWdodCcsXHJcbiAgICBEb3duOiAnZG93bicsXHJcbiAgICBMZWZ0OiAnbGVmdCdcclxuICB9O1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1vdmVEaXJlY3Rpb25zLnRzXCIvPlxyXG5cclxubW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGlsZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgSXNWaXNpdGVkOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBJc1BsYXllcjogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgVHlwZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBBbGxvd2VkTW92ZXM6IHN0cmluZ1tdO1xyXG4gICAgICAgIHB1YmxpYyBTdG9yeTogU3RvcnlNb2RlbDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodGlsZVR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLklzVmlzaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLklzUGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHRpbGVUeXBlO1xyXG4gICAgICAgICAgICB0aGlzLkFsbG93ZWRNb3ZlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uVmFsdWVzID0gT2JqZWN0LmtleXMoQ20yazE1LmRpcmVjdGlvbnMpLm1hcChrID0+IENtMmsxNS5kaXJlY3Rpb25zW2tdKTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvblZhbHVlcy5pbmRleE9mKGRpcmVjdGlvbikgIT0gLTEgJiYgdGhpcy5BbGxvd2VkTW92ZXMuaW5kZXhPZihkaXJlY3Rpb24pID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxvd2VkTW92ZXMucHVzaChkaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnMoZGlyZWN0aW9uczogc3RyaW5nW10pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbihkaXJlY3Rpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck1vdmVSZXN1bHQge1xyXG4gICAgICAgIHB1YmxpYyBTdWNjZXNzOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgWDogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBZOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIElzSW5TdG9yeTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHBsYXllcjogUGxheWVyTW9kZWwgPSBudWxsKXtcclxuICAgICAgICAgICAgaWYocGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlggPSBwbGF5ZXIuWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuWSA9IHBsYXllci5ZO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Jc0luU3RvcnkgPSBwbGF5ZXIuSXNJblN0b3J5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZShkaXJlY3Rpb246IHN0cmluZykgOiBQbGF5ZXJNb3ZlUmVzdWx0IHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQbGF5ZXJNb3ZlUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5TdWNjZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLlVwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkaXJlY3Rpb25zLkRvd246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRpcmVjdGlvbnMuTGVmdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlgtLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgZGlyZWN0aW9ucy5SaWdodDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlgrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LlN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuTWVzc2FnZSA9ICdNb3ZlIHdoZXJlPyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LlN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXN1bHQuTWVzc2FnZSA9IFwiWW91IGhhdmUgbW92ZWQgXCIgKyBkaXJlY3Rpb24gKyBcIi5cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcnlNb2RlbCB7XHJcbiAgICAgICAgcHVibGljIElkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIFN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHN0b3J5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5JZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLlN0b3J5ID0gc3Rvcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNYXBUcmFuc3BvcnQge1xyXG4gICAgICAgIG1hcDogc3RyaW5nW11bXTtcclxuICAgICAgICBtb3ZlbWVudHM6IHN0cmluZ1tdW107XHJcbiAgICAgICAgdGlsZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCB2YXIgZ2FtZW1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgZmFjdG9yeW1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgdmlsbGFnZW1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgdmlsbGFnZW1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgYmFybm1hcDogc3RyaW5nW11bXTtcclxuXHJcbiAgICBleHBvcnQgdmFyIGNhbk1vdmVPbk1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgY2FuTW92ZU9uRmFjdG9yeU1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgY2FuTW92ZU9uVmlsbGFnZU1hcDogc3RyaW5nW11bXTtcclxuICAgIGV4cG9ydCB2YXIgY2FuTW92ZU9uQmFybk1hcDogc3RyaW5nW11bXTtcclxuXHJcbiAgICBleHBvcnQgdmFyIG1hcFRyYW5zcG9ydHM6IHsgW2tleTogc3RyaW5nXTogSU1hcFRyYW5zcG9ydCB9O1xyXG4gICAgZXhwb3J0IHZhciBpZ25vcmVUaWxlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBnYW1lbWFwID0gW1xyXG4gICAgICAgIFsnLScsICctJywgJy0nLCAnLScsICctJywgJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4J10sXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnZTknLCAnZTEwJywgJ2UxMScsICdlMTInLCAnZTEzJywgJ2UxNCcsICdlMTUnLCAnZTE2J10sXHJcbiAgICAgICAgWyctJywgJ20xJywgJ20yJywgJ20zJywgJy0nLCAnZTE3JywgJ2UxOCcsICdlMTknLCAnZTIwJywgJ2UyMScsICdlMjInLCAnZTIzJywgJ2UyNCddLFxyXG4gICAgICAgIFsnLScsICdtNCcsICdtNScsICdtNicsICctJywgJy0nLCAnLScsICctJywgJ3U1JywgJy0nLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnbTcnLCAnbTgnLCAndTF2JywgJ3UxJywgJ3UxJywgJ3UyJywgJ3UxJywgJ3UzJywgJ3UxJywgJ3UxJywgJ3U0JywgJy0nXSxcclxuICAgICAgICBbJy0nLCAndTV2JywgJy0nLCAnLScsICctJywgJy0nLCAndTVnJywgJy0nLCAnLScsICctJywgJy0nLCAnaDEnLCAnaDInXSxcclxuICAgICAgICBbJy0nLCAndTUnLCAnLScsICctJywgJ2cxJywgJ2cyJywgJ2czJywgJ2c0JywgJ2c1JywgJy0nLCAnLScsICdoMycsICdoNCddLFxyXG4gICAgICAgIFsnLScsICd1NScsICctJywgJy0nLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJywgJ2s0JywgJ2sxJywgJ2sxJywgJ2sxJ10sXHJcbiAgICAgICAgWyctJywgJ3U1YicsICctJywgJy0nLCAnZzExJywgJ2cxMicsICdnMTMnLCAnZzE0JywgJ2cxNScsICdrMicsICctJywgJy0nLCAnLSddLFxyXG4gICAgICAgIFsnLScsICdpMScsICdpMicsICctJywgJy0nLCAnLScsICdsJywgJy0nLCAnZjEnLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJy0nLCAnaTMnLCAnaTQnLCAnaTUnLCAndTFiJywgJ3UxJywgJ3U2JywgJy0nLCAnZjInLCAnazInLCAnLScsICctJywgJy0nXSxcclxuICAgICAgICBbJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2sxJywgJ2tiJywgJ2sxJywgJ2sxJywgJ2szJywgJy0nLCAnLScsICctJ10sXHJcbiAgICAgICAgWyctJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICdzJywgJy0nLCAnLScsICctJywgJy0nLCAnLScsICctJ11cclxuICAgIF07XHJcbiAgICBjYW5Nb3ZlT25NYXAgPSBbXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICdkJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICd1ZCcsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgICBbJycsICcnLCAncicsICdscicsICdscicsICdscicsICdscmQnLCAncmwnLCAndWxyJywgJ3JsJywgJ3JsJywgJ2RsJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICd1JywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICd1JywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAndWQnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJ3VkJywgJycsICcnLCAnJywgJycsICdkJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICdkdScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAncicsICdscicsICdscicsICd1bCcsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAndScsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuXHJcbiAgICBmYWN0b3J5bWFwID0gW1xyXG4gICAgICAgIFsnLScsICd0ZXhpdCcsICctJ10sXHJcbiAgICAgICAgWyd0bCcsICd0bScsICd0ciddLFxyXG4gICAgICAgIFsnYmwnLCAnYm0nLCAnYnInXSxcclxuICAgICAgICBbJy0nLCAnYmV4aXQnLCAnLSddXHJcbiAgICBdO1xyXG5cclxuICAgIGNhbk1vdmVPbkZhY3RvcnlNYXAgPSBbXHJcbiAgICAgICAgWycnLCAnJywgJyddLFxyXG4gICAgICAgIFsncicsICdyJywgJ2wnXSxcclxuICAgICAgICBbJ3InLCAnJywgJ2wnXSxcclxuICAgICAgICBbJycsICd1JywgJyddXHJcbiAgICBdO1xyXG5cclxuICAgIGlnbm9yZVRpbGVzID0gaWdub3JlVGlsZXMuY29uY2F0KFsndGV4aXQnLCdiZXhpdCcsJ3RsJywndG0nLCd0cicsJ2JsJywnYm0nLCdicicsJ2JleGl0J10pO1xyXG5cclxuICAgIHZpbGxhZ2VtYXAgPSBbXHJcbiAgICAgICAgW1wibVwiLCBcInJleGl0dlwiXSxcclxuICAgICAgICBbXCJiZXhpdHZcIiwgXCItXCJdLFxyXG4gICAgXTtcclxuICAgIGNhbk1vdmVPblZpbGxhZ2VNYXAgPSBbXHJcbiAgICAgICAgWydkcicsJyddLFxyXG4gICAgICAgIFsnJywnJ11cclxuICAgIF07XHJcbiAgICBpZ25vcmVUaWxlcyA9IGlnbm9yZVRpbGVzLmNvbmNhdChbJ20nLCdyZXhpdHYnLCdiZXhpdHYnXSk7XHJcblxyXG4gICAgYmFybm1hcCA9IFtcclxuICAgICAgICBbXCJ0ZXhpdGJcIiwgXCItXCJdLFxyXG4gICAgICAgIFtcImJcIiwgXCJyZXhpdGJcIl0sXHJcbiAgICBdO1xyXG4gICAgY2FuTW92ZU9uQmFybk1hcCA9IFtcclxuICAgICAgICBbJycsJyddLFxyXG4gICAgICAgIFsncicsJyddXHJcbiAgICBdO1xyXG4gICAgaWdub3JlVGlsZXMgPSBpZ25vcmVUaWxlcy5jb25jYXQoWydiJywndGV4aXRiJywncmV4aXRiJ10pO1xyXG5cclxuICAgIG1hcFRyYW5zcG9ydHMgPSB7XHJcbiAgICAgICAgLy8gbWFwID0+IGZhY3RvcnltYXBcclxuICAgICAgICAnZzEzJzogeyBtYXA6IGZhY3RvcnltYXAsIG1vdmVtZW50czogY2FuTW92ZU9uRmFjdG9yeU1hcCAsIHRpbGU6ICdiZXhpdCcgfSxcclxuICAgICAgICAnZzMnOiB7IG1hcDogZmFjdG9yeW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25GYWN0b3J5TWFwICwgdGlsZTogJ3RtJyB9LFxyXG5cclxuICAgICAgICAvLyBtYXAgPT4gdmlsbGFnZW1hcFxyXG4gICAgICAgICdtOCc6IHsgbWFwOiB2aWxsYWdlbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPblZpbGxhZ2VNYXAsIHRpbGU6ICdtJyB9LFxyXG4gICAgICAgICdtNyc6IHsgbWFwOiB2aWxsYWdlbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPblZpbGxhZ2VNYXAsIHRpbGU6ICdtJyB9LFxyXG5cclxuICAgICAgICAvLyBtYXAgPT4gYmFybm1hcFxyXG4gICAgICAgICdpMSc6IHsgbWFwOiBiYXJubWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkJhcm5NYXAsIHRpbGU6ICdiJyB9LFxyXG4gICAgICAgICdpNSc6IHsgbWFwOiBiYXJubWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbkJhcm5NYXAsIHRpbGU6ICdiJyB9LFxyXG5cclxuICAgICAgICAvLyBmYWN0b3J5bWFwID0+IG1hcFxyXG4gICAgICAgICdiZXhpdCc6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ2wnIH0sXHJcbiAgICAgICAgJ3RleGl0JzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTVnJyB9LFxyXG5cclxuICAgICAgICAvLyB2aWxsYWdlbWFwID0+IG1hcFxyXG4gICAgICAgICdyZXhpdHYnOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1MXYnIH0sXHJcbiAgICAgICAgJ2JleGl0dic6IHsgbWFwOiBnYW1lbWFwLCBtb3ZlbWVudHM6IGNhbk1vdmVPbk1hcCwgdGlsZTogJ3U1dicgfSxcclxuXHJcbiAgICAgICAgLy8gYmFybm1hcCA9PiBtYXBcclxuICAgICAgICAncmV4aXRiJzogeyBtYXA6IGdhbWVtYXAsIG1vdmVtZW50czogY2FuTW92ZU9uTWFwLCB0aWxlOiAndTFiJyB9LFxyXG4gICAgICAgICd0ZXhpdGInOiB7IG1hcDogZ2FtZW1hcCwgbW92ZW1lbnRzOiBjYW5Nb3ZlT25NYXAsIHRpbGU6ICd1NWInIH0sXHJcbiAgICB9O1xyXG59IiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBleHBvcnQgdmFyIHN0b3JpZXNUaWxlTWFwcGluZzogeyBba2V5OiBzdHJpbmddOiBTdG9yeU1vZGVsIH07XHJcbiAgICBleHBvcnQgdmFyIHR3b1N0YXRlU3RvcmVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBzdG9yaWVzVGlsZU1hcHBpbmcgPSB7XHJcbiAgICAgICAgJ3MnIDogbmV3IFN0b3J5TW9kZWwoJ3MnLFxyXG4gICAgICAgICAgICAnU3ppYSEgRXogYXogaWRlaSBrYXLDoWNzb255aSBqw6F0w6lrdW5rLCBzb2sgc3plcmV0ZXR0ZWwgw6lzIGdvbmRvc2tvZMOhc3NhbCBrw6lzesOtdGV0dMO8ayBzesOhbW9kcmEuIEV6IGVneSBrYWxhbmRqw6F0w6lrLCBhaG9sIGEgZmVsYWRhdGFpZCBrw7Z6w6kgdGFydG96aWsgYSB0w6lya8OpcGVuIGVsxZFyZWp1dG5pIC0gZXp0IGEgbnlpbGFrIHNlZ8OtdHPDqWfDqXZlbCB0ZWhldGVkIG1lZywgaWxsZXR2ZSBrw7xsw7ZuYsO2esWRIGZlbGFkYXRvayB0ZWxqZXPDrXTDqXNlLiBKw7Mgc3rDs3Jha296w6FzdCBob3p6w6EhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2tiJzogbmV3IFN0b3J5TW9kZWwoJ2tiJyxcclxuICAgICAgICAgICAgJ8OcZHYgYSBqw6F0w6lrYmFuLiBOeWVydMOpbCBlZ3kgamVneWV0IGEgTWlrdWzDoXNnecOhcmJhLCB0YWzDoWxrb3poYXRzeiBzb2sgdmFyw6F6c2xhdHRhbCwgw6lzIGhhIGrDsyB2b2x0w6FsLCBtw6lnIGFqw6FuZMOpa290IGlzIGthcGhhdHN6LidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiJzogbmV3IFN0b3J5TW9kZWwoJ2k1JyxcclxuICAgICAgICAgICAgJ0V6IGF6IGlzdMOhbGzDsywgaW5uZW4gaW5kdWwgw6lzIGlkZSDDqXJrZXppayBhIHTDqWxhcMOzLiBBIG1hbsOzayDDqXBwIHRha2Fyw610YW5haywgdGFua29sbmFrLCBwb2zDrXJvenrDoWsgUnVkb2xmIG9ycsOhdC4gw5xyZXNuZWsgdGFsw6Fsb2QsIG3DqWcgbmVtIMOpcmtlemV0dCBlbCBheiBpZMWRIGF6IGluZHVsw6FzcmEuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2IyJzogbmV3IFN0b3J5TW9kZWwoJ2kyJyxcclxuICAgICAgICAgICAgJ8OJcHAgaW5kdWwgTWlrdWzDoXMuIEZlbHN6w6FsbHN6PzxhIGlkPVwiZmluaXNoXCIgY2xhc3M9XCJidG5cIj5JZ2VuPC9hPidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdCc6IG5ldyBTdG9yeU1vZGVsKCdiZXhpdCcsXHJcbiAgICAgICAgICAgICdTemlhISBNZWd0YWzDoWx0YWQgTWlrdWzDoXMgZ3nDoXLDoXQsIMOpbiBsZXN6ZWsgYSBrYWxhdXpvZC4gQW1lZGRpZyBNaWt1bMOhcyBrw6lzesO8bMWRZGlrLCBtZWdpc21lcmhldGVkIGEgbcWxaGVsecOpdCwgc8WRdCBraSBpcyBwcsOzYsOhbGhhdG9kISBHeWVyZSBiZWxqZWJiLCBtZWdtdXRhdG9tIGhvZ3lhbiEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm0nOiBuZXcgU3RvcnlNb2RlbCgnYm0nLFxyXG4gICAgICAgICAgICAnSMOhdCDDrW1lLiBCYWxyYSB0YWzDoWxvZCBhIHJha3TDoXJhdCwgam9iYnJhIGEgbcWxaGVseXQsIGEga8O2dmV0a2V6xZEgZm9seW9zw7NuIHBlZGlnIG1lZ3RhbMOhbG9kIGEgZmVzdMWRc3pvYsOhdC4gw4lzIGhvZ3kgbWl0IHJlanQgYSBuZWd5ZWRpayBhanTDsz8gRWd5IGtpcyB2YXLDoXpzbGF0b3QuLi4gTWl2ZWwgaWx5ZW4gasOzIHZvbHTDoWwgaWTDqW4g4oCTIG1vbmRqYSBhIG1hbsOzIMOpcyBlbGZvcmR1bCDDoXRqYXbDrXRhbmkgYSBzdGF0aXN6dGlrw6FkIC0sIHbDoWxhc3p0aGF0c3ogZWd5IGFqw6FuZMOpa290IGEgTWlrdWzDoXNnecOhcmLDs2w6JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuXCIgaWQ9XCJzemFua29cIj5TesOhbmvDszwvZGl2PjxkaXYgY2xhc3M9XCJhamFuZGVrIGJ0blwiIGlkPVwiaGludGFsb1wiPkhpbnRhbMOzPC9kaXY+PGRpdiBjbGFzcz1cImFqYW5kZWsgYnRuXCIgaWQ9XCJraXN2b25hdFwiPktpc3ZvbmF0PC9kaXY+J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JtX2Nob3Nlbic6IG5ldyBTdG9yeU1vZGVsKCdibV9jaG9zZW4nLFxyXG4gICAgICAgICAgICAnw4EsIHN6w7N2YWwgYSB7MH10IHbDoWxhc3p0b3R0YWQhIE7DqXp6w7xrIGNzYWsgaG9neSB0dWRvZCBlbGvDqXN6w610ZW5pLi4uPGJyLz4nICtcclxuICAgICAgICAgICAgJzx1bD48bGk+S2VsbCBtYWpkIGJlbGUgezF9IGEgcmFrdMOhciBzem9iw6Fiw7NsLDwvbGk+PGxpPmF6IMO8Z3llcyBtYW7Ds2sgYSBtxbFoZWx5YmVuIMO2c3N6ZXN6ZXJlbGlrIG5la2VkLDwvbGk+PGxpPiBhIGZlc3TFkSBzem9iw6FiYW4gbWVna2FwamEgYSBzesOtbmVpdCw8L2xpPjxsaT4gw6lzIHbDqWfDvGwgZWxsw6F0anVrIGEga2Fyw6Fjc29ueSBzemVsbGVtw6l2ZWwmdHJhZGU7LjwvbGk+PC91bD4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYm0yJzogbmV3IFN0b3J5TW9kZWwoJ2JtJyxcclxuICAgICAgICAgICAgJ0EgZ3nDoXIgZWzFkXN6b2LDoWrDoWJhbiB2YWd5LiBKb2JicmEgdGFsw6Fsb2QgYSBtxbFoZWx5dCwgYSBmZXN0xZEgc3pvYmEgcGVkaWcgYSBrw7Z2ZXRrZXrFkSBmb2x5b3PDs24gdmFuLidcclxuICAgICAgICApLFxyXG4gICAgICAgICdiZXhpdDInOiBuZXcgU3RvcnlNb2RlbCgnYmV4aXQyJyxcclxuICAgICAgICAgICAgJ0V6IGEgYmVqw6FyYXQgYSBnecOhcmJhLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bCc6IG5ldyBTdG9yeU1vZGVsKCd0bCcsXHJcbiAgICAgICAgICAgICdGw6lsw6lua2VuIG55aXRzeiBiZSBhIHN6b2LDoWJhLCBkZSBoYW1hciByw6Fqw7Zzc3osIGhvZ3kgaXR0IHTDtnJ0w6luaWsgYSB2YXLDoXpzbGF0LiBBIGvDrXbDoW50IGrDoXTDqWtvZCBlenplbCBheiBhZGFsw6lra2FsIGVsa8Opc3rDvGx0ISA8YSBjbGFzcz1cImJ0blwiIGlkPVwic2hvd2dpZnRcIj5NRUdOw4laRU08L2E+J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RsMic6IG5ldyBTdG9yeU1vZGVsKCd0bDInLFxyXG4gICAgICAgICAgICAnU3rDqXAgbGV0dCEgw5Zyw7ZtbWVsIHTDoXZvem9sIGEgdmFyw6F6c2xhdG9zIHN6b2LDoWLDs2wgYXpvbiB0YW5ha29kdmEsIGhvZ3kgbGVzei1lIGVzw6lseWVkIHRhbMOhbGtvem5pIE1pa3Vsw6Fzc2FsLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bSc6IG5ldyBTdG9yeU1vZGVsKCd0bScsXHJcbiAgICAgICAgICAgICdKb2JicmEgZmVzdGhldGVkIGxlIGF6IGFqw6FuZMOpa29kLiBBIGJhbCBvbGRhbGkgYWp0w7MgbcO2Z8O8bCBtaW5kZW5mw6lsZSBmdXJhIGhhbmdvaywgemFqb2sgw6lzIHN6w61uZXMgZsOpbnllayBzesWxcsWRZG5layBraS4gQXogYXogYWp0w7MgcGVkaWcgYSBow6F0c8OzIGtpasOhcmF0IGF6IGVyZMWRIGZlbMOpLidcclxuICAgICAgICApLFxyXG4gICAgICAgICd0bTInOiBuZXcgU3RvcnlNb2RlbCgndG0yJyxcclxuICAgICAgICAgICAgJ05hZ3lvbiBzesOpcCBsZXR0IGEgasOhdMOpa29kLCBncmF0dWzDoWxvayBheiBlbGvDqXN6w610w6lzw6loZXosIHTDtmJiIGlseWVuIHN6b3Jnb3Mga8OpenJlIGxlbm5lIHN6w7xrc8OpZ8O8bmshIE1pa3Vsw6FzIG5lbXNva8OhcmEgaW5kdWwsIG1lZ3RhbMOhbG9kIGF6IGlzdMOhbGzDs27DoWwsIGFkZGlnIG55dWdvZHRhbiBuw6l6eiBrw7Zyw7xsIGEgYmlydG9rb24uJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RtMyc6IG5ldyBTdG9yeU1vZGVsKCd0bScsXHJcbiAgICAgICAgICAgICdBIGd5w6FyIGjDoXRzw7MgZm9seW9zw7Nqw6FuIHZhZ3kuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3RyJzogbmV3IFN0b3J5TW9kZWwoJ3RyJyxcclxuICAgICAgICAgICAgJ0V6IGEgZmVzdMWRcyBzem9iYS4gTWluZGVuIG1hbsOzIGVsZm9nbGFsdCwgw61neSBhIGZlc3TDqXN0IG5la2VkIGtlbGwgbWVnb2xkYW5vZC4gRWhoZXogc3plcmVuY3PDqXJlIHJlbmdldGVnIGZlc3TDqWtldCDDqXMgZWNzZXRldCBoYWd5dGFrIGEgbWFuw7NrLiBNaXV0w6FuIMO2c3N6ZXBpbmfDoWx0YWQgYXogYWrDoW5kw6lrb2QsIGhhdGFsbWFzIGvDrXbDoW5jc2lzw6FnIHTDtnIgcsOhZCBheiB1dG9sc8OzIHN6b2LDoXZhbCBrYXBjc29sYXRiYW4uIE7DqXpkIG1lZywgbWkgcmVqdMWRemhldCBheiBhanTDsyBtw7Znw7Z0dCEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnYmwnOiBuZXcgU3RvcnlNb2RlbCgnYmwnLFxyXG4gICAgICAgICAgICAnRXogaXR0IGEgcmFrdMOhci4gRWd5IGJlbnQgc2VydGVwZXJ0w6lsxZEgbWFuw7MgYSBzZWfDrXRzw6lnZWRyZSBzaWV0LCBhIGtlemVkYmUgbnlvbWphIGF6IGFqw6FuZMOpa29kIGVsa8Opc3rDrXTDqXPDqWhleiBzesO8a3PDqWdlcyBhbGFwYW55YWdva2F0LiBNZWdrw7ZzesO2bsO2ZCBuZWtpLiBJcsOhbnkgw7Zzc3plc3plcmVsbmkhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2JyJzogbmV3IFN0b3J5TW9kZWwoJ2JyJyxcclxuICAgICAgICAgICAgJ0V6IGl0dCBNaWt1bMOhcyBtxbFoZWx5ZS4gRWd5IHrDtmxkIHNpdHlha29zIG1hbsOzIMOpcHAgYXogZWd5aWsgYWrDoW5kw6lrZG9ib3p6YWwgYm9ow7Nja29kaWssIEtJVsOBTMOTIEEgSEFOR1VMQVQsIGFtaWtvciBiZXRvcHBhbnN6LiBFbMWRc3rDtnIgbWVncsOpbcO8bCwgbWFqZCBmw7xsaWcgw6lyxZEgbW9zb2xseWFsIG9kYXJvaGFuIGhvenrDoWQsIGtpdmVzemkgYXogYWxrYXRyw6lzemVrZXQgYSBrZXplZGLFkWwgw6lzIGVneSBwaWxsYW5hdCBhbGF0dCDDtnNzemVzemVyZWxpLiBNw6FyIGNzYWsgZWd5IGtpcyBmZXN0w6lzIGhpw6FueXppayEnXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnbSc6IG5ldyBTdG9yeU1vZGVsKCdtJyxcclxuICAgICAgICAgICAgJ0V6IGEgZ3nDoXIga8O2emVsw6liZW4gdGFsw6FsaGF0w7MgYXByw7MgZmFsdWNza2EgYWQgb3R0aG9udCBhIGd5w6FyYmFuIGRvbGdvesOzIE5BR1lPTiBTWk9SR09TIG1hbsOzayBzesOhbcOhcmEuIEEgaMOhenVrIMO6Z3kgdMWxbmhldCwgaG9neSBtw6l6ZXNrYWzDoWNzYsOzbCB2YW4sIGRlIGVzemVkYmUgbmUganVzc29uIGJlbGVrw7NzdG9sbmkhJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2UyMCc6IG5ldyBTdG9yeU1vZGVsKCdlMjAnLFxyXG4gICAgICAgICAgICAnRXogYSBnecOhcmhveiB0YXJ0b3rDsyBlcmTFkSwgaW5uZW4gbnllcmlrIGEgbWFuw7NrIGF6IGFqw6FuZMOpa29rIEtJVsOBTMOTIE1JTsWQU8OJR8WwIGFsYXBhbnlhZ8OhdC4nXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnaDEnOiBuZXcgU3RvcnlNb2RlbCgnaDEnLFxyXG4gICAgICAgICAgICAnRWJiZW4gYSB0YXZhY3Nrw6FiYW4gcGloZW5uZWsgYSBwaW5ndmluZWssIGFtaWtvciDDqXBwIG5lbSBrZWxsIGJlc2Vnw610ZW5pIGEgbWFuw7NrbmFrLCB2YWd5IMOpcHAgbmVtIGJlw7ZsdMO2esWRc2V0IGrDoXRzemFuYWsuJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ2NyZWRpdCc6IG5ldyBTdG9yeU1vZGVsKCdjcmVkaXQnLFxyXG4gICAgICAgICAgICAnQm9sZG9nIGthcsOhY3Nvbnl0IGvDrXbDoW51bmssIGvDtnN6aSwgaG9neSB2w6lnaWdqw6F0c3pvdHRhZCBheiBpZGVpIGrDoXTDqWt1bmshIDxici8+UsOpa2Egw6lzIFRvbWknXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHR3b1N0YXRlU3RvcmVzID0gW1wiYmV4aXRcIiwgXCJibVwiXTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUaWxlTW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQbGF5ZXJNb2RlbC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0b3J5TW9kZWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNb3ZlRGlyZWN0aW9ucy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvbWFwcy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGEvc3Rvcmllcy50c1wiLz5cclxuXHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcE1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6VGlsZU1vZGVsW11bXTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOlBsYXllck1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgV2lkdGg6bnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBIZWlnaHQ6bnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRlQmFja3VwOiBTdGF0ZU1vZGVsO1xyXG4gICAgICAgIHByaXZhdGUgdmlzaXRlZFN0b3JpZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFwKGdhbWVtYXAsIGNhbk1vdmVPbk1hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllck1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5YID0gNjtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWSA9IDEyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWRTdG9yaWVzID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgIGlmICh0aWxlLlN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnZpc2l0ZWRTdG9yaWVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5TdG9yeSA9IHN0b3JpZXNUaWxlTWFwcGluZ1t0aWxlLlN0b3J5LklkKycyJ107XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHR3b1N0YXRlU3RvcmVzLmluZGV4T2YodGlsZS5TdG9yeS5JZCkgIT0gLTEgJiYgdGhpcy52aXNpdGVkU3Rvcmllcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZFN0b3JpZXMucHVzaCh0aWxlLlN0b3J5LklkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLklzSW5TdG9yeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxhc3RtYXA7XHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0bW92ZW1lbnRzO1xyXG4gICAgICAgIHByaXZhdGUgbG9hZE1hcChtYXA6c3RyaW5nW11bXSwgbW92ZW1lbnRzOnN0cmluZ1tdW10pIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0bWFwID0gbWFwO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3Rtb3ZlbWVudHMgPSBtb3ZlbWVudHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLldpZHRoID0gbWFwLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5IZWlnaHQgPSBtYXBbMF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UaWxlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbGVzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuV2lkdGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlID0gbmV3IFRpbGVNb2RlbChtYXBbal1baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aWxlLkFsbG93TW92ZW1lbnRJbkRpcmVjdGlvbnModGhpcy5nZXREaXJlY3Rpb25zKG1vdmVtZW50cywgaiwgaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbdGlsZS5UeXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaWxlc1tpXVtqXSA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWxvYWRNYXAoKXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFwKHRoaXMubGFzdG1hcCwgdGhpcy5sYXN0bW92ZW1lbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZW1lbnRNYXAgPSB7XHJcbiAgICAgICAgICAgICd1JzogQ20yazE1LmRpcmVjdGlvbnMuVXAsXHJcbiAgICAgICAgICAgICdkJzogQ20yazE1LmRpcmVjdGlvbnMuRG93bixcclxuICAgICAgICAgICAgJ2wnOiBDbTJrMTUuZGlyZWN0aW9ucy5MZWZ0LFxyXG4gICAgICAgICAgICAncic6IENtMmsxNS5kaXJlY3Rpb25zLlJpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREaXJlY3Rpb25zKG1vdmVtZW50czpzdHJpbmdbXVtdLCB4Om51bWJlciwgeTpudW1iZXIpOnN0cmluZ1tdIHtcclxuICAgICAgICAgICAgdmFyIG1vdmVtZW50Q2VsbCA9IG1vdmVtZW50c1t4XVt5XTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdmVtZW50Q2VsbC5zcGxpdCgnJykubWFwKGQgPT4gdGhpcy5tb3ZlbWVudE1hcFtkXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVBsYXllcihkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gdGhpcy5QbGF5ZXIuTW92ZShkaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya1N1cnJvdW5kVmlzaXRlZCh0aGlzLlBsYXllci5YLCB0aGlzLlBsYXllci5ZKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy5UaWxlc1t0aGlzLlBsYXllci5YXVt0aGlzLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgICAgIHRpbGUuSXNWaXNpdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gbWFwVHJhbnNwb3J0c1t0aWxlLlR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHJhbnNwb3J0KHRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZSA9IHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYXJrU3Vycm91bmRWaXNpdGVkKHRoaXMuUGxheWVyLlgsIHRoaXMuUGxheWVyLlkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLlN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52aXNpdGVkU3Rvcmllcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nW3RpbGUuU3RvcnkuSWQrJzInXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuSXNJblN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0d29TdGF0ZVN0b3Jlcy5pbmRleE9mKHRpbGUuU3RvcnkuSWQpICE9IC0xICYmIHRoaXMudmlzaXRlZFN0b3JpZXMuaW5kZXhPZih0aWxlLlN0b3J5LklkKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkU3Rvcmllcy5wdXNoKHRpbGUuU3RvcnkuSWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Jc0luU3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRDdXJyZW50U3RvcnkoKTpTdG9yeU1vZGVsIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGlsZXNbdGhpcy5QbGF5ZXIuWF1bdGhpcy5QbGF5ZXIuWV0uU3Rvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmV2ZWFsKCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8IHRoaXMuc3RhdGVCYWNrdXAuVGlsZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgajwgdGhpcy5zdGF0ZUJhY2t1cC5UaWxlc1tpXS5sZW5ndGg7aisrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwLlRpbGVzW2ldW2pdLklzVmlzaXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVCYWNrdXAuVGlsZXNbNl1bOV0uQWxsb3dlZE1vdmVzID0gW2RpcmVjdGlvbnMuRG93bl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEdlbmVyYXRlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLlBsYXllciA9IHRoaXMuY2xvbmUodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICBzdGF0ZS5UaWxlcyA9IHRoaXMuY2xvbmUodGhpcy5UaWxlcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5HZW5lcmF0ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZUJhY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZTdGF0ZSA9IHRoaXMuc3RhdGVCYWNrdXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRTdGF0ZShwcmV2U3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUJhY2t1cCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNYXAodHJhbnNwb3J0Lm1hcCwgdHJhbnNwb3J0Lm1vdmVtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQmFja3VwID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNwb3J0Lm1hcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmFuc3BvcnQubWFwW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydC5tYXBbaV1bal0gPT0gdHJhbnNwb3J0LnRpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuWCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMb2FkU3RhdGUoc3RhdGU6IFN0YXRlTW9kZWwpe1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXJNb2RlbChzdGF0ZS5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbGVzID0gc3RhdGUuVGlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE1hcmtTdXJyb3VuZFZpc2l0ZWQoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtWaXNpdGllZCh4IC0gMSwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHggKyAxLCB5KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkgLSAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFya1Zpc2l0aWVkKHgsIHkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCAtIDEsIHkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5NYXJrVmlzaXRpZWQoeCArIDEsIHkgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFya1Zpc2l0aWVkKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaWxlc1t4XSAmJiB0aGlzLlRpbGVzW3hdW3ldKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UaWxlc1t4XVt5XS5Jc1Zpc2l0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjbG9uZShvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9sZFN0YXRlID0gaGlzdG9yeS5zdGF0ZTtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUob2JqLCBudWxsKTtcclxuICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IGhpc3Rvcnkuc3RhdGU7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG9sZFN0YXRlLCBudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9kZWwvVGlsZU1vZGVsLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBUaWxlVmlldyB7XHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIGNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyLCBlbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgbW9kZWw6IFRpbGVNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKHJvdywgY29sLCBzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZShyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gcm93ICogc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gY29sICogc2l6ZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBzaXplICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd0aWxlJztcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwdWJsaWMgRGlzcGxheShtb2RlbDogVGlsZU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gWyd0aWxlJ107XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuSXNWaXNpdGVkICYmIENtMmsxNS5pZ25vcmVUaWxlcy5pbmRleE9mKG1vZGVsLlR5cGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0aWxlLVwiICsgbW9kZWwuVHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2RhcmsnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGVsLklzUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGlsZVZpZXcudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXBWaWV3IHtcclxuICAgICAgICAvLyBjb25zdGFudHNcclxuICAgICAgICB0aWxlQ291bnQgPSAxMztcclxuXHJcbiAgICAgICAgLy8gdmlld3NcclxuICAgICAgICB0aWxlczogVGlsZVZpZXdbXVtdO1xyXG5cclxuICAgICAgICAvLyBtb2RlbFxyXG4gICAgICAgIG1vZGVsOiBNYXBNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKG1vZGVsOiBNYXBNb2RlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZW1hcCBjb25zdHJ1Y3RvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aWxlIHZpZXdzIFxyXG4gICAgICAgICAgICB2YXIgbWFwV2lkdGggPSBtYXBFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgdGlsZVNpemUgPSBtYXBXaWR0aCAvIHRoaXMudGlsZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50aWxlQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tpXVtqXSA9IG5ldyBUaWxlVmlldyhpLCBqLCB0aWxlU2l6ZSwgZWxlbWVudCwgdGhpcy5tb2RlbC5UaWxlc1tqXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXcoKSB7XHJcbiAgICAgICAgICAgIC8vIHNjcm9sbGluZyBtZWNoYW5pc21cclxuICAgICAgICAgICAgLy92YXIgbWlkZGxlID0gTWF0aC5mbG9vcih0aGlzLnRpbGVDb3VudCAvIDIpO1xyXG4gICAgICAgICAgICAvL3ZhciBsZWZ0ID0gdGhpcy5tb2RlbC5QbGF5ZXIuWCA8IChtaWRkbGUpID8gMFxyXG4gICAgICAgICAgICAvLyAgOiB0aGlzLm1vZGVsLlBsYXllci5YID4gKHRoaXMubW9kZWwuV2lkdGggLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuV2lkdGggLSB0aGlzLnRpbGVDb3VudFxyXG4gICAgICAgICAgICAvLyAgICA6IHRoaXMubW9kZWwuUGxheWVyLlggLSBtaWRkbGU7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b3AgPSB0aGlzLm1vZGVsLlBsYXllci5ZIDwgKG1pZGRsZSkgPyAwXHJcbiAgICAgICAgICAgIC8vICA6IHRoaXMubW9kZWwuUGxheWVyLlkgPiAodGhpcy5tb2RlbC5IZWlnaHQgLSAxIC0gbWlkZGxlKSA/IHRoaXMubW9kZWwuSGVpZ2h0IC0gdGhpcy50aWxlQ291bnRcclxuICAgICAgICAgICAgLy8gIDogdGhpcy5tb2RlbC5QbGF5ZXIuWSAtIG1pZGRsZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2RlbC5UaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1vZGVsLlRpbGVzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzW2pdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlBsYXllci5YID09IGkgJiYgdGhpcy5tb2RlbC5QbGF5ZXIuWSA9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuVGlsZXNbaV1bal0uSXNQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUuRGlzcGxheSh0aGlzLm1vZGVsLlRpbGVzW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tb2RlbC5UaWxlc1t0aGlzLm1vZGVsLlBsYXllci5YXVt0aGlzLm1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50VGlsZSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKENtMmsxNS5kaXJlY3Rpb25zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gQ20yazE1LmRpcmVjdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gY3VycmVudFRpbGUuQWxsb3dlZE1vdmVzLmluZGV4T2YoZGlyZWN0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1cIiArIGRpcmVjdGlvbiArIFwiLWNvbW1hbmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbW92ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYWxsb3dlZCA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeVZpZXcge1xyXG4gICAgICAgIHByaXZhdGUgc3RvcnlFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0b3J5SW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeUVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcnktaW1hZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3KG1vZGVsOiBTdG9yeU1vZGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlFbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3J5RWxlbWVudC5pbm5lckhUTUwgPSBtb2RlbC5TdG9yeTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5SW1hZ2VFbGVtZW50LnN0eWxlLnpJbmRleCA9ICcyJztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnlJbWFnZUVsZW1lbnQuY2xhc3NOYW1lID0gJ3N0b3J5LScgKyBtb2RlbC5JZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIENtMmsxNSB7XHJcbiAgICBlbnVtIEdpZnR7XHJcbiAgICAgICAgS2lzdm9uYXQsXHJcbiAgICAgICAgU3phbmtvLFxyXG4gICAgICAgIEhpbnRhbG9cclxuICAgIH1cclxuXHJcbiAgICBlbnVtIEdpZnRTdGF0ZXtcclxuICAgICAgICBOb25lLFxyXG4gICAgICAgIENvbXBvbmVudCxcclxuICAgICAgICBBc3NlbWJsZSxcclxuICAgICAgICBQYWludCxcclxuICAgICAgICBNYWdpYyxcclxuICAgICAgICBEb25lXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5TGluZVNldHRlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBnYW1lQWdlbnQ6IElHYW1lQWdlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjaG9vc2VuR2lmdDogR2lmdDtcclxuICAgICAgICBwcml2YXRlIGdpZnRTdGF0ZTogR2lmdFN0YXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoZ2FtZUFnZW50OklHYW1lQWdlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQgPSBnYW1lQWdlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdFN0YXRlID0gR2lmdFN0YXRlLk5vbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlQnkoc3Rvcnk6U3RvcnlNb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0b3J5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChzdG9yeS5JZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYm0nOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvR2lmdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Db21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVPbkZhY3RvcnlNYXBbMl1bMV0gPSAncic7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuQXNzZW1ibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVPbkZhY3RvcnlNYXBbMl1bMV0gPSAndSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdibCc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5naWZ0U3RhdGUgPT0gR2lmdFN0YXRlLk5vbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0U3RhdGUgPSBHaWZ0U3RhdGUuQ29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ2JtJ10uU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbJ2JtMiddLlN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuQ29tcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5Bc3NlbWJsZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RtJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuUGFpbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVPbkZhY3RvcnlNYXBbMV1bMV0gPSAnbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0bTInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5NYWdpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlT25GYWN0b3J5TWFwWzFdWzFdID0gJ3UnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRTdGF0ZSA9IEdpZnRTdGF0ZS5Eb25lO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ3RtJ10uU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbJ3RtMyddLlN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ3RtJ10uSWQgPSAndG0nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdpZnRTdGF0ZSA9PSBHaWZ0U3RhdGUuQXNzZW1ibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdFN0YXRlID0gR2lmdFN0YXRlLlBhaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5QYWludCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdFN0YXRlID0gR2lmdFN0YXRlLk1hZ2ljO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ3RtJ10uU3RvcnkgPSBzdG9yaWVzVGlsZU1hcHBpbmdbJ3RtMiddLlN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzVGlsZU1hcHBpbmdbJ3RtJ10uSWQgPSAndG0yJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsxXVsxXSA9ICd1JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVTaG93R2lmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2kyJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcnlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3J5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmlkID09ICdmaW5pc2gnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5pc2hHYW1lLmFwcGx5KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5nYW1lQWdlbnQuUmVsb2FkTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LkRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHN0b3J5LklkID09ICd0bTInICYmIHRoaXMuZ2lmdFN0YXRlID09IEdpZnRTdGF0ZS5Eb25lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVhbE1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN1YnNjcmliZVNob3dHaWZ0KCl7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3J5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZTphbnkpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQuaWQgPT0gJ3Nob3dnaWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ3RsJ10uSWQgPSB0aGF0LmNob29zZW5HaWZ0ID09IEdpZnQuSGludGFsbyA/ICdoaW50YWxvJyA6IHRoYXQuY2hvb3NlbkdpZnQgPT0gR2lmdC5TemFua28gPyAnc3phbmtvJyA6ICdraXN2b25hdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1sndGwnXS5TdG9yeSA9IENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ3RsMiddLlN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2FtZUFnZW50LlJlbG9hZE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2FtZUFnZW50LkRyYXcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZpbmlzaEdhbWUoKXtcclxuICAgICAgICAgICAgQ20yazE1LmNhbk1vdmVPbkJhcm5NYXBbMV1bMF0gPSAnJztcclxuICAgICAgICAgICAgQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1snYjInXS5TdG9yeSA9IENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ2NyZWRpdCddLlN0b3J5O1xyXG4gICAgICAgICAgICBDbTJrMTUuc3Rvcmllc1RpbGVNYXBwaW5nWydiMiddLklkID0gQ20yazE1LnN0b3JpZXNUaWxlTWFwcGluZ1snY3JlZGl0J10uSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LlJlbG9hZE1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVBZ2VudC5EcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJldmVhbE1hcCgpe1xyXG4gICAgICAgICAgICBDbTJrMTUuY2FuTW92ZU9uRmFjdG9yeU1hcFsxXVsxXSA9ICd1ZGxyJztcclxuICAgICAgICAgICAgQ20yazE1LmNhbk1vdmVPbkZhY3RvcnlNYXBbMl1bMV0gPSAndWRscic7XHJcbiAgICAgICAgICAgIENtMmsxNS5jYW5Nb3ZlT25CYXJuTWFwWzFdWzBdID0gJ3VyJztcclxuXHJcbiAgICAgICAgICAgIENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ2InXSA9IENtMmsxNS5zdG9yaWVzVGlsZU1hcHBpbmdbJ2IyJ107XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LlJldmVhbE1hcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0dpZnRzKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBnaWZ0Q29tcG9uZW50TWFwOntba2V5OnN0cmluZ106IHN0cmluZ30gPSB7fSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUJNID0gZ2lmdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZU9uRmFjdG9yeU1hcFsyXVsxXSA9ICdsJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1RpbGVNYXBwaW5nWydibSddLlN0b3J5ID0gc3Rvcmllc1RpbGVNYXBwaW5nWydibV9jaG9zZW4nXS5TdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnezB9JywgZ2lmdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3sxfScsIGdpZnRDb21wb25lbnRNYXBbdGhhdC5jaG9vc2VuR2lmdF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LlJlbG9hZE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUFnZW50LkRyYXcoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBnaWZ0Q29tcG9uZW50TWFwW0dpZnQuS2lzdm9uYXRdID0gJ27DqWjDoW55IGZha29ja2EsIHDDoXIgaGVuZ2VyIMOpcyBlZ3kga8OpbcOpbnknO1xyXG4gICAgICAgICAgICBnaWZ0Q29tcG9uZW50TWFwW0dpZnQuSGludGFsb10gPSAncGzDvHNzIGJvcsOtdMOhcywgZmEgdGFscCDDqXMgbnllcmVnJztcclxuICAgICAgICAgICAgZ2lmdENvbXBvbmVudE1hcFtHaWZ0LlN6YW5rb10gPSAnbsOpaMOhbnkgZmEgbMOpYywgZWd5IGthcGFzemtvZMOzIMOpcyBrw7Z0w6lsJztcclxuXHJcbiAgICAgICAgICAgIHZhciBzdG9yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yeScpO1xyXG5cclxuICAgICAgICAgICAgc3RvcnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLnRhcmdldC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdoaW50YWxvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hvb3NlbkdpZnQgPSBHaWZ0LkhpbnRhbG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVCTSgnaGludGFsb3ZhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tpc3ZvbmF0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hvb3NlbkdpZnQgPSBHaWZ0Lktpc3ZvbmF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlQk0oJ2tpc3ZvbmEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3phbmtvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hvb3NlbkdpZnQgPSBHaWZ0LlN6YW5rbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUJNKCdzesOhbmvDsycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZGVsL01hcE1vZGVsLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9NYXBWaWV3LnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmlldy9TdG9yeVZpZXcudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdG9yeUxpbmVTZXR0ZXIudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdhbWVBZ2VudCB7XHJcbiAgICAgICAgRHJhdygpO1xyXG4gICAgICAgIFJlbG9hZE1hcCgpO1xyXG4gICAgICAgIFJldmVhbE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgICAgICBwcml2YXRlIG1hcFZpZXc6TWFwVmlldztcclxuICAgICAgICBwcml2YXRlIG1hcE1vZGVsOk1hcE1vZGVsO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0b3J5VmlldzpTdG9yeVZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yeUxpbmVTZXR0ZXI6U3RvcnlMaW5lU2V0dGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbW1hbmRzOnsgW2tleTogc3RyaW5nXTogKGFyZ3MpID0+IGFueSB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgc3RhdGUgYW5kIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIHRoaXMubWFwTW9kZWwgPSBuZXcgTWFwTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBtYXAgdmlld1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcgPSBuZXcgTWFwVmlldyh0aGlzLm1hcE1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeVZpZXcgPSBuZXcgU3RvcnlWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFnZW50OklHYW1lQWdlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3OiAoKSA9PiB0aGlzLkRyYXcoKSxcclxuICAgICAgICAgICAgICAgIFJlbG9hZE1hcDogKCkgPT4gdGhpcy5tYXBNb2RlbC5SZWxvYWRNYXAuY2FsbCh0aGlzLm1hcE1vZGVsKSxcclxuICAgICAgICAgICAgICAgIFJldmVhbE1hcDogKCkgPT4gdGhpcy5SZXZlYWxNYXAoKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUxpbmVTZXR0ZXIgPSBuZXcgU3RvcnlMaW5lU2V0dGVyKGFnZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kcygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZCgnbW92ZScsIHRoaXMubW92ZUNvbW1hbmQpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkxlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuVXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuUmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuRG93bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLXVwLWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLlVwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtZG93bi1jb21tYW5kJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21tYW5kKCdtb3ZlICcgKyBDbTJrMTUuZGlyZWN0aW9ucy5Eb3duKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtcmlnaHQtY29tbWFuZCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tbWFuZCgnbW92ZSAnICsgQ20yazE1LmRpcmVjdGlvbnMuUmlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1sZWZ0LWNvbW1hbmQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbW1hbmQoJ21vdmUgJyArIENtMmsxNS5kaXJlY3Rpb25zLkxlZnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3RlckNvbW1hbmQoa2V5OnN0cmluZywgY29tbWFuZDooYXJncykgPT4gYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNba2V5XSA9IGNvbW1hbmQuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Db21tYW5kKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gcGFydHNbMF07XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzLnNwbGljZSgxLCBwYXJ0cy5sZW5ndGggLSAxKSA6IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kc1tjb21tYW5kXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlQ29tbWFuZChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5tYXBNb2RlbC5QbGF5ZXIuSXNJblN0b3J5KVxyXG4gICAgICAgICAgICAvLyAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaWxlID0gdGhpcy5tYXBNb2RlbC5UaWxlc1t0aGlzLm1hcE1vZGVsLlBsYXllci5YXVt0aGlzLm1hcE1vZGVsLlBsYXllci5ZXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaWxlLkFsbG93ZWRNb3Zlcy5pbmRleE9mKGRpcmVjdGlvbikgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VycmUgbmVtIG1laGV0c3onO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubWFwTW9kZWwuTW92ZVBsYXllcihkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzdG9yeSA9IHRoaXMubWFwTW9kZWwuR2V0Q3VycmVudFN0b3J5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yeUxpbmVTZXR0ZXIuVXBkYXRlQnkoc3RvcnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBEcmF3KCkge1xyXG4gICAgICAgICAgICB2YXIgc3RvcnkgPSB0aGlzLm1hcE1vZGVsLkdldEN1cnJlbnRTdG9yeSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Vmlldy5EcmF3KHN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LkRyYXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV2ZWFsTWFwKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcE1vZGVsLlJldmVhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJHYW1lLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICB2YXIgZ2FtZSA9IG5ldyBDbTJrMTUuR2FtZSgpO1xyXG59XHJcbiAiLCJtb2R1bGUgQ20yazE1IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZU1vZGVsIHtcclxuICAgICAgICBwdWJsaWMgUGxheWVyOiBQbGF5ZXJNb2RlbDtcclxuICAgICAgICBwdWJsaWMgVGlsZXM6IFRpbGVNb2RlbFtdW107XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
