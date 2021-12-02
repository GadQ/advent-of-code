const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line);

const coords = {
    x: 0,
    y: 0
};

input.forEach(direction => {
    const [dir, factor] = direction.split(' ').map(el => parseInt(el) || el);

    switch(dir) {
        case 'forward': {
            coords.x += factor;
            break;
        }
        case 'down': {
            coords.y += factor;
            break;
        }
        case 'up': {
            coords.y -= factor;
            break;
        }
    }
})

const {x,y} = coords;

console.log(`First star: ${x * y}`);

coords.x = 0;
coords.y = 0;
coords.aim = 0;
coords.depth = 0;

input.forEach(direction => {
    const [dir, factor] = direction.split(' ').map(el => parseInt(el) || el);

    switch(dir) {
        case 'forward': {
            coords.depth += factor * coords.aim;
            coords.x += factor;
            break;
        }
        case 'down': {
            coords.aim += factor;
            break;
        }
        case 'up': {
            coords.aim -= factor;
            break;
        }
    }
});

const {x: x2, depth} = coords;

console.log(`Second star: ${x2 * depth}`);
