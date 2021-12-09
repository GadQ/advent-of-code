const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split('\n').filter(Boolean).map(line => line.split(' | '));


const uniqueDigits = input.flatMap( ([_, digits]) => digits.split(' ')).filter(({length})=> [2,3,4,7].includes(length));

console.log(`First star: ${uniqueDigits.length}`);

const sortDigits = digits => digits
    .split(' ')
    .map(part => part
        .split('')
        .sort((a,b) => a.localeCompare(b))
        .join('')
    )
    .join(' ');

const inputSorted = input.map(line => line.map(sortDigits));

const digitsMap = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
}

const getUniqueSegments = (segments1, segments2) => {
    const unique1 = segments1.split('').filter(letter => !segments2.split('').includes(letter));
    const unique2 = segments2.split('').filter(letter => !segments1.split('').includes(letter));

    return [...unique1, ...unique2];
}

const getSegments = line => {
    const map = Object.fromEntries('abcdefg'.split('').map(letter => [letter, null]));

    const digits = line[0].split(' ');
    const resultDigits = line[1].split(' ');
    const one = digits.filter( ({length}) => length === 2).join('');
    const seven = digits.filter( ({length}) => length === 3).join('');
    const four = digits.filter( ({length}) => length === 4).join('');
    const eight = digits.filter( ({length}) => length === 7).join('');

    const lineLetters = digits.flatMap(part => part.split('')).reduce((acc, cur)=>{
        acc[cur] = (acc[cur] || 0) + 1
        return acc;
    },{});
    const [segmentA] = getUniqueSegments(one, seven);
    const segmentAC = Object.entries(lineLetters).filter(([_, count])=>count === 8).map(([letter]) => letter).join('');
    const [segmentB] = Object.entries(lineLetters).filter(([_, count])=>count === 6).map(([letter]) => letter);
    const [segmentC] = getUniqueSegments(segmentAC, segmentA);
    const segmentDG = Object.entries(lineLetters).filter(([_, count])=>count === 7).map(([letter]) => letter);
    const [segmentD] = segmentDG.filter(letter => four.split('').includes(letter));
    const [segmentE] = Object.entries(lineLetters).filter(([_, count])=>count === 4).map(([letter]) => letter);
    const [segmentG] = getUniqueSegments(segmentDG.join(''), segmentD);
    const [segmentF] = getUniqueSegments(one, segmentC);
    
    map[segmentA] = 'a';
    map[segmentB] = 'b';
    map[segmentC] = 'c';
    map[segmentD] = 'd';
    map[segmentE] = 'e';
    map[segmentF] = 'f';
    map[segmentG] = 'g';

    return resultDigits
            .map(digit => digitsMap[digit.split('')
                .map(digitLetter => map[digitLetter])
                .sort()
                .join('')]
            )
            .join('');
}

const numbers = inputSorted.map(line => parseInt(getSegments(line), 10)).reduce((a,b)=> a + b);

console.log(`Second star: ${numbers}`);
