export function inRange(a: number, b: number, value: number) {
    return value >= a && value < b
}

export function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}
