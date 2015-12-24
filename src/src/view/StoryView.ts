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
                this.storyImageElement.className = '';
                return;
            }

            this.storyElement.innerHTML = model.Story;

            this.storyImageElement.style.display = 'inline-block';
            this.storyImageElement.style.zIndex = '2';

            this.storyImageElement.className = 'story-' + model.Id;
        }
    }
} 