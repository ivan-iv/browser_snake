export class Loop {
    static readonly timeStep = 1000 / 60;

    constructor() {
        this._lastTimestamp = 0;
        this._requestId = 0;
        this._lag = 0;
    }

    start(updateFn: () => void, drawFn: () => void) {
        this.stop();

        const process = (timestamp: number) => {
            this._lag += timestamp - this._lastTimestamp;
            while (this._lag >= Loop.timeStep) {
                updateFn();
                this._lag -= Loop.timeStep;
            }
            drawFn();
            this._lastTimestamp = timestamp;
            this._requestId = window.requestAnimationFrame(process);
        };
        this._requestId = window.requestAnimationFrame(process);
    }

    stop() {
        if (this._requestId) {
            window.cancelAnimationFrame(this._requestId);
            this._requestId = null;
        }
    }

    private _lastTimestamp: number;
    private _lag: number;
    private _requestId: number | null;
}
