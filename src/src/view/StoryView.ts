module Cm2k15 {
  export class StoryView {
    private storyElement: HTMLDivElement;

    constructor() {
        this.storyElement = <HTMLDivElement>document.getElementById('story');
    }

    public Draw(model: StoryModel) {
        if (!model) {
            this.storyElement.innerText = "";
        return;
      }

        this.storyElement.innerText = model.Story;
    }
  }
}