const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(',')
    .map(num => parseInt(num, 10));

const min = Math.min(...input);
const max = Math.max(...input);

const countFuel = (arr, pos) => {
    return arr.reduce((a,b) => a + Math.abs(b - pos), 0);
}

const costs = {};

for(let i = min; i <= max; i++ ){
    costs[i] = countFuel(input, i);
}

console.log(Object.values(costs).reduce((acc, cost)=>{
    return Math.min(acc, cost);
}, Number.MAX_VALUE));

const countFuelNew = (arr, pos) => {
    return arr.reduce((a,b) => {
        const diff = Math.abs(b - pos);
        const diffCost = diff * (diff + 1 ) / 2;

        return a + diffCost;
    }, 0);
}

const costsNew = {};

for(let i = min; i <= max; i++ ){
    costsNew[i] = countFuelNew(input, i);
}

console.log(Object.values(costsNew).reduce((acc, cost)=>{
    return Math.min(acc, cost);
}, Number.MAX_VALUE));
