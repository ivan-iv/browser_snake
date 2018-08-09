import {GameObject} from "./game_object";
import {Color, GameObjectType, KeyCode} from "./enums";
import {inRange} from "./utils";
import {Apple} from "./apple";
import {Vect2D} from "./vect_2d";

function getNewHeadPosition(dir: Dir, head: Vect2D) {
    if (dir === Dir.Up) {
        return new Vect2D(head.x, head.y - 1);
    }
    if (dir === Dir.Down) {
        return new Vect2D(head.x, head.y + 1);
    }
    if (dir === Dir.Left) {
        return new Vect2D(head.x - 1, head.y);
    }
    if (dir === Dir.Right) {
        return new Vect2D(head.x + 1, head.y);
    }

    throw new Error("Unknown direction");
}

enum Dir {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}

export class Snake extends GameObject {
    static Event = {
        OnDie: "onDie",
        OnDirChange: "onDirChange",
    };

    constructor() {
        super(GameObjectType.Snake);
        this._position = [];
        this._speed = 0;
        this._moveTimeout = 0;
        this._dir = Dir.Up;
        this._isAllowInput = true;
        this._isMoving = false;
    }

    destroy() {
        super.destroy();
        this._position.forEach(p => {
            this.field().clear(p.x, p.y);
        });
    }

    set speed(value: number) {
        this._speed = value;
    }

    activate() {
        const x = Math.floor(this.canvas().width / 2);
        const y = Math.floor(this.canvas().height / 2);
        this._position = [
            new Vect2D(x, y),
            new Vect2D(x, y + 1),
            new Vect2D(x, y + 2)
        ];
        this._position.forEach(p => {
            this.field().set(p.x, p.y, this);
        });
    }

    start() {
        this._isMoving = true;
    }

    stop() {
        this._isMoving = false;
    }

    update() {
        if (!this._isMoving) return;

        if (this._moveTimeout >= 1 / this._speed) {
            this._move();
            this._moveTimeout = 0;
        } else {
            this._moveTimeout += 0.1;
        }
    }

    draw() {
        this._position.forEach(p => this.canvas().draw(p.x, p.y, Color.Black))
    }

    input(ev: KeyboardEvent) {
        if (!this._isMoving || !this._isAllowInput) return;

        const key = ev.code;

        let newDir;
        if (key === KeyCode.ArrowUp && this._dir !== Dir.Down) {
            newDir = Dir.Up;
        }
        else if (key === KeyCode.ArrowDown && this._dir !== Dir.Up) {
            newDir = Dir.Down;
        }
        else if (key === KeyCode.ArrowLeft && this._dir !== Dir.Right) {
            newDir = Dir.Left;
        }
        else if (key === KeyCode.ArrowRight && this._dir !== Dir.Left) {
            newDir = Dir.Right;
        }

        if (newDir && newDir !== this._dir) {
            this._dir = newDir;
            this._isAllowInput = false;
            this.emit(Snake.Event.OnDirChange, newDir);
        }
    }

    private _move() {
        const newHead = getNewHeadPosition(this._dir, this._position[0]);

        if (!inRange(0, this.canvas().width, newHead.x) ||
            !inRange(0, this.canvas().height, newHead.y)) {
            this._die();
            return;
        }

        const go = this.field().get(newHead.x, newHead.y);

        if (go && go.type === GameObjectType.Snake) {
            this._die();
            return;
        }

        this._position.splice(0, 0, newHead);
        this.field().set(newHead.x, newHead.y, this);

        if (go && go.type === GameObjectType.Apple) {
            (go as Apple).eat();
        } else {
            const tail = this._position.pop();
            if (tail) {
                this.field().clear(tail.x, tail.y);
            }
        }

        // After movement input is allowed again
        this._isAllowInput = true;
    }

    private _die() {
        this._isMoving = false;
        this.emit(Snake.Event.OnDie);
    }

    private _speed: number;
    private _moveTimeout: number;
    private _position: Array<Vect2D>;
    private _dir: Dir;
    private _isAllowInput: boolean;
    private _isMoving: boolean;
}
