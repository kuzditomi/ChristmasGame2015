/// <reference path="../model/TileModel.ts"/>
module Cm2k15 {
    export class TileView {
        private element: HTMLDivElement;
        private content: string;

        public constructor(row: number, col: number, size: number, element: HTMLDivElement, model: TileModel) {
            this.element = element;
            this.content = '';
            this.initialize(row, col, size);
        }

        private initialize(row: number, col: number, size: number) {
            this.element.style.top = row * size + 'px';
            this.element.style.left = col * size + 'px';
            this.element.style.width = this.element.style.height = size + 'px';
            this.element.className = 'tile';
        } 

        public Display(model: TileModel) { 
            if (model.IsVisited) {
                this.element.style.backgroundColor = '#e3e3e3';
                this.element.style.backgroundImage = "url('images/" + model.Type + ".png')";
            } else {
                this.element.style.background = '#363636';                
            }

            if (model.IsPlayer) {
                this.element.className = 'tile player';
            } else {                
                this.element.className = 'tile';
            }
        }
    }
}