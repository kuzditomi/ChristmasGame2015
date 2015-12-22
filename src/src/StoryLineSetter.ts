module Cm2k15 {
    export class StoryLineSetter {

        public UpdateBy(story: StoryModel){
            if(story && story.Id == 'tm')
                canMoveOnBarnMap[1][0] += 'u';
        }
    }
}