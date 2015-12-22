module Cm2k15 {
    export var storiesTileMapping: { [key: string]: StoryModel };
    export var twoStateStores: string[];

    storiesTileMapping = {
        'kb': new StoryModel('kb',
            'Ez a bejárat!'
        ),
        'b': new StoryModel('i5',
            'Ez az istálló, itt találod a készülődő manókat, akik tankolják a szánt, polírozzák Rudolf orrát, és várják Mikulást.'
        ),
        'bexit': new StoryModel('bexit',
            'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'
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
        'bm': new StoryModel('bm',
            'Üdv a gyárban, balra van a raktár, jobbra a szerelő szoba, arra előre pedig egy következő folyosó.'
        ),
        'm': new StoryModel('m8',
            'Manó falva'
        ),
        'e20': new StoryModel('e20',
            'Erdeő'
        ),
        'h1': new StoryModel('h1',
            'Tavacska'
        ),

    };

    twoStateStores = ["bexit"];
}