const { readFileSync } = require("fs");
const path = require('path');
const [template, ...instructions] = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split('\n').filter(Boolean);

const instructionsMap = Object.fromEntries(instructions.map(line => line.split(' -> ')));

const step = input => {
    const result = [];
    for( let i = 1; i < input.length; i++) {
        const pair = input.slice(i-1, i+1);
        const newElement = instructionsMap[pair];

        result.push(pair[0] + newElement);
    }

    result.push( input[input.length - 1] );

    return result.join('');
}

let result = template;

for( let i = 0; i < 8; i++) {
    result = step(result);

    console.log(result);
}

const counts = result.split('').reduce((acc, cur)=>{
    acc[cur] = (acc[cur] || 0) + 1

    return acc;
}, {});

const { mostCommon, leastCommon } = Object.entries(counts).reduce((acc, [letter, count]) => {
    if( count < acc.leastCommon.count ) {
        acc.leastCommon = {
            count,
            letter,
        }
    }
    if( count > acc.mostCommon.count ) {
        acc.mostCommon = {
            count,
            letter,
        }
    }

    return acc;

}, { mostCommon: {
    letter: '',
    count: 0
    }, leastCommon: { letter: '', count: Number.MAX_VALUE}})

console.log(mostCommon.count - leastCommon.count);
