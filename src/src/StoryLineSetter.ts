module Cm2k15 {
    export class StoryLineSetter {
        private gameAgent: IGameAgent;
        public constructor(gameAgent: IGameAgent){
            this.gameAgent = gameAgent;
        }

        public UpdateBy(story: StoryModel){
            if(!story)
                return;

            switch (story.Id) {
                case 'tm':
                    canMoveOnBarnMap[1][0] += 'u';
                    break;
                case 'bm':
                    this.subscribeToGifts();
                    break;
                default :
                    return;
            }

            this.gameAgent.Draw();
        }

        private subscribeToGifts(){
            var enableBM = ()=>{
                canMoveOnFactoryMap[2][1] = 'udlr';
                this.gameAgent.ReloadMap();
                this.gameAgent.Draw();
            };

            var story = document.getElementById('story');

            story.addEventListener('click', (e:any) => {
                if(e && e.target && e.target.id == 'hintalo')
                    enableBM();
            });
        }
    }
}