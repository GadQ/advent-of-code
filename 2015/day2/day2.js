const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line);

const firstStar = input.map(dimensions => {
    const [a,b,c] = dimensions.split('x').map(num => parseInt(num, 10));

    const side1 = a * b;
    const side2 = c * b;
    const side3 = a * c;

    const lowestArea = Math.min( side1, side2, side3 );

    return lowestArea + side1 * 2 + side2 * 2 + side3 * 2;
}).reduce( (a,b) => a + b);
console.log(`First star: ${firstStar}`)

const secondStar = input.map(dimensions => {
    const [a,b,c] = dimensions.split('x').map(num => parseInt(num, 10));

    const largestDimension = Math.max( a, b, c );

    console.log([a,b,c]
        .filter(dimension => dimension !== largestDimension),[a,b,c].reduce((a,b) => a * b))

    return [a,b,c]
        .filter(dimension => dimension !== largestDimension)
        .reduce((a,b) => a + b) * 2 + [a,b,c].reduce((a,b) => a * b, 1);
}).reduce( (a,b) => a + b);
console.log(`Second star: ${secondStar}`)


