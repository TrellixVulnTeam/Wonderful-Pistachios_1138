let board;
let solvedBoard;
let totalMoves = 0;
let correctMoves = 0;
let moves = [0,0,0];
let gameWon = false;
let percent = 100;

let mins;
let seconds;
let timex;
let timerFlags = [0,0,0];

const difficultyChoice = document.querySelectorAll('.info__difficulty-btn');
for (let x = 0; x < difficultyChoice.length; x++) {
    difficultyChoice[x].addEventListener('click', () => {
        for (let y = 0; y < difficultyChoice.length; y++) {
            difficultyChoice[y].classList.remove('btn-active')
        }
        difficultyChoice[x].classList.add('btn-active');
    });
}
$('.results__grade-overlay').on('click', function(){openOverlay();});

const animateOverlay = () => {
    document.querySelector('#progressContainer').innerHTML = '';
    let bar = new ProgressBar.Circle('#progressContainer', {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          value: '',
          autoStyleContainer: false
        },
        from: {color: '#FD5A5A', width: 4},
        to: {color: '#75EC75', width: 4},
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
      
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value + '%');
          }
          circle.text.style.color = state.color;
        }
      });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    let percentage = parseFloat(percent/100);
    bar.animate(percentage);
    setTimeout(function() {
        let progressText = document.querySelector('.progressbar-text');
        progressText.style.opacity = '0';
        setTimeout(function() {
            let color = document.querySelector('.progressbar-text').style.color;
            let grade = document.querySelector('.results__grade-letter').innerHTML;
            let gradeSpan = document.createElement('p');
            gradeSpan.style.color = color;
            gradeSpan.classList = 'progressbar-grade';
            gradeSpan.innerHTML = grade;
            let percentSpan = document.createElement('p');
            percentSpan.style.color = color;
            percentSpan.classList = 'progressbar-percent';
            percentSpan.innerHTML = `${percentage*100}%`;
            progressText.innerText = '';
            progressText.appendChild(percentSpan);
            progressText.appendChild(gradeSpan);
            progressText.style.opacity = '1';
            setTimeout(animateResultsList, 500);
        }, 500)
    }, 1400)
}

const animateResultsList = () => {
    resultItems = document.querySelectorAll('.win__overlay-results-item');
    delay = 0;
    for (let i = resultItems.length; i >= 0; i--) {
        delay += 200;
        setTimeout(function() {
            resultItems[i].style.transform = 'translateY(0)';
        }, delay);
    }
}

function startTimer(){
    timex = setTimeout(function(){
        seconds++;
        setTimeout(function() {
            if (seconds > 59) {
                seconds=0;mins++;
            } 
            if (mins < 10) {                     
                $("#mins-ten").text('0');
                $("#mins-one").text(mins % 10);
            } else {
                $("#mins-ten").text(parseInt(mins/10));
                $("#mins-one").text(mins % 10);
            }
            if (seconds < 10) {
                $("#seconds-ten").text('0');
                $("#seconds-one").text(seconds % 10);
            } else {
                $("#seconds-ten").text(parseInt(seconds/10));
                $("#seconds-one").text(seconds % 10);
            }
        }, 1000)
        if ((mins % 10) == 9 && seconds == 60) {
            timerFlags[0] = true;
        }
        if (seconds > 59) {
            timerFlags[1] = true;
            seconds=0;mins++;
        }  
        if (seconds % 10 == 0) {
            timerFlags[2] = true;
        }
        getScore();
        startTimer();
        animateTimer();
  }, 1000);
}

function animateTimer() {
    let minTenSpan = document.querySelector('#mins-ten');
    let minOneSpan = document.querySelector('#mins-one');
    let secondTenSpan = document.querySelector('#seconds-ten');
    let secondOneSpan = document.querySelector('#seconds-one');
    let afterTags = document.createElement('style');
    afterTags.innerHTML = `
    #mins-ten::after {
        content: '${parseInt(mins/10)}';
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
    }
    #mins-one::after {
        content: '${mins % 10}';
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
    }
    #seconds-ten::after {
        content: '${parseInt(seconds/10)}';
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
    }
    #seconds-one::after {
        content: '${seconds % 10}';
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
    }
    `;
    document.head.appendChild(afterTags);
    if (timerFlags[0]) {resetTimerAnimation(minTenSpan)}
    if (timerFlags[1]) {resetTimerAnimation(minOneSpan)}
    if (timerFlags[2]) {resetTimerAnimation(secondTenSpan)}
    resetTimerAnimation(secondOneSpan);
    setTimeout(function() {afterTags.remove()}, 1000);
    timerFlags = [false, false, false];
}

const resetTimerAnimation = (el) => {
    el.style.animation = 'none';
    window.requestAnimationFrame(function(time) {
        window.requestAnimationFrame(function(time) {
            el.style.animation = 'timerSlideTop 1s cubic-bezier(0.87, 0, 0.13, 1)';
        });
    });
}

const generateBoard = () => {
    // Reset possible problem variables
    if ($('.node__incorrect')) {
        $('.node__incorrect').removeClass('node__incorrect');
    }
    moves = moves.map(x => 0);
    updateMoves();
    mins = 0;
    seconds = 0;
    $('#mins').html('00');
    $('#seconds').html('00');
    if (timex) {
        clearTimeout(timex);
    }

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
        moves[2] = 0;
    } else {
        obj.classList.add('node__incorrect');
        moves[1]++;
        moves[2] = 1;
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
    let output1 = document.querySelector('.results__moves-output-1-overlay');
    let output2 = document.querySelector('.results__moves-output-2-overlay');
    for (let i = 0; i < 2; i++) {
        moveSpans[i].style.animation = 'none';
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                if (moves[2] == 0 && moves[0] != 0) {
                    moveSpans[0].style.animation = 'fadeInDrop .1s ease-out';
                    output1.style.opacity = '0.2';
                } else if (moves[2] == 1 && moves[1] != 0) {
                    moveSpans[1].style.animation = 'fadeInDrop .1s ease-out';
                    output2.style.opacity = '0.2';
                }   
            });
        });
        setTimeout(function() {
            moveSpans[i].innerHTML = moves[i];
            output1.style.opacity = '0';
            output2.style.opacity = '0';
        }, 100)
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
            columnNodes[x].style.animation = 'none';
            window.requestAnimationFrame(function(time) {
                window.requestAnimationFrame(function(time) {
                    columnNodes[x].style.animation = 'spin .8s ease-out';
                });
            });
            setTimeout(function () {columnNodes[x].classList.remove('node__correct')}, 800);
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
            nodes[index].style.display = 'inline-block';
            nodes[index].style.animation = 'spinBottomRight .04s ease-in-out';
            index++;
            if (index < 81) {
                animateNode();
            }
        }, 10);
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
    percent = 100 - parseInt(totalSeconds/10) - moves[1];
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
    animateOverlay();
    clearTimeout(timex);
}

const closeOverlay = () => {
    $('.win').css('display', 'none');
    if (gameWon == false) {
        startTimer();
    }
}

generateBoardHTML();