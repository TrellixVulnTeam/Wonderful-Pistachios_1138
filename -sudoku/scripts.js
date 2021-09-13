let board;
let solvedBoard;
let totalMoves = 0;
let correctMoves = 0;
let moves = [0,0];
let gameWon = false;

let mins = 0;
let seconds = 0;

function startTimer(){
  timex = setTimeout(function(){
    seconds++;
    if (seconds > 59) {
        seconds=0;mins++;
    }   
    if (mins< 10) {                     
      $("#mins").text('0'+mins);
    } else {
        $("#mins").text(mins+':');
    }
    if (seconds < 10) {
      $("#seconds").text('0'+seconds);
    } else {
      $("#seconds").text(seconds);
    }
    getScore();
    startTimer();
  }, 1000);
}

const difficultyChoice = document.querySelectorAll('.info__difficulty-btn');
for (let x = 0; x < difficultyChoice.length; x++) {
    difficultyChoice[x].addEventListener('click', () => {
        for (let y = 0; y < difficultyChoice.length; y++) {
            difficultyChoice[y].classList.remove('btn-active')
        }
        difficultyChoice[x].classList.add('btn-active');
    });
}

$('.results__grade').on('click', function(){openOverlay();});

const generateBoard = () => {
    // Reset possible problem variables
    if ($('.node__incorrect')) {
        $('.node__incorrect').removeClass('node__incorrect');
    }
    moves = moves.map(x => 0);
    updateMoves();
    mins =0;
    seconds =0;
    $('#mins').html('00');
    $('#seconds').html('00');

    let difficulty = document.querySelectorAll('.btn-active');
    board = document.sudoku.generate(difficulty[0].innerHTML.toLowerCase());
    solvedBoard = document.sudoku.solve(board);
    startTimer();
    displayValuesBoard();
    animateNodes();
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
    if (parseInt(obj.value) == solvedBoard.substring(nodeNum, nodeNum+1)) {
        nodeFeedbackAnimation(obj.classList[1]); //Col
        nodeFeedbackAnimation(obj.classList[2]); //Row
        nodeFeedbackAnimation(obj.classList[3]); //Square
        moves[0]++;
    } else {
        obj.classList.add('node__incorrect');
        moves[1]++;
    }
    updateMoves();
    if (checkWin()) {
        clearTimeout(timex);
        alert('Win');
    }
}

const checkWin = () => {
    for (let x = 0; x < 81; x++) {
        if (board[x] != solvedBoard[x]) {
            return false;
        }
    }
    return true;
}

const updateMoves = () => {
    let moveSpans = document.querySelectorAll('.results__moves-output-label');
    for (let i = 0; i < 2; i++) {
        moveSpans[i].innerHTML = moves[i];
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

const animateNodes = () => {
    let nodes = document.querySelectorAll('.node');
    let index = 0;
    for (let i =0; i < 81; i++) {
        nodes[i].style.display = 'none';
    }
    const animateNode = () => {
        setTimeout(function() {
            console.log(nodes[index]);
            nodes[index].style.display = 'inline-block';
            nodes[index].style.animation = 'spinBottomRight .04s ease-in-out';
            index++;
            if (index < 81) {
                animateNode();
            }
        }, 20);
    }
    animateNode();
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

const getScore = () => {
    let totalSeconds = mins*60 + seconds;
    let percentDiv = document.querySelector('.results__grade-percent');
    let gradeDiv = document.querySelector('.results__grade-letter');
    let percent = 100 - parseInt(totalSeconds/10) - moves[1];
    percentDiv.innerHTML = `${percent}%`;
    if (percent >= 90) {
        gradeDiv.innerHTML = 'A';
    } else if (percent >= 80) {
        gradeDiv.innerHTML = 'B';
    } else if (percent >= 70) {
        gradeDiv.innerHTML = 'C';
    } else if (percent >= 60) {
        gradeDiv.innerHTML = 'D';
    } else {
        gradeDiv.innerHTML = 'F';
    }
}

const openOverlay = () => {
    $('.win').css('display', 'block');
    clearTimeout(timex);
}

const closeOverlay = () => {
    $('.win').css('display', 'none');
    if (gameWon == false) {
        startTimer();
    }
}

generateBoardHTML();