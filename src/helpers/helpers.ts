export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const range = (start: number, stop: number, step: number) => {
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
};

export const coinFlip = () => {
    return Math.random() < 0.5;
};