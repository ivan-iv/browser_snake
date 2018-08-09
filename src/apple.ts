import {GameObject} from "./game_object";
import {Color, GameObjectType} from "./enums";
import {rand} from "./utils";
import {Vect2D} from './vect_2d';

export class Apple extends GameObject {
    static Event = {
        OnEat: "onEat"
    };

    constructor() {
        super(GameObjectType.Apple);
        this._position = new Vect2D(-1, -1);
    }

    destroy() {
        super.destroy();
        this.field().clear(this._position.x, this._position.y);
    }

    draw() {
        this.canvas().draw(this._position.x, this._position.y, Color.Green);
    }

    eat() {
        this.emit(Apple.Event.OnEat);
    }

    activate() {
        while (true) {
            const x = rand(0, this.canvas().width);
            const y = rand(0, this.canvas().height);
            if (!this.field().get(x, y)) {
                this._position = new Vect2D(x, y);
                this.field().set(x, y, this);
                break;
            }
        }
    }

    private _position: Vect2D;
}
