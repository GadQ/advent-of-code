const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split('\n').filter(Boolean).map(line => line.split(''));

const openingChars = ['{', '[', '(', '<'];
const charValues = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}
const closingCharsMap = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>',
};

const findCorruptedCharacter = arr => {
    const opened = [];

    for( let i = 0, char=arr[0]; i < arr.length; char = arr[i++] ) {
        if( openingChars.includes(char) ) {
            opened.push(char);

            continue;
        }

        const lastOpened = opened.pop();
        if(closingCharsMap[lastOpened] !== char) {
            return char;
        }
    }

    return '';
}

const mappedInput = input.map(findCorruptedCharacter)

const corruptedCharacters = mappedInput.filter(Boolean).reduce((acc, char) => acc + charValues[char], 0);

console.log('First star: ' + corruptedCharacters);

const incompleteLines = input.filter(line => !findCorruptedCharacter(line));

const findIncompleteSequence = text => {
    const textClosedSections = text.replace(/({})|(\[])|(\(\))|(<>)/g, '');
    return text !== textClosedSections ? findIncompleteSequence(textClosedSections) : textClosedSections;
}

const mapTextToValue = text => {
    const closingCharValues = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    }
    const closingChars = text
        .split('')
        .reverse()
        .map(char => closingCharValues[closingCharsMap[char]])
        .reduce((acc, cur)=> {
            return acc * 5 + cur
        } , 0);

    return closingChars;
}

const incompleteLinesValues = incompleteLines.map( line => {
    return mapTextToValue(findIncompleteSequence(line.join('')));
}).sort((a,b)=>a-b)

console.log('Second star: ' + incompleteLinesValues[Math.floor(incompleteLinesValues.length / 2)]);
