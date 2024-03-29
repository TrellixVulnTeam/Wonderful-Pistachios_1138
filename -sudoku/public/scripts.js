let board;
let solvedBoard;
let totalMoves = 0;
let correctMoves = 0;
let moves = [0,0,0];
let gameWon = false;
let percent = 100;
let mouseMode = false;
let optionFunctionality = false;

let mins = 0;
let seconds = 0;
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

const setOptionFunctionality = () => {
    $('.info__instruction-box-btn').on('mousedown', function() {
        let slider = $(this).children();
        slider = slider[1];
        let overlays = document.querySelectorAll('.node-overlay');
        if (slider.style.zIndex == 1500) {
            slider.style.transform = 'translateX(-100%)';
            setTimeout(function() {
                slider.style.zIndex = '-1000';
            }, 400);
            if (slider.classList.contains('mouse-mode')) {
                for (let i = 0; i < overlays.length; i++) {
                    overlays[i].style.display = 'none';
                    displayValuesBoard();
                    mouseMode = false;
                }
            }
            if (slider.classList.contains('highlights')) {
                $('.node').off();
                $('.node-overlay-sub').off();
            }
        } else {
            slider.style.zIndex = '1500';
            slider.style.transform = 'translateX(0)';
            if (slider.classList.contains('mouse-mode')) {
                for (let i = 0; i < overlays.length; i++) {
                    overlays[i].style.display = 'block';
                    displayValuesBoard();
                    mouseMode = true;
                    mouseMove();
                }
            }
            if (slider.classList.contains('highlights')) {
                $('.node').on('mouseenter', function() {
                    highlight($(this)[0], true);
                });
                $('.node').on('mouseleave', function() {
                    highlight($(this)[0], false);
                });
                $('.node-overlay-sub').on('mouseenter', function() {
                    let node = $(this)[0].parentElement.previousSibling;
                    highlight(node, true);
                });
                $('.node-overlay-sub').on('mouseleave', function() {
                    let node = $(this)[0].parentElement.previousSibling;
                    highlight(node, false);
                });
            }
        }
    });
}

const mouseMove = () => {
    $('.node-overlay-sub').on('click', function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        let el = $(this)[0];
        let value = el.innerText;
        let overlay = el.parentElement;
        let input = overlay.previousSibling;
        overlay.style.display = 'none';
        input.value = value;
        validateBoard(input);
    });
}

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
            progressText.innerText = '';
            progressText.appendChild(gradeSpan);
            progressText.style.opacity = '1';
            setTimeout(animateResultsList, 0);
        }, 500)
    }, 1400)
}

const animateResultsList = () => {
    resultItems = document.querySelectorAll('.win__overlay-results-item');
    getResultsContent(resultItems);
    delay = 0;
    for (let i = 0; i < resultItems.length; i++) {
        delay += 500;
        setTimeout(function() {
            resultItems[i].style.transform = 'translateY(0)';
        }, delay);
    }
}

const getResultsContent = (resultItems) => {
    resultItems[0].innerHTML = `You solved the puzzle in ${document.querySelector('.results__timer-text').textContent.split(" ").join("")}`;
    resultItems[1].innerHTML = `You made a move every ${seconds > 0 && moves[0] > 0 && moves[1] > 0 ? (((mins > 0 ? mins * 60 : 0) + seconds) / (moves[0] + moves[1])).toFixed(2) : 0} seconds`;
    resultItems[2].innerHTML = `Your moves were ${moves[0] > 0 && moves[1] > 0 ? parseInt((moves[0] / (moves[0] + moves[1])) * 100) : 0}% correct`;
    resultItems[3].innerHTML = `You completed the puzzle on ${document.querySelector('.btn-active').innerHTML} difficulty`;
    resultItems[4].innerHTML = `Your global ranking for this difficulty is ${parseInt(Math.random() * 1000)}`;
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
    if (!optionFunctionality) {
        setOptionFunctionality();
        optionFunctionality = true;
    }

    let difficulty = document.querySelectorAll('.btn-active')[0].innerHTML.toLowerCase();
    if (difficulty == 'harder') {
        difficulty = 'very-hard';
    }
    board = document.sudoku.generate(difficulty);
    solvedBoard = document.sudoku.solve(board);
    startTimer();
    displayValuesBoard();
    animateNodes();
}

const displayValuesBoard = () => {
    let nodes = document.querySelectorAll('.node');
    for (let x = 0; x < 81; x++) {
        nodes[x].value = '';
        nodes[x].disabled = false;
    }
    for (let x = 0; x < 81; x++) {
        if (board.substring(x, x+1) != '.') {
            nodes[x].value = board.substring(x, x+1);
            nodes[x].disabled = true;
            if (nodes[x].disabled) {
                nodes[x].nextSibling.style.display = 'none';
            }
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
        obj.disabled = true;
    } else {
        obj.classList.add('node__incorrect');
        obj.focus();
        moves[1]++;
        moves[2] = 1;
        if (mouseMode) {
            setTimeout(function() {
                obj.classList.remove('node__incorrect');
                obj.value = '';
                obj.nextSibling.style.display = 'block';
                obj.blur();
            }, 500);
        }
    }
    updateMoves();
    if (checkWin()) {
        clearTimeout(timex);
        openOverlay();
    }
}

const checkWin = () => {
    for (let x = 0; x < 81; x++) {
        if (board[x] != solvedBoard[x]) {
            return false;
        }
    }
    gameWon = true;
    return true;
}

const updateMoves = () => {
    let moveSpans = document.querySelectorAll('.results__moves-output-label');
    if (moves[0] > 99) {
        moves[0] = 99;
    } else if (moves[1] > 99) {
        moves[1] = 99;
    }
    for (let i = 0; i < 2; i++) {
        moveSpans[i].style.animation = 'none';
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                if (moves[2] == 0 && moves[0] != 0) {
                    moveSpans[0].style.animation = 'fadeInDrop .2s ease-in-out';
                } else if (moves[2] == 1 && moves[1] != 0) {
                    moveSpans[1].style.animation = 'fadeInDrop .2s ease-in-out';
                }   
            });
        });
        setTimeout(function() {
            moveSpans[i].innerHTML = moves[i];
        }, 100)
    }
}

const highlight = (obj, on) => {3
    let columnNodes = document.querySelectorAll(`input.${obj.classList[1]}`);
    let rowNodes = document.querySelectorAll(`input.${obj.classList[2]}`);
    let squareNodes = document.querySelectorAll(`input.${obj.classList[3]}`);
    let fullSet = [columnNodes, rowNodes, squareNodes];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 9; y++) {
            if (on) {
                fullSet[x][y].classList.add('highlight');
            } else {
                fullSet[x][y].classList.remove('highlight');
            }
        }
    }
    if (mouseMode) {
        let subs = obj.nextSibling.children
        if (on) {
            for (let i = 0; i < subs.length; i++) {
                subs[i].classList.add('highlight-sub');
            }
        } else {
            for (let i = 0; i < subs.length; i++) {
                subs[i].classList.remove('highlight-sub');
            }
        }
        
    }
    obj.classList.remove('highlight');
}

const nodeFeedbackAnimation = (objClass) => {
    let nodes = document.querySelectorAll(`input.${objClass}`);
    let curVals = [];
    for (let x = 0; x < 9; x++) {
        if (nodes[x].value == '') {}
        else {
            curVals.push(nodes[x].value);
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
            nodes[x].classList.add('node__correct');
            nodes[x].style.animation = 'none';
            window.requestAnimationFrame(function(time) {
                window.requestAnimationFrame(function(time) {
                    nodes[x].style.animation = 'spin .8s ease-out';
                });
            });
            setTimeout(function () {nodes[x].classList.remove('node__correct')}, 800);
        }
    }
}

const animateNodes = () => {
    let nodes = document.querySelectorAll('.node-wrap');
    let index = 0;
    for (let i =0; i < 81; i++) {
        nodes[i].style.display = 'none';
    }
    const animateNode = () => {
        setTimeout(function() {
            nodes[index].style.display = 'inline-block';
            index++;
            if (index < 81) {
                animateNode();
            }
        }, 4);
    }
    animateNode();
}

const generateBoardHTML = () => {
    let boardDiv = document.querySelector('.board');
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let wrapper = document.createElement('div');
            wrapper.className = 'node-wrap ';

            let input = document.createElement('input');
            input.className = 'node ';
            input.className += `c${y} `;
            wrapper.className += `c${y} `;
            input.className += `r${x} `;
            wrapper.className += `r${x} `;
            if (x < 3) {
                if (y < 3) {
                    input.className += 's1 ';
                } else if (y < 6) {
                    input.className += 's2 ';
                } else {
                    input.className += 's3 ';
                }
            } else if (x < 6) {
                if (y < 3) {
                    input.className += 's4 ';
                } else if (y < 6) {
                    input.className += 's5 ';
                } else {
                    input.className += 's6 ';
                }
            } else if (x < 9) {
                if (y < 3) {
                    input.className += 's7 ';
                } else if (y < 6) {
                    input.className += 's8 ';
                } else {
                    input.className += 's9 ';
                }
            }
            input.className += `n${(x * 9) + y}`;
            input.setAttribute('maxlength', '1');
            input.addEventListener('dblclick',function(){input.value=''});
            input.addEventListener('keyup',
            function(key) {
                if(key.key == '1' || key.key == '2' || key.key == '3' || key.key == '4' || key.key == '5' || key.key == '6' || key.key == '7' || key.key == '8' || key.key == '9') {
                    input.value = key.key;
                    validateBoard(this);
                } else {
                    setTimeout(function(){
                        input.value = '';
                    }, 100);
                }
            });

            let overlay = document.createElement('div');
            overlay.className = 'node-overlay';
            for (let i = 1; i <= 9; i++) {
                let sub = document.createElement('div');
                let subText = document.createElement('span');
                subText.innerHTML = i;
                sub.className = 'node-overlay-sub';
                sub.appendChild(subText);
                overlay.appendChild(sub);
            }

            wrapper.appendChild(input);
            wrapper.appendChild(overlay);
            boardDiv.appendChild(wrapper);
        }
    }
}

const getScore = () => {
    let totalSeconds = mins*60 + seconds;
    let percentDiv = document.querySelector('.results__grade-percent');
    let gradeDiv = document.querySelector('.results__grade-letter-content');
    percent = 100 - parseInt(totalSeconds/10) - moves[1];
    if (percent < 0) {
        percent = 0;
    }
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
    let modifier = document.createElement('span');
    modifier.classList = 'results__grade-letter-modifier';
    gradeDiv.appendChild(modifier);
    if (percent > 50) {
        if (percent % 10 > 6 || percent == 100) {
            modifier.innerHTML += '+';
            gradeDiv.style.transform = 'translateX(-8%)';
        } else if (percent % 10 > 2) {
            // Nothing
            gradeDiv.style.transform = 'translateX(0)';
        } else {
            modifier.innerHTML += '-';
            gradeDiv.style.transform = 'translateX(-8%)';
        }
    }
}

const openOverlay = () => {
    $('.win').css('display', 'block');
    animateOverlay();
    clearTimeout(timex);
}

const closeOverlay = () => {
    resultItems = document.querySelectorAll('.win__overlay-results-item');
    for (let i = 0; i < resultItems.length; i++) {
        resultItems[i].style.transform = 'translateY(800px)';
    }
    $('.win').css('display', 'none');
    if (!gameWon) {
        startTimer();
    }
}

const assist = () => {
    let nodes = document.querySelectorAll('.node:not(:disabled)');
    let counts = [];
    let countReference = [];
    for (let x = 0; x < nodes.length; x++) {
        let colNodes = document.querySelectorAll(`input.${nodes[x].classList[1]}`); //Col
        let rowNodes = document.querySelectorAll(`input.${nodes[x].classList[2]}`); //Row
        let squareNodes = document.querySelectorAll(`input.${nodes[x].classList[3]}`); //Square
        let numCount = 0;
        for (let i = 0; i < colNodes.length; i++) {
            if (colNodes[i].value.length > 0) {
                numCount++;
            }
        }
        for (let i = 0; i < rowNodes.length; i++) {
            if (rowNodes[i].value.length > 0) {
                numCount++;
            }
        }
        for (let i = 0; i < squareNodes.length; i++) {
            if (squareNodes[i].value.length > 0) {
                numCount++;
            }
        }
        counts.push(numCount);
        countReference.push(nodes[x].classList[4]);
    }
    console.log(counts);
    console.log(Math.max(...counts));
    console.log(counts.indexOf(Math.max(...counts)));
    let indexEasiest = counts.indexOf(Math.max(...counts));
    let easiestNode = countReference[indexEasiest];
    console.log(easiestNode);
    console.log(document.querySelector(`.${easiestNode}`));
    let node = document.querySelector(`.${easiestNode}`)
    node.style.animation = 'none';
    window.requestAnimationFrame(function(time) {
        window.requestAnimationFrame(function(time) {
            node.style.animation = 'spin .8s ease-out';
        });
    });
}

$('.results__menu-login').on('mouseenter', () => {
    setTimeout(() => {
        if ($(".results__menu-login:hover").length != 0) {
            let logo = $('.results__menu-login-google')[0];
            logo.src = "img/google-logo.png";
            setTimeout(() => {
                logo.style.transition = "all .2s cubic-bezier(0.87, 0, 0.13, 1)"
                logo.style.transform = "scale(1) rotate(360deg)";
                logo.style.opacity = '1';
            }, 50)
        }
    }, 200)
})
$('.results__menu-login').on('mouseleave', () => {
    let logo = $('.results__menu-login-google')[0];
    logo.style.removeProperty('transition');
    logo.style.removeProperty('opacity');
    logo.style.removeProperty('transform');
    logo.src = "img/google_logo.png";
})

generateBoardHTML();