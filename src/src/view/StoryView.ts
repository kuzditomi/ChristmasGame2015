module Cm2k15 {
    export class StoryView {
        private storyElement: HTMLDivElement;
        private storyImageElement: HTMLImageElement;

        constructor() {
            this.storyElement = <HTMLDivElement>document.getElementById('story');
            this.storyImageElement = <HTMLImageElement>document.getElementById('story-image');
        }

        public Draw(model: StoryModel) {
            if (!model) {
                this.storyElement.innerText = "";
                this.storyImageElement.style.display = 'none';
                return;
            }

            this.storyElement.innerText = model.Story;

            this.storyImageElement.src = 'images/story/' + model.Id + '.png';
            this.storyImageElement.style.display = 'inline-block';
            this.storyImageElement.style.zIndex = '2';
        }
    }
} 