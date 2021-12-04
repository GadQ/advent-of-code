const { readFileSync } = require("fs");
const path = require('path');
const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split(/\r?\n/)
    .filter((line) => line);

const numbersAnnounced = input[0].split(',').map(num => parseInt(num, 10));

const boardsData = input.slice(1);

class BingoBoard {
    lines = [];

    constructor(fields){
        this.fields = fields;

        this.getRowsAndColumns();
    }

    getRowsAndColumns() {
        for( let i = 0; i < 5; i++) {
            const row = this.fields.slice(i*5, i*5+5);
            const column = Array.from({length: 5}, (_, index) => this.fields[index*5 + i]);

            this.lines.push(row, column);
        }
    }

    checkIfBoardWon(markedFields) {
        const isWin = this.lines.some(line=> line.every(number=>markedFields.includes(number)));
        if( isWin ) {
            const unmarkedFields = this.fields.filter(field => !markedFields.includes(field));

            return {
                lastField: markedFields[markedFields.length - 1],
                unmarkedFields,
            }
        }
    }
}

const boardsDataParsed = Array.from(
    { length: boardsData.length / 5 },
    (_, index) => boardsData.slice((index*5), index * 5 + 5)
        .flatMap(line => line.split(' ').filter(number => number).map(num => parseInt(num, 10)))
);

const boards = boardsDataParsed.map(boardData => new BingoBoard(boardData));

const getWinningBoardAndNumber = () => {
    for( let i =0; i < numbersAnnounced.length; i++ ) {
        for( let j =0 ; j < boards.length; j++ ) {
            const isWin = boards[j].checkIfBoardWon(numbersAnnounced.slice(0, i));
            if( isWin ) {
                return isWin.lastField * isWin.unmarkedFields.reduce((acc, cur) => acc + cur);
            }
        }
    }
}


console.log(`First star: ${getWinningBoardAndNumber()}`);


let result = null;

while(boards.length) {
    for( let i =0; i < numbersAnnounced.length; i++ ) {
        boards.forEach((board, index)=>{
            const isWin = boards[index].checkIfBoardWon(numbersAnnounced.slice(0, i));
            if( isWin ) {
                result = isWin.lastField * isWin.unmarkedFields.reduce((acc, cur) => acc + cur);
                boards.splice(index, 1);
            }
        })
    }
}

console.log(`Second star: ${result}`);
