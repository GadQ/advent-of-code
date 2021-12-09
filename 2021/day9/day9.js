const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split('\n').filter(Boolean).map(line => line.split('').map(num => parseInt(num, 10)));

const calculateLowestNeighbour= (arr, x, y) => {
    const maxNumber = Number.MAX_VALUE;

    return Math.min(
        arr[x-1]?.[y] ?? maxNumber,
        arr[x+1]?.[y] ?? maxNumber,
        arr[x]?.[y-1] ?? maxNumber,
        arr[x]?.[y+1] ?? maxNumber,
    )
}

const lowestBasinPoints = [];

const lowestPoints = input.flatMap((line, lineIndex) => line.filter( (column, columnIndex) => {
    if (column < calculateLowestNeighbour(input, lineIndex, columnIndex)){
        lowestBasinPoints.push({ x: columnIndex, y: lineIndex});

        return true;
    }

    return false;
}));

console.log(`First star: ${lowestPoints.reduce((a,b)=>a+b) + lowestPoints.length}`);

const visitedPoints = [];

const calculateBasinSize = (arr, x, y) => {
    visitedPoints.push(`${x}-${y}`);

    let basinSize = 1;

    const coords = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0]
    ]

    coords.forEach(([xDelta, yDelta]) => {
        const xCoord = x + xDelta;
        const yCoord = y + yDelta;
        const key = `${xCoord}-${yCoord}`;
        if( !visitedPoints.includes(key)) {
            const point = arr[xCoord]?.[yCoord] ?? 9;

            if( point !== 9 ) {
                visitedPoints.push(key);
                basinSize += calculateBasinSize(arr, xCoord, yCoord)
            }
        }
    });

    return basinSize;
}

const basinSizes = lowestBasinPoints
    .map(point => calculateBasinSize(input, point.y, point.x))
    .sort((a,b)=> b - a)
    .slice(0,3)
    .reduce((a,b) => a * b);

console.log(`Second star: ${basinSizes}`);
