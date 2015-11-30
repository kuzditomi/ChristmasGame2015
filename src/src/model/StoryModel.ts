module Cm2k15 {
    export class StoryModel {
        public Id: string;
        public Story: string;

        constructor(id: string, story: string) {
            this.Id = id;
            this.Story = story;
        }
    }
}