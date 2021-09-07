console.log(document.sudoku.generate('easy'));
let board;
let solvedBoard;

const difficultyChoice = document.querySelectorAll('.info__difficulty-btn');
for (let x = 0; x < difficultyChoice.length; x++) {
    difficultyChoice[x].addEventListener('click', () => {
        for (let y = 0; y < difficultyChoice.length; y++) {
            difficultyChoice[y].classList.remove('btn-active')
        }
        difficultyChoice[x].classList.add('btn-active');
    });
}

const generateBoard = () => {
    let difficulty = document.querySelectorAll('.btn-active');
    board = document.sudoku.generate(difficulty[0].innerHTML.toLowerCase());
    solvedBoard = document.sudoku.solve(board);
    displayValuesBoard();
}

const displayValuesBoard = () => {
    let nodes = document.querySelectorAll('.node');
    for (let x = 0; x < 81; x++) {
        nodes[x].value = '';
    }
    for (let x = 0; x < 81; x++) {
        if (board.substring(x, x+1) != '.') {
            nodes[x].value = board.substring(x, x+1);
        }
    }
}

const getCurrentBoard = () => {
    // resets board string to what is currently displayed
    let nodes = document.querySelectorAll('.node');
    let boardString = '';
    for (let x = 0; x < 81; x++) {
        if (nodes[x].value == '') {
            boardString += '.';
        } else {
            boardString += nodes[x].value;
        }
    }
    board = boardString;
}

const validateBoard = (obj) => {
    if (obj.classList.contains('node__incorrect')) {
        obj.classList.remove('node__incorrect');
    }
    getCurrentBoard();
    let nodeNum = parseInt(obj.classList[4].substring(1));
    console.log('Object: ' + obj.value);
    console.log('Correct Value: ' + solvedBoard.substring(nodeNum, nodeNum+1));
    if (parseInt(obj.value) == solvedBoard.substring(nodeNum, nodeNum+1)) {
        nodeFeedbackAnimation(obj.classList[1]); //Col
        nodeFeedbackAnimation(obj.classList[2]); //Row
        nodeFeedbackAnimation(obj.classList[3]); //Square
    } else {
        obj.classList.add('node__incorrect');
    }
}

const nodeFeedbackAnimation = (objClass) => {
    let columnNodes = document.querySelectorAll(`.${objClass}`);
    let curVals = [];
    for (let x = 0; x < 9; x++) {
        if (columnNodes[x].value == '') {}
        else {
            curVals.push(columnNodes[x].value);
        }
    }

    let completeSet = true;
    if (curVals.length == 9) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (curVals[x] == curVals[y] && y != x) {
                    completeSet = false;
                }
            }
        }
    } else {
        completeSet = false;
    }

    if (completeSet) {
        for (let x = 0; x < 9; x++) {
            columnNodes[x].classList.add('node__correct');
            setTimeout(function () {columnNodes[x].classList.remove('node__correct')}, 500);
        }
    }
}

const generateBoardHTML = () => {
    const board = document.querySelector('.board');
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let node = document.createElement('input');
            node.setAttribute('maxlength', '1');
            node.className += 'node ';
            node.className += `c${y} `;
            node.className += `r${x} `;
            if (x < 3) {
                if (y < 3) {
                    node.className += 's1';
                } else if (y < 6) {
                    node.className += 's2';
                } else {
                    node.className += 's3';
                }
            } else if (x < 6) {
                if (y < 3) {
                    node.className += 's4';
                } else if (y < 6) {
                    node.className += 's5';
                } else {
                    node.className += 's6';
                }
            } else if (x < 9) {
                if (y < 3) {
                    node.className += 's7';
                } else if (y < 6) {
                    node.className += 's8';
                } else {
                    node.className += 's9';
                }
            }
            node.className += ` n${(x * 9) + y}`;
            
            node.addEventListener('dblclick',function(){node.value=''});
            node.addEventListener('keypress',
            function(key) {
                if(key.key == '1' || key.key == '2' || key.key == '3' || key.key == '4' || key.key == '5' || key.key == '6' || key.key == '7' || key.key == '8' || key.key == '9') {
                    node.value = key.key;
                    validateBoard(this);
                }
            });
            board.appendChild(node);
        }
    }
}



generateBoardHTML();