export class EventEmitter {
    constructor() {
        this._cbs = new Map();
    }

    on(event: string, cb: (...params: any[]) => void) {
        let arr = this._cbs.get(event);
        if (!arr) {
            arr = [];
            this._cbs.set(event, arr)
        }
        // If find the same callback just return
        if (arr.find(x => x === cb)) {
            return;
        }
        arr.push(cb);
    }

    off(event: string, cb: (...params: any[]) => void) {
        let arr = this._cbs.get(event);
        if (arr) {
            const i = arr.findIndex(x => x === cb);
            if (i >= 0) {
                arr.splice(i, 1);
                if (!arr.length) {
                    this._cbs.delete(event);
                }
            }
        }
    }

    emit(event: string, ...params: any[]) {
        let arr = this._cbs.get(event);
        if (arr) {
            arr.forEach(x => x(...params));
        }
    }

    clear() {
        this._cbs.clear();
    }

    private readonly _cbs: Map<string, ((...params: any[]) => void)[]>;
}
