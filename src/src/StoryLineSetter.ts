module Cm2k15 {
    enum Gift{
        Kisvonat,
        Szanko,
        Hintalo
    }

    enum GiftState{
        None,
        Component,
        Assemble,
        Paint,
        Magic,
        Done
    }

    export class StoryLineSetter {
        private gameAgent: IGameAgent;
        private choosenGift: Gift;
        private giftState: GiftState;

        public constructor(gameAgent:IGameAgent) {
            this.gameAgent = gameAgent;
            this.giftState = GiftState.None;
        }

        public UpdateBy(story:StoryModel) {
            var that = this;

            if (!story)
                return;

            switch (story.Id) {
                case 'bm':
                    if(this.giftState == GiftState.None)
                        this.subscribeToGifts();
                    else if(this.giftState == GiftState.Component)
                        canMoveOnFactoryMap[2][1] = 'r';
                    else if(this.giftState == GiftState.Assemble)
                        canMoveOnFactoryMap[2][1] = 'u';
                    break;
                case 'bl':
                    if(this.giftState == GiftState.None)
                        this.giftState = GiftState.Component;
                    break;
                case 'br':
                    if(this.giftState == GiftState.Component)
                        this.giftState = GiftState.Assemble;
                    break;
                case 'tm':
                    if(this.giftState == GiftState.Paint)
                        canMoveOnFactoryMap[1][1] = 'l';

                    storiesTileMapping['bm'].Story = storiesTileMapping['bm2'].Story;
                    break;
                case 'tm2':
                    if(this.giftState == GiftState.Magic) {
                        canMoveOnFactoryMap[1][1] = 'u';
                        this.giftState = GiftState.Done;
                    }
                    break;
                case 'tr':
                    if(this.giftState == GiftState.Assemble)
                        this.giftState = GiftState.Paint;
                    break;
                case 'tl':
                    if(this.giftState == GiftState.Paint){
                        this.giftState = GiftState.Magic;
                        storiesTileMapping['tm'].Story = storiesTileMapping['tm2'].Story;
                        storiesTileMapping['tm'].Id = 'tm2';
                        canMoveOnFactoryMap[1][1] = 'u';
                    }
                    break;
                case 'i2':
                    var story = document.getElementById('story');

                    story.addEventListener('click', (e:any) => {
                       if(e.target && e.target.id == 'finish'){
                           that.finishGame.apply(that);
                       }
                    });
                    break;
                default :
                    return;
            }

            this.gameAgent.ReloadMap();
            this.gameAgent.Draw();

            if(story.Id == 'tm2' && this.giftState == GiftState.Done){
                this.revealMap();
            }
        }

        private finishGame(){
            Cm2k15.canMoveOnBarnMap[1][0] = '';
            Cm2k15.storiesTileMapping['b2'].Story = Cm2k15.storiesTileMapping['credit'].Story;
            Cm2k15.storiesTileMapping['b2'].Id = Cm2k15.storiesTileMapping['credit'].Id;
            this.gameAgent.ReloadMap();
            this.gameAgent.Draw();
        }

        private revealMap(){
            Cm2k15.canMoveOnFactoryMap[1][1] = 'udlr';
            Cm2k15.canMoveOnFactoryMap[2][1] = 'udlr';
            Cm2k15.canMoveOnBarnMap[1][0] = 'ur';

            Cm2k15.storiesTileMapping['b'] = Cm2k15.storiesTileMapping['b2'];
        }

        private subscribeToGifts() {
            var that = this,
                giftComponentMap:{[key:string]: string} = {},
                enableBM = gift => {
                    canMoveOnFactoryMap[2][1] = 'l';

                    storiesTileMapping['bm'].Story = storiesTileMapping['bm_chosen'].Story
                        .replace('{0}', gift)
                        .replace('{1}', giftComponentMap[that.choosenGift]);
                    this.gameAgent.ReloadMap();
                    this.gameAgent.Draw();
                };

            giftComponentMap[Gift.Kisvonat] = 'néhány fakocka, pár henger és egy kémény';
            giftComponentMap[Gift.Hintalo] = 'plüss borítás, fa talp és nyereg';
            giftComponentMap[Gift.Szanko] = 'néhány fa léc, egy kapaszkodó és kötél';

            var story = document.getElementById('story');

            story.addEventListener('click', (e:any) => {
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
        }
    }
}