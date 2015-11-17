module Cm2k15 {
  export class GameTile {
    private element: HTMLDivElement;

    public constructor(row: number, col: number, size: number, element: HTMLDivElement) {
      console.log('gametile constructor:' + row + ',' + col);
      this.element = element;
      this.initialize(row,col,size);
    }

    private initialize(row: number, col: number, size: number){
      this.element.style.top = row*size + 'px';
      this.element.style.left = col*size + 'px';
      this.element.style.width = this.element.style.height = size + 'px';
      this.element.className = 'tile';
    }

    public Reset(){
      this.element.innerText = "";
    }

    public Set(text: string){
      this.element.innerText = text;
    }
  }
}