export class HUD {
    constructor() {
        this._hud = document.querySelector<HTMLElement>("#hud")!;
        this._counter = document.querySelector<HTMLElement>("#counter")!;
        this._level = document.querySelector<HTMLElement>("#level")!;
    }

    hide() {
        if (this._hud) {
            this._hud.style.display = "none";
        }
    }

    show() {
        if (this._hud) {
            this._hud.style.display = "initial";
        }
    }

    update(current: number, total: number, level: number) {
        if (this._counter) {
            this._counter.innerText = `${current}/${total}`;
        }
        if (this._level) {
            this._level.innerText = String(level);
        }
    }

    private readonly _hud: HTMLElement;
    private readonly _counter: HTMLElement;
    private readonly _level: HTMLElement;
}
