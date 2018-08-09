import {EventEmitter} from "./event_emitter";
import {Canvas} from "./canvas";
import {Field} from "./field";

export class GameObject {
    constructor(type: string) {
        this._type = type;
        this._canvas = null;
        this._field = null;
        this._emitter = new EventEmitter();
    }

    setCanvas(canvas: Canvas) {
        this._canvas = canvas;
    }

    setField(field: Field) {
        this._field = field;
    }

    get type() {
        return this._type;
    }

    subscribe(event: string, fn: (...params: any[]) => void) {
        this._emitter.on(event, fn);
    }

    unsubscribe(event: string, fn: (...params: any[]) => void) {
        this._emitter.off(event, fn);
    }

    draw() {
    }

    update() {
    }

    input(event: KeyboardEvent) {
    }

    destroy() {
        this._emitter.clear();
    }

    protected canvas() {
        if (!this._canvas) {
            throw new Error("Canvas do not initialized");
        }
        return this._canvas;
    }

    protected field() {
        if (!this._field) {
            throw new Error("Field do not initialized");
        }
        return this._field;
    }

    protected emit(event: string, ...params: any[]) {
        this._emitter.emit(event, ...params);
    }

    private _field: Field | null;
    private _canvas: Canvas | null;
    private readonly _type: string;
    private readonly _emitter: EventEmitter;
}

