import {GameOptions} from "./types";
import {Loop} from "./loop";
import {Field} from "./field";
import {Canvas} from "./canvas";
import {GameObject} from "./game_object";

export class Scene {
    constructor(options: GameOptions) {
        this._gameObjects = [];
        this._loop = new Loop();
        this._canvas = new Canvas(options.CellSize);
        this._field = new Field(this._canvas.width, this._canvas.height);
    }

    start() {
        this._loop.start(this._update, this._draw);
    }

    stop() {
        this._loop.stop();
    }

    add(go: GameObject) {
        // If the game object is already on the scene, just return
        if (this._gameObjects.find(x => x === go)) {
            return
        }

        go.setCanvas(this._canvas);
        go.setField(this._field);
        this._gameObjects.push(go);
    }

    remove(go: GameObject) {
        const i = this._gameObjects.findIndex(x => x === go);
        if (i >= 0) {
            this._gameObjects.splice(i, 1);
        }
    }

    input(event: KeyboardEvent) {
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].input(event);
        }
    }

    private _update = () => {
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].update();
        }
    };

    private _draw = () => {
        this._canvas.clear();
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].draw();
        }
    };

    private readonly _gameObjects: GameObject[];
    private readonly _loop: Loop;
    private readonly _canvas: Canvas;
    private readonly _field: Field;
}

