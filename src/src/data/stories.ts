module Cm2k15 {
    export var storiesTileMapping: { [key: string]: StoryModel };
    export var twoStateStores: string[];

    storiesTileMapping = {
        'kb': new StoryModel('kb',
            'Üdv a játékban. Nyertél egy jegyet a Mikulásgyárba, találkozhatsz sok varázslattal, és ha jó voltál, még ajándékot is kaphatsz.'
        ),
        'b': new StoryModel('i5',
            'Ez az istálló, innen indul és érkezik a télapó. A manók épp takarítanak, tankolnak, polírozzák Rudolf orrát. Üresnek találod, még nem érkezett el az idő az indulásra.'
        ),
        'b2': new StoryModel('i2',
            'Épp indul Mikulás. Felszállsz?<a id="finish">Igen</a>'
        ),
        'bexit': new StoryModel('bexit',
            'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'
        ),
        'bm': new StoryModel('bm',
            'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslaT... Mivel ilyen jó voltál idén – mondja a manó és elfordul átjavítani a statisztikád -, választhatsz egy ajándékot a Mikulásgyárból:' +
            '<ul><li class="ajandek" id="szanko">Szánkó</li><li class="ajandek" id="hintalo">Hintaló</li><li class="ajandek" id="kisvonat">Kisvonat</li></ul>'
        ),
        'bm_chosen': new StoryModel('bm_chosen',
            'Á szóval a {0}t választottad! Nézzük csak hogy tudod elkészíteni...<br/>' +
            '<ul><li>Kell majd bele {1} a raktár szobából,</li><li>az ügyes manók a műhelyben összeszerelik neked,</li><li> a festő szobában megkapja a színeit,</li><li> és végül ellátjuk a karácsony szellemével&trade;.</li></ul>'
        ),
        'bm2': new StoryModel('bm',
            'A gyár előszobájában vagy.'
        ),
        'bexit2': new StoryModel('bexit2',
            'Ez a bejárat a gyárba.'
        ),
        'tl': new StoryModel('tl',
            'MAGIC! <a id="showgift">MEGNÉZEM</a>'
        ),
        'tl2': new StoryModel('tl2',
            'Szép lett. Grat'
        ),
        'tm': new StoryModel('tm',
            'Jobbra festegethesz, balra pedig minden értelmet nyer. Az meg a hátsó kijárat az erdő felé.'
        ),
        'tm2': new StoryModel('tm2',
            'Nagyon szép lett a játékod! A mikulás nemsokára indul, megtalálod az istállónál, addig nyugodtan nézz körül a birtokon.'
        ),
        'tm3': new StoryModel('tm',
            'A gyár hátsó folyosóján vagy.'
        ),
        'tr': new StoryModel('tr',
            'Ez a festős szoba.'
        ),
        'bl': new StoryModel('bl',
            'Ez itt a raktár szoba.'
        ),
        'br': new StoryModel('br',
            'Ez itt a szerelős szoba.'
        ),
        'm': new StoryModel('m',
            'Manó falva'
        ),
        'e20': new StoryModel('e20',
            'Erdeő'
        ),
        'h1': new StoryModel('h1',
            'Tavacska'
        ),
        'credit': new StoryModel('credit',
            'Boldog karácsonyt, köszi a játékot.'
        ),

    };

    twoStateStores = ["bexit", "bm"];
}