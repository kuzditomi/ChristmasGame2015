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
            var classes = ['tile'];

            if (model.IsVisited && Cm2k15.ignoreTiles.indexOf(model.Type) == -1) {
                classes.push("tile-" + model.Type);
            } else {
                classes.push('dark');
            }

            if (model.IsPlayer) {
                classes.push("player");
            }

            this.element.className = classes.join(' ');
        }
    }
}