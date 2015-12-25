module Cm2k15 {
    export var storiesTileMapping: { [key: string]: StoryModel };
    export var twoStateStores: string[];

    storiesTileMapping = {
        's' : new StoryModel('s',
            'Szia! Ez az idei karácsonyi játékunk, sok szeretettel és gondoskodással készítettük számodra. Ez egy kalandjáték, ahol a feladataid közé tartozik a térképen előrejutni - ezt a nyilak segítségével teheted meg, illetve különböző feladatok teljesítése. Jó szórakozást hozzá!'
        ),
        'kb': new StoryModel('kb',
            'Üdv a játékban. Nyertél egy jegyet a Mikulásgyárba, találkozhatsz sok varázslattal, és ha jó voltál, még ajándékot is kaphatsz.'
        ),
        'b': new StoryModel('i5',
            'Ez az istálló, innen indul és ide érkezik a télapó. A manók épp takarítanak, tankolnak, polírozzák Rudolf orrát. Üresnek találod, még nem érkezett el az idő az indulásra.'
        ),
        'b2': new StoryModel('i2',
            'Épp indul Mikulás. Felszállsz?<a id="finish" class="btn">Igen</a>'
        ),
        'bexit': new StoryModel('bexit',
            'Szia! Megtaláltad Mikulás gyárát, én leszek a kalauzod. Ameddig Mikulás készülődik, megismerheted a műhelyét, sőt ki is próbálhatod! Gyere beljebb, megmutatom hogyan!'
        ),
        'bm': new StoryModel('bm',
            'Hát íme. Balra találod a raktárat, jobbra a műhelyt, a következő folyosón pedig megtalálod a festőszobát. És hogy mit rejt a negyedik ajtó? Egy kis varázslatot... Mivel ilyen jó voltál idén – mondja a manó és elfordul átjavítani a statisztikád -, választhatsz egy ajándékot a Mikulásgyárból:' +
            '<div class="btn" id="szanko">Szánkó</div><div class="ajandek btn" id="hintalo">Hintaló</div><div class="ajandek btn" id="kisvonat">Kisvonat</div>'
        ),
        'bm_chosen': new StoryModel('bm_chosen',
            'Á, szóval a {0}t választottad! Nézzük csak hogy tudod elkészíteni...<br/>' +
            '<ul><li>Kell majd bele {1} a raktár szobából,</li><li>az ügyes manók a műhelyben összeszerelik neked,</li><li> a festő szobában megkapja a színeit,</li><li> és végül ellátjuk a karácsony szellemével&trade;.</li></ul>'
        ),
        'bm2': new StoryModel('bm',
            'A gyár előszobájában vagy. Jobbra találod a műhelyt, a festő szoba pedig a következő folyosón van.'
        ),
        'bexit2': new StoryModel('bexit2',
            'Ez a bejárat a gyárba.'
        ),
        'tl': new StoryModel('tl',
            'Félénken nyitsz be a szobába, de hamar rájössz, hogy itt történik a varázslat. A kívánt játékod ezzel az adalékkal elkészült! <a class="btn" id="showgift">MEGNÉZEM</a>'
        ),
        'tl2': new StoryModel('tl2',
            'Szép lett! Örömmel távozol a varázslatos szobából azon tanakodva, hogy lesz-e esélyed találkozni Mikulással.'
        ),
        'tm': new StoryModel('tm',
            'Jobbra festheted le az ajándékod. A bal oldali ajtó mögül mindenféle fura hangok, zajok és színes fények szűrődnek ki. Az az ajtó pedig a hátsó kijárat az erdő felé.'
        ),
        'tm2': new StoryModel('tm2',
            'Nagyon szép lett a játékod, gratulálok az elkészítéséhez, több ilyen szorgos kézre lenne szükségünk! Mikulás nemsokára indul, megtalálod az istállónál, addig nyugodtan nézz körül a birtokon.'
        ),
        'tm3': new StoryModel('tm',
            'A gyár hátsó folyosóján vagy.'
        ),
        'tr': new StoryModel('tr',
            'Ez a festős szoba. Minden manó elfoglalt, így a festést neked kell megoldanod. Ehhez szerencsére rengeteg festéket és ecsetet hagytak a manók. Miután összepingáltad az ajándékod, hatalmas kíváncsiság tör rád az utolsó szobával kapcsolatban. Nézd meg, mi rejtőzhet az ajtó mögött!'
        ),
        'bl': new StoryModel('bl',
            'Ez itt a raktár. Egy bent sertepertélő manó a segítségedre siet, a kezedbe nyomja az ajándékod elkészítéséhez szükséges alapanyagokat. Megköszönöd neki. Irány összeszerelni!'
        ),
        'br': new StoryModel('br',
            'Ez itt Mikulás műhelye. Egy zöld sityakos manó épp az egyik ajándékdobozzal bohóckodik, KIVÁLÓ A HANGULAT, amikor betoppansz. Először megrémül, majd fülig érő mosollyal odarohan hozzád, kiveszi az alkatrészeket a kezedből és egy pillanat alatt összeszereli. Már csak egy kis festés hiányzik!'
        ),
        'm': new StoryModel('m',
            'Ez a gyár közelében található apró falucska ad otthont a gyárban dolgozó NAGYON SZORGOS manók számára. A házuk úgy tűnhet, hogy mézeskalácsból van, de eszedbe ne jusson belekóstolni!'
        ),
        'e20': new StoryModel('e20',
            'Ez a gyárhoz tartozó erdő, innen nyerik a manók az ajándékok KIVÁLÓ MINŐSÉGŰ alapanyagát.'
        ),
        'h1': new StoryModel('h1',
            'Ebben a tavacskában pihennek a pingvinek, amikor épp nem kell besegíteni a manóknak, vagy épp nem beöltözőset játszanak.'
        ),
        'credit': new StoryModel('credit',
            'Boldog karácsonyt kívánunk, köszi, hogy végigjátszottad az idei játékunk! <br/>Réka és Tomi'
        ),

    };

    twoStateStores = ["bexit", "bm"];
}