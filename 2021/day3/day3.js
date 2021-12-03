const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line);

const getMostCommonBits = input => input.reduce((acc,cur)=>{
    [...cur].forEach((digit, index)=>{
        acc[index] = (acc[index] || 0) + parseInt(digit, 10);
    })

    return acc;
},[]).map(digit => digit >= Math.floor(input.length) / 2 ? 1 : 0);

const gamma = parseInt(getMostCommonBits(input).join(''), 2);
const epsilon = gamma ^ (2 ** 12 - 1);

console.log(`First star: ${gamma * epsilon}`);

const bitsEqual = (bit1, bit2) => bit1 === bit2;
const bitsUnequal = (bit1, bit2) => bit1 !== bit2;

const getBitsArray = (array, compareFunction, bit = 0) => {
    const gamma = getMostCommonBits(array);

    const arr = array.filter(num => compareFunction(gamma[bit], parseInt(num[bit], 2)));

    return  arr.length <= 1 ? arr : getBitsArray(arr, compareFunction, bit + 1);
}

const getOxygenArray = (array, bit) => {
    return getBitsArray(array, bitsEqual, bit);
}

const getCo2Array = (array, bit) => {
    return getBitsArray(array, bitsUnequal, bit);
}

const [oxygen, co2] = [
        getOxygenArray(input),
        getCo2Array(input)
    ]
    .flat()
    .map(num => parseInt(num ,2));

console.log(`Second star: ${oxygen * co2}`);
