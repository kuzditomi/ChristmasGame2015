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
        Magic
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
            if (!story)
                return;

            switch (story.Id) {
                case 'tm':
                    canMoveOnBarnMap[1][0] += 'u';
                    break;
                case 'bm':
                    if(this.giftState == GiftState.None)
                        this.subscribeToGifts();
                    else if(this.giftState == GiftState.Component)
                        canMoveOnFactoryMap[2][1] = 'r';
                    break;
                case 'bl':
                    this.giftState = GiftState.Component;
                    break;
                default :
                    return;
            }

            this.gameAgent.ReloadMap();
            this.gameAgent.Draw();
        }

        private subscribeToGifts() {
            var that = this,
                giftComponentMap:{[Gift]: string} = {},
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