module Cm2k15 {
    export interface IMapTransport {
        map: string[][];
        movements: string[][];
        tile: string;
    }

    export var gamemap: string[][];
    export var factorymap: string[][];
    export var villagemap: string[][];
    export var villagemap: string[][];
    export var barnmap: string[][];

    export var canMoveOnMap: string[][];
    export var canMoveOnFactoryMap: string[][];
    export var canMoveOnVillageMap: string[][];
    export var canMoveOnBarnMap: string[][];

    export var mapTransports: { [key: string]: IMapTransport };
    export var ignoreTiles: string[] = [];

    gamemap = [
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
    canMoveOnMap = [
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

    factorymap = [
        ['-', 'texit', '-'],
        ['tl', 'tm', 'tr'],
        ['bl', 'bm', 'br'],
        ['-', 'bexit', '-']
    ];

    canMoveOnFactoryMap = [
        ['', '', ''],
        ['r', 'r', 'l'],
        ['r', '', 'l'],
        ['', 'u', '']
    ];

    ignoreTiles = ignoreTiles.concat(['texit','bexit','tl','tm','tr','bl','bm','br','bexit']);

    villagemap = [
        ["m", "rexitv"],
        ["bexitv", "-"],
    ];
    canMoveOnVillageMap = [
        ['dr',''],
        ['','']
    ];
    ignoreTiles = ignoreTiles.concat(['m','rexitv','bexitv']);

    barnmap = [
        ["texitb", "-"],
        ["b", "rexitb"],
    ];
    canMoveOnBarnMap = [
        ['',''],
        ['r','']
    ];
    ignoreTiles = ignoreTiles.concat(['b','texitb','rexitb']);

    mapTransports = {
        // map => factorymap
        'g13': { map: factorymap, movements: canMoveOnFactoryMap , tile: 'bexit' },
        'g3': { map: factorymap, movements: canMoveOnFactoryMap , tile: 'tm' },

        // map => villagemap
        'm8': { map: villagemap, movements: canMoveOnVillageMap, tile: 'm' },
        'm7': { map: villagemap, movements: canMoveOnVillageMap, tile: 'm' },

        // map => barnmap
        'i1': { map: barnmap, movements: canMoveOnBarnMap, tile: 'b' },
        'i5': { map: barnmap, movements: canMoveOnBarnMap, tile: 'b' },

        // factorymap => map
        'bexit': { map: gamemap, movements: canMoveOnMap, tile: 'l' },
        'texit': { map: gamemap, movements: canMoveOnMap, tile: 'u5g' },

        // villagemap => map
        'rexitv': { map: gamemap, movements: canMoveOnMap, tile: 'u1v' },
        'bexitv': { map: gamemap, movements: canMoveOnMap, tile: 'u5v' },

        // barnmap => map
        'rexitb': { map: gamemap, movements: canMoveOnMap, tile: 'u1b' },
        'texitb': { map: gamemap, movements: canMoveOnMap, tile: 'u5b' },
    };
}