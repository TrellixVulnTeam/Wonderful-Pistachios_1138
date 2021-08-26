const gameBoard = new Array(9);
for (let i = 0; i < 9; i++) {gameBoard[i] = new Array(9)};
for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
        gameBoard[x][y] = 0;
    }
}

let iterations = 20;


const generateBoardHTML = () => {
    const centerDiv = document.querySelector('#center-div');
    const boardDiv = document.createElement('div');
    boardDiv.setAttribute('id', 'board-div');
    for (let w = 0; w < 3; w++) {
        let squareRow = document.createElement('div');
        squareRow.setAttribute('class', 'square-row');
        for (let x = 0; x < 3; x++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'square')
            for (let y = 0; y < 3; y++) {
                let nodeRow = document.createElement('div');
                nodeRow.setAttribute('class', 'node-row')
                for (let z = 0; z < 3; z++) {
                    let node = document.createElement('input');
                    node.setAttribute('maxlength', '1');
                    node.setAttribute('class', 'node');
                    node.addEventListener('dblclick',function(){node.value=''});
                    nodeRow.appendChild(node);
                }
                square.appendChild(nodeRow);
            }
            squareRow.appendChild(square);
        }
        boardDiv.appendChild(squareRow);
    }
    centerDiv.appendChild(boardDiv);
}

const generateCell = (xIndex,yIndex,optionChoice,iter) => {
    if (iter < 500) {
        let nodeOptions = getNodeOptions(xIndex, yIndex);
        if (nodeOptions.length == 0) {
            let prevNode = prevNodeIndex(xIndex,yIndex);
            printGameBoard();
            console.log('Options: ' + nodeOptions);
            console.log('Choice: Back Out');
            console.log(' ');
            gameBoard[prevNode[0]][prevNode[1]] = 0;
            generateCell(prevNode[0], prevNode[1], optionChoice, ++iter);
        } else {
            let randIndex = Math.floor(Math.random() * (nodeOptions.length-1));
            if (randIndex == optionChoice) {
                if (nodeOptions.length > 1) {
                    if (optionChoice == (nodeOptions.length-1)) {
                        randIndex--;
                    } else {
                        randIndex++;
                    }
                }
            }
            gameBoard[xIndex][yIndex] = nodeOptions[randIndex];
            let nextNode = nextNodeIndex(xIndex,yIndex);
            printGameBoard();
            console.log('Options: ' + nodeOptions);
            console.log('Choice: ' + nodeOptions[randIndex]);
            console.log(' ');
            generateCell(nextNode[0], nextNode[1], optionChoice, ++iter);
        }
    } else {
        clearGameBoard();
        iterations--;
        if (iterations > 0) {
            generateCell(0,0,0,0);
        }
        printGameBoard();
    }

}

const isEmptyNode = () => {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (gameBoard[x][y] == 0) {
                return true;
            }
        }
    }
    return false;
}

const nextNodeIndex = (x, y) => {
    if (y < 8 && x == 8) {
        y++;
        x = 0;
    } else if (x < 8) {
        x++;
    }
    let index = [x,y];
    return index;
}

const prevNodeIndex = (x, y) => {
    if (y > 0 && x == 0) {
        y--;
        x = 8;
    } else if (x > 0) {
        x--;
    }
    let index = [x,y];
    return index;
}

const clearGameBoard = () => {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            gameBoard[x][y] = 0;
        }
    }
}

const getNodeOptions = (x, y) => {
    let options = [1,2,3,4,5,6,7,8,9];
    let rowVals = usedValsRow(x);
    let colVals = usedValsCol(y);
    let boxVals = usedValsBox(x,y);
    for (let x = 0; x < options.length; x++) {
        for (let y = 0; y < rowVals.length; y++) {
            if (options[x] == rowVals[y]) {
                options[x] = null;
            }
        }
    }
    for (let x = 0; x < options.length; x++) {
        for (let y = 0; y < colVals.length; y++) {
            if (options[x] == colVals[y]) {
                options[x] = null;
            }
        }
    }
    for (let x = 0; x < options.length; x++) {
        for (let y = 0; y < boxVals.length; y++) {
            if (options[x] == boxVals[y]) {
                options[x] = null;
            }
        }
    }
    options = options.filter(x => x != null);
    return options;
}

const printGameBoard = () => {
    for (let x = 0; x < 9; x++) {
        console.log(gameBoard[x][0] + "\t" + gameBoard[x][1] + "\t" + gameBoard[x][2] + "\t" + gameBoard[x][3] + "\t" + gameBoard[x][4] + "\t" + gameBoard[x][5] + "\t" + gameBoard[x][6] + "\t" + gameBoard[x][7] + "\t" + gameBoard[x][8])
    }
}

const usedValsRow = (rowIndex) => {
    let usedValues = [];
    for (let i = 0; i < 9; i++) {
        if (gameBoard[rowIndex][i] == null) {}
        else {usedValues.push(gameBoard[rowIndex][i]);}
    }
    return usedValues;
}

const usedValsCol = (colIndex) => {
    let usedValues = [];
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i][colIndex] == null) {}
        else {usedValues.push(gameBoard[i][colIndex]);}
    }
    return usedValues;
}

const usedValsBox = (rowIndex, colIndex) => {
    let usedValues = [];
    xAdjustment = rowIndex - (rowIndex % 3);
    yAdjustment = colIndex - (colIndex % 3);
    for (let x = (0+xAdjustment); x < (3+xAdjustment); x++) {
        for (let y = (0+yAdjustment); y < (3+yAdjustment); y++) {
            if (gameBoard[x][y] == null) {}
            else {usedValues.push(gameBoard[x][y]);}
        }
    }
    return usedValues;
}

generateBoardHTML();
generateCell(0,0,0,0);
printGameBoard();