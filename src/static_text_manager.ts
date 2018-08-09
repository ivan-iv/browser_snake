class StaticText {
    constructor(selector: string) {
        this._element = document.querySelector<HTMLElement>(selector)!;
    }

    hide() {
        this._element.style.display = "none";
    }

    show() {
        this._element.style.display = "initial";
    }

    private readonly _element: HTMLElement;
}

type StaticTextType = "invite" | "die" | "crawl" | "splash" | "win"

export class StaticTextManager {
    constructor() {
        this._texts = new Map();
        this._texts.set("invite", new StaticText("#invite"));
        this._texts.set("die", new StaticText("#die"));
        this._texts.set("crawl", new StaticText("#crawl"));
        this._texts.set("splash", new StaticText("#splash"));
        this._texts.set("win", new StaticText("#win"));
    }

    show(type: StaticTextType) {
        const text = this._texts.get(type);
        if (text) {
            text.show();
        }
        return this;
    }

    hide(type: StaticTextType) {
        const text = this._texts.get(type);
        if (text) {
            text.hide();
        }
        return this;
    }

    _texts: Map<StaticTextType, StaticText>;
}
