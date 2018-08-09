import {GameObject} from "./game_object";

export class Field {
    constructor(width: number, height: number) {
        this._cells = Array(width);
        for (let i = 0; i < width; i++) {
            this._cells[i] = Array(height);
            for (let j = 0; j < height; j++) {
                this._cells[i][j] = null;
            }
        }
    }

    set(x: number, y: number, go: GameObject) {
        this._cells[x][y] = go;
    }

    get(x: number, y: number) {
        return this._cells[x][y];
    }

    clear(x: number, y: number) {
        this._cells[x][y] = null;
    }

    private readonly _cells: (GameObject | null)[][];
}
