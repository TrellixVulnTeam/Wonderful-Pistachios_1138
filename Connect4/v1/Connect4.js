// Connect 4
// Multi-dimensional array holds strings of "y", "r", or "-" = yellow, red, empty
// to represent cells of connect4 board


//Array for holding current values of board
var gameBoard = [
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
];
//Array for testing moves
var ghostBoard = [
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-", "-"],
];
//Keeps track of who's move (com or player) and total moves
var clickCounter = 0;
// Status of game
var gameOver = false;


// ===============================================================


// td(s) represent chip slots, this is the listener for user moves
$("td").click(function() {
	if (gameOver == false) {
		var spot = $(this).attr("id");
		var x = spot.charAt(1);
		makeMove(x);
	}
});

// Reset button only works if game is over
$("#bottomTextBox").click(function() {
	if (gameOver) {
		clearBoard();
		gameOver = false;
		clickCounter = 0;
		$("#bottomTextBox p").text("");
		playerTurn();
	}
});

// Not Permanent click for com move on left div
$("#Connect4").click(function() {

	secondLayerMove();
});

function makeMove(x) {
	var yLimit;

	// Determine the color
	var color;
		if (clickCounter % 2 == 0) {
			color = "yellow";
		}
		else if (clickCounter % 2 == 1) {
			color = "red";
		}


	// find where chip should be placed update board with correct color and yLimit
	var oneMove = true;
	for (var y = 7; y >= 0; y--) {
		if (gameBoard[y][x] == "-" && oneMove) {
			oneMove = false;
			if (color == "yellow") {
				gameBoard[y][x] = "Y";
			}
			else if (color == "red") {
				gameBoard[y][x] = "R";
			}
			yLimit = y;
		}
	}

	cardAnimationLoop(x, 0, yLimit, color);
	saveGhost();
	printGhost();
}

function cardAnimationLoop(x, y, yLimit, color) {
	if (y <= yLimit) {
		setTimeout(function() {
			var idString = "#" + y + x;
			$(idString).attr("style", "none");
			$(idString).css("background", color);
			if (y >= 1) {
				idString = "#" + (y-1) + x;
				$(idString).css("background", "white");
			}
			y++;
			cardAnimationLoop(x, y, yLimit, color);
		}, 30);
	}

	else {
		clickCounter++;
		boardLoad();
		if (winCheck(gameBoard)) {
			stopLoop = false;
			gameOver = true;
			$("#bottomTextBox p").text("Winner! New Game?");
		}
		playerTurn();
	}
}

function boardLoad() {
	for(var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			var idString = "#" + y + x;

			if (gameBoard[y][x] == "R") {
				$(idString).css("background", "red");
			}

			else if (gameBoard[y][x] == "Y") {
				$(idString).css("background", "yellow");
			}

			else if (gameBoard[y][x] == "-") {
				$(idString).css("background", "white");
			}
		}
	}
}

function playerTurn() {
	if (clickCounter % 2 == 0 && gameOver == false) {
		$("#comBox h1").removeClass("playerTurn");
		$("#comBox h1").text("Com");
		$("#youBox h1").addClass("playerTurn");
		$("#youBox h1").text("Your Turn");
	}
	else if (clickCounter % 2 == 1 && gameOver == false) {
		$("#youBox h1").removeClass("playerTurn");
		$("#youBox h1").text("You");
		$("#comBox h1").addClass("playerTurn");
		$("#comBox h1").text("Com's Turn");
		secondLayerMove();
	}
}

function winCheck(board) {
	var stopLoop = true;

	for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			if (stopLoop) {
				var color = board[x][y];
				if (color == "R" || color == "Y") {
					if (rowCheck(x, y, color) || colCheck(x, y, color) || diagCheck(x, y, color)) {
						stopLoop = false;
						return true;
					}
				}
			}
		}
	}

	if (stopLoop == false) {
		return false;
	}

	function rowCheck(x, y, color) {
		var rowBoolean = false;
		
		if (x < 5) {
			if (board[x+1][y] == color && board[x+2][y] == color && board[x+3][y] == color) {
				rowBoolean = true;
			}
		}

		if (x > 2) {
			if (board[x-1][y] == color && board[x-2][y] == color && board[x-3][y] == color) {
				rowBoolean = true;
			}
		}

		return rowBoolean;
	}

	function colCheck(x, y, color) {
		var colBoolean = false;
		
		if (y < 5) {
			if (board[x][y+1] == color && board[x][y+2] == color && board[x][y+3] == color) {
				colBoolean = true;
			}
		}

		if (y > 2) {
			if (board[x][y-1] == color && board[x][y-2] == color && board[x][y-3] == color) {
				colBoolean = true;
			}
		}

		return colBoolean;
	}

	function diagCheck(x, y, color) {
		var diagBoolean = false;
		
		if (x < 5 && y < 5) {
			if (board[x+1][y+1] == color && board[x+2][y+2] == color && board[x+3][y+3] == color) {
				diagBoolean = true;
			}
		}

		if (x > 2 && y < 5) {
			if (board[x-1][y+1] == color && board[x-2][y+2] == color && board[x-3][y+3] == color) {
				diagBoolean = true;
			}
		}

		return diagBoolean;
	}
}

function clearBoard() {
	for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			gameBoard[x][y] = "-";
		}
	}
	boardLoad();
}

function comMove(board) {

	var chipSlot;
	var funcBoolean = true;
	var checkMessage = "";


	if (funcBoolean) {
		threeCellCheck();
	}

	if (funcBoolean) {
		randomMove();
	}

	function threeCellCheck() {
		var stopLoop = true;
		var savedColor;

		for (var x = 0; x < 8; x++) {
			for (var y = 0; y < 8; y++) {
				if (stopLoop) {
					var color = board[y][x];
					if (color == "R" || color == "Y") {
						if (rowCheck(x, y, color) || colCheck(x, y, color) || diagCheck(x, y, color) || rowMiddleCheck(x, y, color) || diagMiddleCheck(x, y, color)) {
							stopLoop = false;
							savedColor = color;
						}
					}
				}
			}
		}

		if (stopLoop == false) {
			funcBoolean = false;
		}

		function rowCheck(x, y, color) {
			var rowBoolean = false;
			
			if (x < 6 && x > 0) {
				if (board[y][x+1] == color && board[y][x+2] == color) {
					if (y < 7) {
						if (board[y+1][x-1] == "R" || board[y+1][x-1] == "Y") {
							if (board[y][x-1] == "-") {
								chipSlot = x-1;
								rowBoolean = true;
								checkMessage = "Block!  --  row-left";
							}
						}
					}

					else if (board[7][x-1] == "-") {
						chipSlot = x-1;
						rowBoolean = true;
						checkMessage = "Block!  --  row-left";
					}
				}
			}

			if (x > 1 && x < 7) {
				if (board[y][x-1] == color && board[y][x-2] == color) {
					if (y < 7) {
						if (board[y+1][x+1] == "R" || board[y+1][x+1] == "Y") {
							if (board[y][x+1] == "-") {
								chipSlot = x+1;
								rowBoolean = true;
								checkMessage = "Block!  --  row-right";
							}
						}
					}

					else if (board[7][x+1] == "-") {
						chipSlot = x+1;
						rowBoolean = true;
						checkMessage = "Block!  --  row-right";
					}
				}
			}

			return rowBoolean;
		}

		function colCheck(x, y, color) {
			var colBoolean = false;

			if (y < 6 && y > 0) {
				if (board[y+1][x] == color && board[y+2][x] == color) {
					if (board[y-1][x] == "-") {
						colBoolean = true;
						chipSlot = x;
						checkMessage = "Block!  --  col";
					}
				}
			}

			return colBoolean;
		}

		function diagCheck(x, y, color) {
			var diagBoolean = false;
			
			if (x < 6 && y < 6 && x > 0) {
				if (board[y+1][x+1] == color && board[y+2][x+2] == color) {
					if (y > 0) {
						if (board[y][x-1] == "R" || board[y][x-1] == "Y") {
							if (board[y-1][x-1] == "-") {
								diagBoolean = true;
								chipSlot = x-1;
								checkMessage = "Block!  --  diag-top-left";
							}
						}
					}
				}
			}

			if (x > 1 && y < 6 && x < 7) {
				if (board[y+1][x-1] == color && board[y+2][x-2] == color) {
					if (y > 0) {
						if (board[y][x+1] == "R" || board[y][x+1] == "Y") {
							if (board[y-1][x+1] == "-") {
								diagBoolean = true;
								chipSlot = x + 1;
								checkMessage = "Block!  --  diag-top-right";
							}
						}
					}
				}
			}

			if (x < 5 && y < 5) {
				if (board[y+1][x+1] == color && board[y+2][x+2] == color && board[y+3][x+3] == "-") {
					diagBoolean = true;
					chipSlot = x+3;
					checkMessage = "Block!  --  diag-bottom-right";
				}
			}

			if (x > 2 && y < 5) {
				if (board[y+1][x-1] == color && board[y+2][x-2] == color && board[y+3][x-3] == "-") {
					diagBoolean = true;
					chipSlot = x-3;
					checkMessage = "Block!  --  diag-bottom-left";
				}
			}

			return diagBoolean;
		}

		function rowMiddleCheck(x, y, color) {
			var middleBoolean = false;

			if (x < 5) {
				if (y < 7) {
					if (board[y][x+1] == color && board[y][x+2] == "-" && board[y][x+3] == color) {
						if (board[y+1][x+2] == "R" || board[y+1][x+2] == "Y") {
							chipSlot = x+2;
							middleBoolean = true;
							checkMessage = "Block!  --  middle-right-row";
						}
					}

					else if (board[y][x+1] == "-" && board[y][x+2] == color && board[y][x+3] == color) {
						if (board[y+1][x+1] == "R" || board[y+1][x+1] == "Y") {
							chipSlot = x+1;
							middleBoolean = true;
							checkMessage = "Block!  --  middle-left-row";
						}
					}
				}

				else {
					if (board[y][x+1] == color && board[y][x+2] == "-" && board[y][x+3] == color) {
						chipSlot = x+2;
						middleBoolean = true;
						checkMessage = "Block!  --  middle-right-row-7";
					}

					else if (board[y][x+1] == "-" && board[y][x+2] == color && board[y][x+3] == color) {
						chipSlot = x+1;
						middleBoolean = true;
						checkMessage = "Block!  --  middle-left-row-7";
					}
				}
			}

			return middleBoolean;
		}

		function diagMiddleCheck(x, y, color) {
			var diagMiddleBoolean = false;

			if (x < 5 && y < 5) {
				if (board[y+1][x+1] == "-" && board[y+2][x+2] == color && board[y+3][x+3] == color) {
					if (board[y+2][x+1] == "R" || board[y+2][x+1] == "Y") {
						chipSlot = x+1;
						diagMiddleBoolean = true;
						checkMessage = "Block!  --  middle-left-diagleft";
					}
				}

				else if (board[y+1][x+1] == color && board[y+2][x+2] == "-" && board[y+3][x+3] == color) {
					if (board[y+3][x+2] == "R" || board[y+3][x+2] == "Y") {
						chipSlot = x+2;
						diagMiddleBoolean = true;
						checkMessage = "Block!  --  middle-right-diagleft";
					}
				}
			}

			if (x > 2 && y < 5) {
				if (board[y+1][x-1] == "-" && board[y+2][x-2] == color && board[y+3][x-3] == color) {
					if (board[y+2][x-1] == "R" || board[y+2][x-1] == "Y") {
						chipSlot = x-1;
						diagMiddleBoolean = true;
						checkMessage = "Block!  --  middle-right-diagright";
					}
				}

				else if (board[y+1][x-1] == color && board[y+2][x-2] == "-" && board[y+3][x-3] == color) {
					if (board[y+3][x-2] == "R" || board[y+3][x-2] == "Y") {
						chipSlot = x-2;
						diagMiddleBoolean = true;
						checkMessage = "Block!  --  middle-left-diagright";
					}
				}
			}

			return diagMiddleBoolean;
		}
	}

	function randomMove() {
		var options = [0, 1, 2, 3, 4, 5, 6, 7];
		for (var x = 0; x < 8; x++) {
			if (board[0][x] == "R" || board[0][x] == "Y") {
				options.splice(x, 1);
			}
		}

		var randomChoice = Math.floor(Math.random() * options.length);
		var x = options[randomChoice];
		chipSlot = x;
		checkMessage = "Random";
	}

	var returnArray = [chipSlot, checkMessage];

	return returnArray;
}

function saveGhost() {
	for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			ghostBoard[y][x] = gameBoard[y][x];
		}
	}
}

function printGhost() {
	console.log("Ghost: ");
	for (var x = 0; x < 8; x++) {
		console.log(ghostBoard[x][0] + "  " + ghostBoard[x][1] + "  " + ghostBoard[x][2] + "  " + ghostBoard[x][3] + "  " + ghostBoard[x][4] + "  " + ghostBoard[x][5] + "  " + ghostBoard[x][6] + "  " + ghostBoard[x][7] + "          " + x);
	}
}

function secondLayerMove() {

	var color = "R";
	
	// make one move on the ghost board
	var comArray = comMove(ghostBoard);
	var chipSlot1 = comArray[0];
	var checkMessage = comArray[1];
	ghostMove(chipSlot1, color);
	printGhost();

	// make anticipated move for yellow
	color = "Y";
	comArray = comMove(ghostBoard);
	var chipSlot2 = comArray[0];
	ghostMove(chipSlot2, color);
	printGhost();

	// check for win on the ghost board if no win then make move
	if (!winCheck(ghostBoard)) {
		setTimeout(function() {
			$("#bottomTextBox p").text(checkMessage);
			makeMove(chipSlot1);
		}, 400);
	}

	// ghost board move function with col and color as parameter
	function ghostMove(x, color) {
		stopLoop = true;
		for (var y = 1; y < 8; y++) {
			if (ghostBoard[y][x] == "Y" || ghostBoard[y][x] == "R" && stopLoop) {
				ghostBoard[y-1][x] = color;
				stopLoop = false;
			}

			else if (y == 7 && stopLoop) {
				ghostBoard[y][x] = color;
				stopLoop = false;
			}
		}
	}
}