module Cm2k15 {
    export class TileView {
        private element: HTMLDivElement;
        private content: string;
        private model: TileModel;

        public constructor(row: number, col: number, size: number, element: HTMLDivElement, model: TileModel) {
            this.element = element;
            this.content = '';
            this.model = model;
            this.initialize(row, col, size);
        }

        private initialize(row: number, col: number, size: number) {
            this.element.style.top = row * size + 'px';
            this.element.style.left = col * size + 'px';
            this.element.style.width = this.element.style.height = size + 'px';
            this.element.className = 'tile';
        }

        public Display() { 
            if (this.model.IsVisited) {
                this.element.style.backgroundColor = '#e3e3e3';
                this.element.style.backgroundImage = "url('images/" + this.model.Type + ".png')";
            } else {
                this.element.style.background = '#363636';                
            }

            if (this.model.IsPlayer) {
                this.element.innerText = '[x]';
            } else {                
                this.element.innerText = '';
            }
        }
    }
}