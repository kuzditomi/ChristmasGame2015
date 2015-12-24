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
        'bexit': new StoryModel('bexit',
            'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'
        ),
        'bm': new StoryModel('bm',
            'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslaT... Mivel ilyen jó voltál idén – mondja a manó és elfordul átjavítani a statisztikád -, választhatsz egy ajándékot a Mikulásgyárból:' +
            '<ul><li class="ajandek" id="szanko">Szánkó</li><li class="ajandek" id="hintalo">Hintaló</li><li class="ajandek" id="kisvonat">Kisvonat</li></ul>'
        ),
        'bm2': new StoryModel('bm',
            'Üdv újra a gyárban'
        ),
        'bexit2': new StoryModel('bexit2',
            'Ez a bejárat a gyárba.'
        ),
        'tl': new StoryModel('tl',
            'MAGIC!'
        ),
        'tm': new StoryModel('tm',
            'Jobbra festegethesz, balra pedig minden értelmet nyer. Az meg a hátsó kijárat az erdő felé.'
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

    };

    twoStateStores = ["bexit", "bm"];
}