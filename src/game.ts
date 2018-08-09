import {GameOptions, Level} from "./types";
import {StaticTextManager} from "./static_text_manager";
import {HUD} from "./hud";
import {Scene} from "./scene";
import {Snake} from "./snake";
import {Apple} from "./apple";
import {KeyCode} from "./enums";

enum GameState {
    Welcome = "welcome",
    Initial = "initial",
    Play = "play",
    GameOver = "gameOver",
    Win = "win"
}

export class Game {
    constructor(options: GameOptions, levels: Level[]) {
        this._levels = levels;
        this._textManager = new StaticTextManager();
        this._hud = new HUD();
        this._scene = new Scene(options);
        this._state = GameState.Welcome;
        this._snake = null;
        this._apple = null;
        this._level = null;
        this._counter = 0;
        document.addEventListener("keydown", this._onInput);
    }

    private _onInitialState() {
        this._textManager.hide("die");
        this._textManager.hide("splash");
        this._textManager.show("invite");
        this._hud.hide();

        this._updateStats(0, this._levels[0]);

        this._snake = this._createSnake();
        this._apple = this._createApple();
        this._snake.activate();
        this._apple.activate();

        this._scene.start();
    }

    private _onGameOverState() {
        this._textManager.hide("crawl");
        this._textManager.show("die");
    }

    private _onPlayState() {
        this._textManager.hide("invite");
        this._textManager.show("crawl");
        this._hud.show();
        this._snake!.start();
    }

    private _onWinState() {
        this._textManager.hide("crawl");
        this._textManager.show("win");
        this._hud.hide();
        this._snake!.stop();
    }

    private _changeState(newState: GameState) {
        this._state = newState;
        switch (this._state) {
            case GameState.Initial:
                this._onInitialState();
                break;
            case GameState.Play:
                this._onPlayState();
                break;
            case GameState.GameOver:
                this._onGameOverState();
                break;
            case GameState.Win:
                this._onWinState();
                break;
        }
    }

    private _nextLevel() {
        this._updateStats(0, this._levels[this._level!.lvl]);
        this._snake = this._createSnake();
        this._apple = this._createApple();
        this._snake.activate();
        this._apple.activate();
        this._snake.start();
    }

    private _updateStats(counter: number, level: Level) {
        this._counter = counter;
        this._level = level;
        this._hud.update(counter, level.goal, level.lvl);
    }

    private _onDieEvent = () => {
        this._changeState(GameState.GameOver);
    };

    private _onEatEvent = () => {
        const newCounter = this._counter + 1;
        if (newCounter >= this._level!.goal && this._level!.lvl === this._levels.length) {
            this._changeState(GameState.Win);
        } else if (newCounter >= this._level!.goal) {
            this._nextLevel();
        } else {
            this._apple = this._createApple();
            this._apple.activate();
            this._updateStats(newCounter, this._level!);
        }
    };

    private _createSnake() {
        if (this._snake) {
            this._snake.destroy();
            this._scene.remove(this._snake);
        }
        const snake = new Snake();
        this._scene.add(snake);
        snake.subscribe(Snake.Event.OnDie, this._onDieEvent);
        snake.speed = this._level!.speed;
        return snake;
    }

    private _createApple() {
        if (this._apple) {
            this._apple.destroy();
            this._scene.remove(this._apple);
        }
        const apple = new Apple();
        this._scene.add(apple);
        apple.subscribe(Apple.Event.OnEat, this._onEatEvent);
        return apple;
    }

    private _onInput = (event: KeyboardEvent) => {
        switch (this._state) {
            case GameState.Welcome:
                if (event.code === KeyCode.Space) {
                    this._changeState(GameState.Initial);
                }
                break;
            case GameState.Initial:
                if (event.code === KeyCode.Space) {
                    this._changeState(GameState.Play);
                }
                break;
            case GameState.Play:
                this._scene.input(event);
                break;
            case GameState.GameOver:
                if (event.code === KeyCode.Space) {
                    this._changeState(GameState.Initial);
                }
                break;
        }
    };

    private readonly _textManager: StaticTextManager;
    private readonly _hud: HUD;
    private _snake: Snake | null;
    private _apple: Apple | null;
    private _scene: Scene;
    private _state: GameState;
    private _counter: number;
    private _level: Level | null;
    private readonly _levels: Level[];
}

