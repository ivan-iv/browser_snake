import {Game} from "./game";
import {GameOptions, Level} from "./types";

const Options: GameOptions = {
    CellSize: 2
};

const Levels: Level[] = [
    {lvl: 1, speed: 1, goal: 5},
    {lvl: 2, speed: 1.5, goal: 10},
    {lvl: 3, speed: 2, goal: 15},
    {lvl: 4, speed: 2.5, goal: 20},
    {lvl: 5, speed: 3, goal: 25}
];

const game = new Game(Options, Levels);
