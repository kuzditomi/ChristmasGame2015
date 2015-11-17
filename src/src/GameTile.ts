module Cm2k15 {
  export class GameTile {
    private element: HTMLDivElement;
    private flags: string[];
    private content: string;

    public constructor(row: number, col: number, size: number, element: HTMLDivElement) {
      //console.log('gametile constructor:' + row + ',' + col);
      this.element = element;
      this.content = '';
      this.flags = ['tile'];
      this.initialize(row,col,size);
    }

    private initialize(row: number, col: number, size: number){
      this.element.style.top = row*size + 'px';
      this.element.style.left = col*size + 'px';
      this.element.style.width = this.element.style.height = size + 'px';
      this.element.className = 'tile';
    }

    public Reset(){
      this.content = '';
    }

    public Set(text: string){
      this.content = text;
    }

    public SetState(flag: string, on: boolean){
      var index = this.flags.indexOf(flag);

      if(on && index == -1){
        this.flags.push(flag);
        return;
      }

      if(!on && index != -1){
        this.flags.splice(index, 1);
      }
    }

    public Display(){
      this.element.className = this.flags.join(' ');
      this.element.innerText = this.content;
    }
  }
}