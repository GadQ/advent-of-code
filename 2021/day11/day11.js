const { readFileSync } = require("fs");
const path = require('path');
const inputNumbers = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split('\n').filter(Boolean).map(line => line.split('').map(num => parseInt(num, 10)));

const input = JSON.parse(JSON.stringify(inputNumbers));

let visitedCells = [];

const increaseEnergyAll = arr => {
    visitedCells = [];
    for( let y = 0; y < arr.length; y++) {
        for( let x = 0; x < arr[y].length; x++) {
            arr[y][x]++;
        }
    }
    for( let y = 0; y < arr.length; y++) {
        for( let x = 0; x < arr[y].length; x++) {
            if( arr[y][x] > 9 ){
                increaseEnergy(arr, x,  y);
            }
        }
    }
}

const displayArray = arr => {
    arr.forEach(line => {
        console.log(line.join(''));
    });
}

const increaseEnergy = ( arr, x, y ) => {
    arr[y][x] = 0;
    for( let yPos = y - 1; yPos <= y + 1; yPos++ ) {
        for( let xPos = x - 1; xPos <= x + 1; xPos++ ) {
            const number = arr[yPos]?.[xPos] || null;

            if( number === null) {
                continue;
            }

            if( !visitedCells.includes(`${xPos}-${yPos}`)){
                arr[yPos][xPos]++;

                if( arr[yPos][xPos] > 9) {
                    visitedCells.push(`${xPos}-${yPos}`);

                    if( x !== xPos || y !== yPos) {
                        increaseEnergy(arr ,xPos, yPos);
                    }
                }
            }
        }
    }
}

let flashes = 0;

for( let i = 0; i < 100; i++ ) {
    increaseEnergyAll(input)
    flashes += input.flat().filter(num => !num).length;
}


console.log(`First star: ${flashes}`);

let step = 0;
while(inputNumbers.flat().filter(Boolean).length !== 0 ) {
    increaseEnergyAll(inputNumbers);
    step++;
}

console.log(`Second star: ${step}`);

