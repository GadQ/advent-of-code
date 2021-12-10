const { readFileSync } = require("fs");
const path = require('path');
const [input] = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line);

const floorDirs = input.split('').map(letter => letter === '(' ? 1 : -1)

const firstStar = floorDirs.reduce((a,b) => a + b);
console.log(`First star: ${firstStar}`);

let currentFloor = 0;
let position = 0;
while(currentFloor !== -1) {
    currentFloor += floorDirs[position++];
}

console.log(`Second star: ${position}`);


