console.log(document.sudoku.generate('easy'));
let board;

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
    getCurrentBoard();
    checkCol(obj.classList[1]);
}

const checkCol = (colClass) => {
    let columnNodes = document.querySelectorAll(`.${colClass}`);
    let curVals = [];
    for (let x = 0; x < 9; x++) {
        if (columnNodes[x].value == '') {}
        else {
            curVals.push(columnNodes[x].value);
        }
    }
    if (checkCompleteSet(curVals) == 'error') {
        for (let x = 0; x < 9; x++) {
            columnNodes[x].classList.add('node__incorrect');
            setTimeout(function () {columnNodes[x].classList.remove('node__incorrect')}, 500);
        }
    } else if (checkCompleteSet(curVals) == 'complete') {
        for (let x = 0; x < 9; x++) {
            columnNodes[x].classList.add('node__correct');
            setTimeout(function () {columnNodes[x].classList.remove('node__correct')}, 500);
        }
    }
}

const checkCompleteSet = (givenVals) => {
    // check for duplicates if it's full
    let noDuplicate = true;
    if (givenVals.length == 9) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (givenVals[x] == givenVals[y] && y != x) {
                    noDuplicate = false;
                }
            }
        }
        if (!noDuplicate) {
            return 'error';
        } else {
            return 'complete';
        }
    } else {
        return 'incomplete';
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