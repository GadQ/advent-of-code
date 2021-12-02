import { readFileSync } from "fs";
import path from "path";

const input = readFileSync(path.join("inputTest.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line)
    .map((line) => parseInt(line));

const sorted = input.sort((a,b) => a-b)
sorted.push(sorted[sorted.length-1] + 3);
sorted.unshift(0);

const max = Math.max(...sorted);

const diffs = sorted.reduce((acc, cur) => {
    const diff = cur - acc.prev;

    if( diff === 1) {
        acc.diff1++;
    } else if (diff === 3 ){
        acc.diff3++;
    }

    acc.prev = cur;
    return acc;
} , {
    prev: 0,
    diff1: 0,
    diff3: 0,
});



console.log(diffs, diffs.diff1 * diffs.diff3);

console.log(sorted);

const indexesToRemove = [];

for( let i = 1; i < sorted.length - 2; i++ ){
    if( sorted[i+1] - sorted[i-1] <= 3) {
        indexesToRemove.push(i);
    }
}

function arrCombinations(array) {
    return new Array(1 << array.length).fill().map(
        (e1, i) => array.filter((e2, j) => i & 1 << j));
}

const combinations = arrCombinations(indexesToRemove);

console.log(combinations);
