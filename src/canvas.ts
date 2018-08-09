import {Color} from "./enums";

export type CellSize = 1 | 2 | 3 | 4 | 5;

export class Canvas {
    constructor(cellSize: CellSize) {
        this._cellSizePx = cellSize * 10;
        this._ctx = document.querySelector("canvas")!.getContext("2d")!;
        this._height = Math.floor(this._ctx.canvas.height / this._cellSizePx);
        this._width = Math.floor(this._ctx.canvas.width / this._cellSizePx);
    }

    draw(x: number, y: number, color: Color) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(
            x * this._cellSizePx,
            y * this._cellSizePx,
            this._cellSizePx,
            this._cellSizePx
        );
    }

    clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        this._ctx.strokeStyle = "lightgray";
        this._ctx.lineWidth = 2;
        // Draw vertical lines
        this._ctx.beginPath();
        for (let i = 1; i < this._width; i++) {
            this._ctx.moveTo(i * this._cellSizePx, 0);
            this._ctx.lineTo(i * this._cellSizePx, this._ctx.canvas.height);
        }
        this._ctx.stroke();
        // Draw horizontal lines
        this._ctx.beginPath();
        for (let i = 1; i < this._height; i++) {
            this._ctx.moveTo(0, i * this._cellSizePx);
            this._ctx.lineTo(this._ctx.canvas.width, i * this._cellSizePx);
        }
        this._ctx.stroke();

    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    private readonly _cellSizePx: number;
    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _height: number;
    private readonly _width: number;
}

