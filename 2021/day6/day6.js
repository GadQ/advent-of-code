const { readFileSync } = require("fs");
const path = require('path');
let input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(',')
    .map(num => parseInt(num, 10));

const inputCount = Array.from({length: 9}, () => 0);
input.forEach(num => inputCount[num]++);

for( let i = 0; i < 256; i++) {
    const newFish = inputCount.shift();
    inputCount[6] += newFish;
    inputCount[8] = newFish;
}

console.log(inputCount.reduce((a,b)=>a+b));
