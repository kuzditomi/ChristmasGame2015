module Cm2k15 {
    export var storiesTileMapping: { [key: string]: StoryModel };
    export var twoStateStores: string[];

    storiesTileMapping = {
        'kb': new StoryModel('kb',
            'Ez a bejárat!'
        ),
        'i5': new StoryModel('i5',
            'Ez az istálló, itt találod a készülődő manókat, akik tankolják a szánt, polírozzák Rudolf orrát, és várják Mikulást.'
        ),
        'bexit': new StoryModel('bexit',
            'Szia! Megtaláltad a Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom!'
        ),
        'bexit2': new StoryModel('bexit2',
            'Ez a bejárat a gyárba.'
        ),
    };

    twoStateStores = ["bexit"];

}