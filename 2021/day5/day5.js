const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line);

const data = input.map(line => line.split(' -> ').map( coords => coords.split(',').map(num => parseInt(num,10))));

const isStraightLine = (xStart, xEnd, yStart, yEnd ) => xStart === xEnd || yStart === yEnd;
const isDiagonalLine = (xStart, xEnd, yStart, yEnd ) => Math.abs(xStart - xEnd ) === Math.abs(yStart - yEnd );

const dataWithDiagonalLines = data.filter(([[xStart, yStart], [xEnd, yEnd]]) =>
    isStraightLine(xStart, xEnd, yStart, yEnd) ||
    isDiagonalLine(xStart, xEnd, yStart, yEnd)
);

const dataWithStraightLines = dataWithDiagonalLines.filter(([[xStart, yStart], [xEnd, yEnd]]) =>
    isStraightLine(xStart, xEnd, yStart, yEnd)
);

const pointsFromData = dataWithDiagonalLines.flatMap( (line, index) => {
    let [[xStart, yStart], [xEnd, yEnd]] = line;
    const points = [];
    const xDiff = Math.abs(xStart - xEnd);
    const yDiff = Math.abs( yStart - yEnd);

    const xStep = xDiff ? (xEnd - xStart) / xDiff : 0;
    const yStep = yDiff ? (yEnd - yStart) / yDiff : 0;

    const steps = xDiff || yDiff;

    for( let i = 0; i <= steps; i++ ) {
        points.push([xStart + xStep * i, yStart + yStep * i])
    }

    return points;
});

console.log(pointsFromData.reduce((acc,cur)=>{
    const id = cur.join('-');

    if( acc[id] === 1 ) {
        acc.points++;
    }

    acc[id] = (acc[id] || 0) + 1;

    return acc;
},{ points: 0 }).points);
