var board = [
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
];
var deck = [0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0];
var deckIndex = -1;
var flopsLeft = 5;
var completedSuits = 0;
var autoTimer = false;
var gameOver = false;
var gameSnapshots = [];

$("button").mousedown(function() {

	$(this).css("background", "#ede8e8");
});

$("button").mouseup(function() {

	$("button").css("background", "white");
});

$("#flop").click(function() {
	gameSnapshot();
	cardFlop();
	winCheck();
	boardLoad();
});

$("#start").click(function() {
	var start = new Audio("sounds/start.wav");
	start.play();
	stopWatch.textContent = "00:00";
	seconds = 0; minutes = 0; hours = 0;
	clearTimeout(t);
	setTimeout(function() {
		gameReset();
	}, 1200);
});

$("#hint").click(function() {

	findMove();
});

$("#undo").click(function() {
	revertMove();
	boardLoad();
});

$("#header h1").click(function() {
	if (autoTimer == false) {
		autoTimer = true;
		autoSolver();
	}

	else if (autoTimer = true) {
		autoTimer = false;
	}
});

function gameReset() {
	// Reset vars
	board = [
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	[ , , , , , , , , , ],
	];
	deck = [0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,
			0,0,0,0];
	deckIndex = -1;
	flopsLeft = 5;
	clickCounter = 0;
	completedSuits = 0;
	autoTimer = false;
	autoCounter = 0;
	gameOver = false;
	while (gameSnapshots.length > 0) {
		gameSnapshots.pop();
	}
	// End Reset
	deckCreation();
	initialFlop();
}

function generateBoard() {
	var imgWidth = (screen.width * .08125);
	var imgNumGap = ((imgWidth * 1.41)/5.5);
	for (var x = 1; x <= 10; x++) {
		for (var y = 0; y < 25; y++) {
			$("#col" + x).append("<img src='' style='top:" + (y*imgNumGap) + "px;z-index:" + y + ";' id='" + y + "-" + (x-1) + "'></img>");
		}
	}
	$("img").mouseover(function() {
		dragElement(this);
	});

	$("img").css("max-width", imgWidth + "px");

	// Shift header to the center
	var headMargLeft = ((screen.width - 1050)/2.3) + "px";
	$("#header").css("margin-left", headMargLeft);

	console.log("Images loaded.");
}

function gameSnapshot() {
	var savedBoard = [
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
		[ , , , , , , , , , ],
	];
	for (var y = 0; y < 25; y++) {
		for (var x = 0; x < 10; x++) {
			savedBoard[y][x] = board[y][x];
		}
	}
	var status = {
		board: savedBoard,
		deckIndex: deckIndex,
		flopsLeft: flopsLeft,
		completedSuits: completedSuits
	}
	gameSnapshots.push(status);
	console.log("snapshot saved");
}

function revertMove() {
	// Sound
	var undo = new Audio("sounds/undo.wav");

	var lastMove = (gameSnapshots.length - 1);
	// convert the board
	if (deckIndex > 9) {
		for (var y = 0; y < 25; y++) {
			for (var x = 0; x < 10; x++) {
				board[y][x] = gameSnapshots[lastMove].board[y][x];
			}
		}
		deckIndex = gameSnapshots[lastMove].deckIndex;
		flopsLeft = gameSnapshots[lastMove].flopsLeft;
		completedSuits = gameSnapshots[lastMove].completedSuits;
		gameSnapshots.pop();
		console.log("Move reverted");
		undo.play();
	}

	else {
		console.log("Can't go past the beginning");
	}
}

function printSavedBoard() {
	console.log("\t\t\t\t\t\t" + savedBoard[0][0] + "   " + savedBoard[0][1] + "   " + savedBoard[0][2] + "   " + savedBoard[0][3] + "   " + savedBoard[0][4] + "   " + savedBoard[0][5] + "   " + savedBoard[0][6] + "   " + savedBoard[0][7] + "   " + savedBoard[0][8] + "   " + savedBoard[0][9] + "\t" + "|1" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[1][0] + "   " + savedBoard[1][1] + "   " + savedBoard[1][2] + "   " + savedBoard[1][3] + "   " + savedBoard[1][4] + "   " + savedBoard[1][5] + "   " + savedBoard[1][6] + "   " + savedBoard[1][7] + "   " + savedBoard[1][8] + "   " + savedBoard[1][9] + "\t" + "|2" + "\n" +
				"\t\t\t\t\t\t" + savedBoard[2][0] + "   " + savedBoard[2][1] + "   " + savedBoard[2][2] + "   " + savedBoard[2][3] + "   " + savedBoard[2][4] + "   " + savedBoard[2][5] + "   " + savedBoard[2][6] + "   " + savedBoard[2][7] + "   " + savedBoard[2][8] + "   " + savedBoard[2][9] + "\t" + "|3" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[3][0] + "   " + savedBoard[3][1] + "   " + savedBoard[3][2] + "   " + savedBoard[3][3] + "   " + savedBoard[3][4] + "   " + savedBoard[3][5] + "   " + savedBoard[3][6] + "   " + savedBoard[3][7] + "   " + savedBoard[3][8] + "   " + savedBoard[3][9] + "\t" + "|4" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[4][0] + "   " + savedBoard[4][1] + "   " + savedBoard[4][2] + "   " + savedBoard[4][3] + "   " + savedBoard[4][4] + "   " + savedBoard[4][5] + "   " + savedBoard[4][6] + "   " + savedBoard[4][7] + "   " + savedBoard[4][8] + "   " + savedBoard[4][9] + "\t" + "|5" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[5][0] + "   " + savedBoard[5][1] + "   " + savedBoard[5][2] + "   " + savedBoard[5][3] + "   " + savedBoard[5][4] + "   " + savedBoard[5][5] + "   " + savedBoard[5][6] + "   " + savedBoard[5][7] + "   " + savedBoard[5][8] + "   " + savedBoard[5][9] + "\t" + "|6" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[6][0] + "   " + savedBoard[6][1] + "   " + savedBoard[6][2] + "   " + savedBoard[6][3] + "   " + savedBoard[6][4] + "   " + savedBoard[6][5] + "   " + savedBoard[6][6] + "   " + savedBoard[6][7] + "   " + savedBoard[6][8] + "   " + savedBoard[6][9] + "\t" + "|7" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[7][0] + "   " + savedBoard[7][1] + "   " + savedBoard[7][2] + "   " + savedBoard[7][3] + "   " + savedBoard[7][4] + "   " + savedBoard[7][5] + "   " + savedBoard[7][6] + "   " + savedBoard[7][7] + "   " + savedBoard[7][8] + "   " + savedBoard[7][9] + "\t" + "|8" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[8][0] + "   " + savedBoard[8][1] + "   " + savedBoard[8][2] + "   " + savedBoard[8][3] + "   " + savedBoard[8][4] + "   " + savedBoard[8][5] + "   " + savedBoard[8][6] + "   " + savedBoard[8][7] + "   " + savedBoard[8][8] + "   " + savedBoard[8][9] + "\t" + "|9" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[9][0] + "   " + savedBoard[9][1] + "   " + savedBoard[9][2] + "   " + savedBoard[9][3] + "   " + savedBoard[9][4] + "   " + savedBoard[9][5] + "   " + savedBoard[9][6] + "   " + savedBoard[9][7] + "   " + savedBoard[9][8] + "   " + savedBoard[9][9] + "\t" + "|10" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[10][0] + "   " + savedBoard[10][1] + "   " + savedBoard[10][2] + "   " + savedBoard[10][3] + "   " + savedBoard[10][4] + "   " + savedBoard[10][5] + "   " + savedBoard[10][6] + "   " + savedBoard[10][7] + "   " + savedBoard[10][8] + "   " + savedBoard[10][9] + "\t" + "|11" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[11][0] + "   " + savedBoard[11][1] + "   " + savedBoard[11][2] + "   " + savedBoard[11][3] + "   " + savedBoard[11][4] + "   " + savedBoard[11][5] + "   " + savedBoard[11][6] + "   " + savedBoard[11][7] + "   " + savedBoard[11][8] + "   " + savedBoard[11][9] + "\t" + "|12" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[12][0] + "   " + savedBoard[12][1] + "   " + savedBoard[12][2] + "   " + savedBoard[12][3] + "   " + savedBoard[12][4] + "   " + savedBoard[12][5] + "   " + savedBoard[12][6] + "   " + savedBoard[12][7] + "   " + savedBoard[12][8] + "   " + savedBoard[12][9] + "\t" + "|13" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[13][0] + "   " + savedBoard[13][1] + "   " + savedBoard[13][2] + "   " + savedBoard[13][3] + "   " + savedBoard[13][4] + "   " + savedBoard[13][5] + "   " + savedBoard[13][6] + "   " + savedBoard[13][7] + "   " + savedBoard[13][8] + "   " + savedBoard[13][9] + "\t" + "|14" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[14][0] + "   " + savedBoard[14][1] + "   " + savedBoard[14][2] + "   " + savedBoard[14][3] + "   " + savedBoard[14][4] + "   " + savedBoard[14][5] + "   " + savedBoard[14][6] + "   " + savedBoard[14][7] + "   " + savedBoard[14][8] + "   " + savedBoard[14][9] + "\t" + "|15" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[15][0] + "   " + savedBoard[15][1] + "   " + savedBoard[15][2] + "   " + savedBoard[15][3] + "   " + savedBoard[15][4] + "   " + savedBoard[15][5] + "   " + savedBoard[15][6] + "   " + savedBoard[15][7] + "   " + savedBoard[15][8] + "   " + savedBoard[15][9] + "\t" + "|16" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[16][0] + "   " + savedBoard[16][1] + "   " + savedBoard[16][2] + "   " + savedBoard[16][3] + "   " + savedBoard[16][4] + "   " + savedBoard[16][5] + "   " + savedBoard[16][6] + "   " + savedBoard[16][7] + "   " + savedBoard[16][8] + "   " + savedBoard[16][9] + "\t" + "|17" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[17][0] + "   " + savedBoard[17][1] + "   " + savedBoard[17][2] + "   " + savedBoard[17][3] + "   " + savedBoard[17][4] + "   " + savedBoard[17][5] + "   " + savedBoard[17][6] + "   " + savedBoard[17][7] + "   " + savedBoard[17][8] + "   " + savedBoard[17][9] + "\t" + "|18" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[18][0] + "   " + savedBoard[18][1] + "   " + savedBoard[18][2] + "   " + savedBoard[18][3] + "   " + savedBoard[18][4] + "   " + savedBoard[18][5] + "   " + savedBoard[18][6] + "   " + savedBoard[18][7] + "   " + savedBoard[18][8] + "   " + savedBoard[18][9] + "\t" + "|19" + "\n" + 
				"\t\t\t\t\t\t" + savedBoard[19][0] + "   " + savedBoard[19][1] + "   " + savedBoard[19][2] + "   " + savedBoard[19][3] + "   " + savedBoard[19][4] + "   " + savedBoard[19][5] + "   " + savedBoard[19][6] + "   " + savedBoard[19][7] + "   " + savedBoard[19][8] + "   " + savedBoard[19][9] + "\t" + "|20" + "\n");
}

function colSubString(id) {
	var a = id.indexOf("-");
	var b = id.substring(a+1);
	return b;
}

function multiTopIndex(id) {
	var a = id.indexOf("-");
	var b = id.substring(0, a);
	return b;
}

function boardLoad() {
	for (var y = 0; y < 25; y++) {
		for (var x = 0; x < 10; x++) {
			var val = board[y][x];
			var source = cardEncryption(val);
			var idString = "#" + y + "-" + x
			$(idString).attr("src", source);
			$(idString).addClass("playable")
			if (board[y][x] == "." || board[y][x] == "-") {
				$(idString).removeClass("playable");
			}
		}
	}
}

function cardDecryption(source) {

	var card = 0;

	if (source == "PNG\\AC.png") {
		card = 1;
	}

	else if (source == "PNG\\2C.png") {
		card = 2;
	}

	else if (source == "PNG\\3C.png") {
		card = 3;
	}

	else if (source == "PNG\\4C.png") {
		card = 4;
	}

	else if (source == "PNG\\5C.png") {
		card = 5;
	}

	else if (source == "PNG\\6C.png") {
		card = 6;
	}

	else if (source == "PNG\\7C.png") {
		card = 7;
	}

	else if (source == "PNG\\8C.png") {
		card = 8;
	}

	else if (source == "PNG\\9C.png") {
		card = 9;
	}

	else if (source == "PNG\\10C.png") {
		card = 10;
	}

	else if (source == "PNG\\JC.png") {
		card = 11;
	}

	else if (source == "PNG\\QC.png") {
		card = 12;
	}

	else if (source == "PNG\\KC.png") {
		card = 13;
	}

	else if (source == "PNG\\gray_back.png") {
		card = 14;
	}

	return card;
}

function cardEncryption(val) {

	var src = "";

	if (val == "A") {
		src = "PNG\\AC.png";
	}

	else if (val == "2") {
		src = "PNG\\2C.png";
	}

	else if (val == "3") {
		src = "PNG\\3C.png";
	}

	else if (val == "4") {
		src = "PNG\\4C.png";
	}

	else if (val == "5") {
		src = "PNG\\5C.png";
	}

	else if (val == "6") {
		src = "PNG\\6C.png";
	}
	
	else if (val == "7") {
		src = "PNG\\7C.png";
	}
	
	else if (val == "8") {
		src = "PNG\\8C.png";
	}
	
	else if (val == "9") {
		src = "PNG\\9C.png";
	}
	
	else if (val == "T") {
		src = "PNG\\10C.png";
	}
	
	else if (val == "J") {
		src = "PNG\\JC.png";
	}
	
	else if (val == "Q") {
		src = "PNG\\QC.png";
	}
	
	else if (val == "K") {
		src = "PNG\\KC.png";
	}

	else if (val == ".") {
		src = "PNG\\gray_back.png"
	}

	else if (val == "-") {
		src = ""
	}

	return src;
}

function deckCreation() {
		var numK = 8;
		var numQ = 8;
		var numJ = 8;
		var numT = 8;
		var num9 = 8;
		var num8 = 8;
		var num7 = 8;
		var num6 = 8;
		var num5 = 8;
		var num4 = 8;
		var num3 = 8;
		var num2 = 8;
		var numA = 8;
		
		var twoSuitBreak = 6;
		
		for (var i = 0; i < deck.length; i++) {
			if (i == 25 || i == 51 || i == 77) {
				twoSuitBreak -= 2;
			}
			var choiceNotMade = true;
			while (choiceNotMade) {
				var ranNum = Math.floor(Math.random() * 13) + 1;
				
				if (ranNum == 1 && numA > twoSuitBreak) {
					deck[i] = "A";
					numA--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 2 && num2 > twoSuitBreak) {
					deck[i] = "2";
					num2--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 3 && num3 > twoSuitBreak) {
					deck[i] = "3";
					num3--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 4 && num4 > twoSuitBreak) {
					deck[i] = "4";
					num4--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 5 && num5 > twoSuitBreak) {
					deck[i] = "5";
					num5--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 6 && num6 > twoSuitBreak) {
					deck[i] = "6";
					num6--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 7 && num7 > twoSuitBreak) {
					deck[i] = "7";
					num7--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 8 && num8 > twoSuitBreak) {
					deck[i] = "8";
					num8--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 9 && num9 > twoSuitBreak) {
					deck[i] = "9";
					num9--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 10 && numT > twoSuitBreak) {
					deck[i] = "T";
					numT--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 11 && numJ > twoSuitBreak) {
					deck[i] = "J";
					numJ--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 12 && numQ > twoSuitBreak) {
					deck[i] = "Q";
					numQ--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 13 && numK > twoSuitBreak) {
					deck[i] = "K";
					numK--;
					choiceNotMade = false;
				}	
			}	
		}
}

function deckVerifiy() {
	var numK = 8;
	var numQ = 8;
	var numJ = 8;
	var numT = 8;
	var num9 = 8;
	var num8 = 8;
	var num7 = 8;
	var num6 = 8;
	var num5 = 8;
	var num4 = 8;
	var num3 = 8;
	var num2 = 8;
	var numA = 8;

	for (var i = 0; i < 104; i++) {
		if (deck[i] == "K") {numK--;}
		else if (deck[i] == "Q") {numQ--;}
		else if (deck[i] == "J") {numJ--;}
		else if (deck[i] == "T") {numT--;}
		else if (deck[i] == "9") {num9--;}
		else if (deck[i] == "8") {num8--;}
		else if (deck[i] == "7") {num7--;}
		else if (deck[i] == "6") {num6--;}
		else if (deck[i] == "5") {num5--;}
		else if (deck[i] == "4") {num4--;}
		else if (deck[i] == "3") {num3--;}
		else if (deck[i] == "2") {num2--;}
		else if (deck[i] == "A") {numA--;}
	}

	console.log(numK + " = numK\n" + numQ + " = numQ\n" + numJ + " = numJ\n" + numT + " = numT\n" + num9 + " = num9\n" + num8 + " = num8\n" + num7 + " = num7\n" + num6 + " = num6\n" + num5 + " = num5\n" + num4 + " = num4\n" + num3 + " = num3\n" + num2 + " = num2\n" + numA + " = numA");
}

function deckPrint() {
	for (var i = 0; i < 8; i++) {
		console.log(deck[i*13] + " " + deck[i*13 + 1] + " " + deck[i*13 + 2] + " " + deck[i*13 + 3] + " " + deck[i*13 + 4] + " " + deck[i*13 + 5] + " " + deck[i*13 + 6] + " " + deck[i*13 + 7] + " " + deck[i*13 + 8] + " " + deck[i*13 + 9] + " " + deck[i*13 + 10] + " " + deck[i*13 + 11] + " " + deck[i*13 + 12]);
	}
}

function initialFlop() {
		for (var x = 0; x < 25; x++) {
			for (var y = 0; y < 10; y++) {
				board[x][y] = "-";
			}
		}
		
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 10; y++) {
				board[x][y] = ".";
			}
		}
		
		for (var i = 0; i < 4; i++) {
			board[4][i] = ".";
		}
		
		for (var i = 4; i < 10; i++) {
			board[4][i] = getCard();
		}
		
		for(var i = 0; i < 4; i++) {
			board[5][i] = getCard();
		}

		boardLoad();
}
 
function getCard() {
	deckIndex++;
	var card = deck[deckIndex];
	return card;
}

function printBoard() {
	console.log("\t\t\t\t\t\t" + board[0][0] + "   " + board[0][1] + "   " + board[0][2] + "   " + board[0][3] + "   " + board[0][4] + "   " + board[0][5] + "   " + board[0][6] + "   " + board[0][7] + "   " + board[0][8] + "   " + board[0][9] + "\t" + "|1" + "\n" + 
				"\t\t\t\t\t\t" + board[1][0] + "   " + board[1][1] + "   " + board[1][2] + "   " + board[1][3] + "   " + board[1][4] + "   " + board[1][5] + "   " + board[1][6] + "   " + board[1][7] + "   " + board[1][8] + "   " + board[1][9] + "\t" + "|2" + "\n" +
				"\t\t\t\t\t\t" + board[2][0] + "   " + board[2][1] + "   " + board[2][2] + "   " + board[2][3] + "   " + board[2][4] + "   " + board[2][5] + "   " + board[2][6] + "   " + board[2][7] + "   " + board[2][8] + "   " + board[2][9] + "\t" + "|3" + "\n" + 
				"\t\t\t\t\t\t" + board[3][0] + "   " + board[3][1] + "   " + board[3][2] + "   " + board[3][3] + "   " + board[3][4] + "   " + board[3][5] + "   " + board[3][6] + "   " + board[3][7] + "   " + board[3][8] + "   " + board[3][9] + "\t" + "|4" + "\n" + 
				"\t\t\t\t\t\t" + board[4][0] + "   " + board[4][1] + "   " + board[4][2] + "   " + board[4][3] + "   " + board[4][4] + "   " + board[4][5] + "   " + board[4][6] + "   " + board[4][7] + "   " + board[4][8] + "   " + board[4][9] + "\t" + "|5" + "\n" + 
				"\t\t\t\t\t\t" + board[5][0] + "   " + board[5][1] + "   " + board[5][2] + "   " + board[5][3] + "   " + board[5][4] + "   " + board[5][5] + "   " + board[5][6] + "   " + board[5][7] + "   " + board[5][8] + "   " + board[5][9] + "\t" + "|6" + "\n" + 
				"\t\t\t\t\t\t" + board[6][0] + "   " + board[6][1] + "   " + board[6][2] + "   " + board[6][3] + "   " + board[6][4] + "   " + board[6][5] + "   " + board[6][6] + "   " + board[6][7] + "   " + board[6][8] + "   " + board[6][9] + "\t" + "|7" + "\n" + 
				"\t\t\t\t\t\t" + board[7][0] + "   " + board[7][1] + "   " + board[7][2] + "   " + board[7][3] + "   " + board[7][4] + "   " + board[7][5] + "   " + board[7][6] + "   " + board[7][7] + "   " + board[7][8] + "   " + board[7][9] + "\t" + "|8" + "\n" + 
				"\t\t\t\t\t\t" + board[8][0] + "   " + board[8][1] + "   " + board[8][2] + "   " + board[8][3] + "   " + board[8][4] + "   " + board[8][5] + "   " + board[8][6] + "   " + board[8][7] + "   " + board[8][8] + "   " + board[8][9] + "\t" + "|9" + "\n" + 
				"\t\t\t\t\t\t" + board[9][0] + "   " + board[9][1] + "   " + board[9][2] + "   " + board[9][3] + "   " + board[9][4] + "   " + board[9][5] + "   " + board[9][6] + "   " + board[9][7] + "   " + board[9][8] + "   " + board[9][9] + "\t" + "|10" + "\n" + 
				"\t\t\t\t\t\t" + board[10][0] + "   " + board[10][1] + "   " + board[10][2] + "   " + board[10][3] + "   " + board[10][4] + "   " + board[10][5] + "   " + board[10][6] + "   " + board[10][7] + "   " + board[10][8] + "   " + board[10][9] + "\t" + "|11" + "\n" + 
				"\t\t\t\t\t\t" + board[11][0] + "   " + board[11][1] + "   " + board[11][2] + "   " + board[11][3] + "   " + board[11][4] + "   " + board[11][5] + "   " + board[11][6] + "   " + board[11][7] + "   " + board[11][8] + "   " + board[11][9] + "\t" + "|12" + "\n" + 
				"\t\t\t\t\t\t" + board[12][0] + "   " + board[12][1] + "   " + board[12][2] + "   " + board[12][3] + "   " + board[12][4] + "   " + board[12][5] + "   " + board[12][6] + "   " + board[12][7] + "   " + board[12][8] + "   " + board[12][9] + "\t" + "|13" + "\n" + 
				"\t\t\t\t\t\t" + board[13][0] + "   " + board[13][1] + "   " + board[13][2] + "   " + board[13][3] + "   " + board[13][4] + "   " + board[13][5] + "   " + board[13][6] + "   " + board[13][7] + "   " + board[13][8] + "   " + board[13][9] + "\t" + "|14" + "\n" + 
				"\t\t\t\t\t\t" + board[14][0] + "   " + board[14][1] + "   " + board[14][2] + "   " + board[14][3] + "   " + board[14][4] + "   " + board[14][5] + "   " + board[14][6] + "   " + board[14][7] + "   " + board[14][8] + "   " + board[14][9] + "\t" + "|15" + "\n" + 
				"\t\t\t\t\t\t" + board[15][0] + "   " + board[15][1] + "   " + board[15][2] + "   " + board[15][3] + "   " + board[15][4] + "   " + board[15][5] + "   " + board[15][6] + "   " + board[15][7] + "   " + board[15][8] + "   " + board[15][9] + "\t" + "|16" + "\n" + 
				"\t\t\t\t\t\t" + board[16][0] + "   " + board[16][1] + "   " + board[16][2] + "   " + board[16][3] + "   " + board[16][4] + "   " + board[16][5] + "   " + board[16][6] + "   " + board[16][7] + "   " + board[16][8] + "   " + board[16][9] + "\t" + "|17" + "\n" + 
				"\t\t\t\t\t\t" + board[17][0] + "   " + board[17][1] + "   " + board[17][2] + "   " + board[17][3] + "   " + board[17][4] + "   " + board[17][5] + "   " + board[17][6] + "   " + board[17][7] + "   " + board[17][8] + "   " + board[17][9] + "\t" + "|18" + "\n" + 
				"\t\t\t\t\t\t" + board[18][0] + "   " + board[18][1] + "   " + board[18][2] + "   " + board[18][3] + "   " + board[18][4] + "   " + board[18][5] + "   " + board[18][6] + "   " + board[18][7] + "   " + board[18][8] + "   " + board[18][9] + "\t" + "|19" + "\n" + 
				"\t\t\t\t\t\t" + board[19][0] + "   " + board[19][1] + "   " + board[19][2] + "   " + board[19][3] + "   " + board[19][4] + "   " + board[19][5] + "   " + board[19][6] + "   " + board[19][7] + "   " + board[19][8] + "   " + board[19][9] + "\t" + "|20" + "\n");
}

function cardFlop() {
	// sounds
	var error = new Audio("sounds/error.mp3");
	var pop = new Audio("sounds/pop.flac");

	if (flopValid()) {
	
		if (flopsLeft > 0) {
			for (var x = 0; x < board[0].length; x++) {
				var moveNotMade = true;
				for (var y = 0; y < board.length; y++) {
					if (moveNotMade && board[y][x] == "-") {
						moveNotMade = false;
						board[y][x] = getCard();
					}
				}
			}
			
			flopsLeft--;
			pop.play();
		}
		
		else if (flopsLeft <= 0) {
			var message = "No flops left";
			errorMessage(message);
			error.play();
		}
	
	}
	
	else {
		var message = "All columns must be filled";
		errorMessage(message);
		error.play();
	}
	boardLoad();
}

function flopValid() {
		var valid = true;
		
		for (var i = 0; i < 10; i++) {
			if (board[0][i] == "-") {
				valid = false;
			}
		}
		
		return valid;
}

function cardValidity(card1, card2) {
		var valid = false;
		
		if (card2 == "K" && card1 == "Q") {
			valid = true;
		}
		
		else if (card2 == "Q" && card1 == "J") {
			valid = true;
		}
		
		else if (card2 == "J" && card1 == "T") {
			valid = true;
		}
		
		else if (card2 == "T" && card1 == "9") {
			valid = true;
		}
		
		else if (card2 == "9" && card1 == "8") {
			valid = true;
		}
		
		else if (card2 == "8" && card1 == "7") {
			valid = true;
		}
		
		else if (card2 == "7" && card1 == "6") {
			valid = true;
		}
		
		else if (card2 == "6" && card1 == "5") {
			valid = true;
		}
		
		else if (card2 == "5" && card1 == "4") {
			valid = true;
		}
		
		else if (card2 == "4" && card1 == "3") {
			valid = true;
		}
		
		else if (card2 == "3" && card1 == "2") {
			valid = true;
		}
		
		else if (card2 == "2" && card1 == "A") {
			valid = true;
		}
		
		else if (card2 == "-" && card1 == "K" || card2 == "-" && card1 == "Q" || card2 == "-" && card1 == "J" || card2 == "-" && card1 == "T" || card2 == "-" && card1 == "9" || card2 == "-" && card1 == "8" || card2 == "-" && card1 == "7" || card2 == "-" && card1 == "6" || card2 == "-" && card1 == "5" || card2 == "-" && card1 == "4" || card2 == "-" && card1 == "3" || card2 == "-" && card1 == "2" || card2 == "-" && card1 == "A") {
			valid = true;
		}
		
		return valid;
}

function multiCardMove(Col1, multiTopIndex, Col2) {

		gameSnapshot();
		undoDeckIndexCheck = 0;

		var card1 = "";
		var card2 = "";
		var arraySize = 0;
		var moveNotMade = true;

		// Sounds
		var error = new Audio("sounds/error.mp3");
		var pop = new Audio("sounds/pop.flac");
		
		//		----------------------------------------------------------
		
		// Determine length of card move
			var endArray = true;
			for (var i = multiTopIndex; i < 25; i++) {
				if (board[i][Col1] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					arraySize++;
				}
			}
		
		// Set length of multiArray to arraySize
			var multiArray = [];
			multiArray.length = arraySize;
		
		// Load values into multiArray
			endArray = true;
			for (var i = multiTopIndex; i < 25; i++) {
				if (board[i][Col1] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					multiArray[i-multiTopIndex] = board[i][Col1]; 
				}
			}
		
		// Set card1 to equal first value in multiArray
			card1 = multiArray[0];
		
		// Find card2 where multiArray will be placed
			moveNotMade = true;
			for (var i = 1; i < 25; i++) {
				if (moveNotMade && board[i][Col2] == "-") {
					card2 = board[i-1][Col2];
					moveNotMade = false;
				}
			}
		
		//		----------------------------------------------------------
		
		// If multiArray is in sequential order proceed
			if (multiArrayUniformity(multiArray)) {
			
			//		if card1 is top of column
				if (cardValidity(card1, card2) && multiTopIndex == 0) {
					// erase group from origin
					for (var i = 0; i < multiArray.length; i++) {
						board[i][Col1] = "-";
					}
					
					// add the group to new column
					moveNotMade = true;
					for (var i = 0; i < 25; i++) {
						if (moveNotMade && board[i][Col2] == "-") {
							for (var x = 0; x < multiArray.length; x++) {
								board[i+x][Col2] = multiArray[x];
								
							}
							moveNotMade = false;
						}
					}
					pop.play();
				}
				
			// If card2 is empty column or cards are compatible
				else if (cardValidity(card1, card2)) {
					
					// add group to col2
					moveNotMade = true;
					for (var i = 0; i < 25; i++) {
						if (moveNotMade && board[i][Col2] == "-") {
							for (var x = 0; x < multiArray.length; x++) {
								board[i+x][Col2] = multiArray[x];
								
							}
							moveNotMade = false;
						}
					}
					
					// erase col1
					for (var i = multiTopIndex; i < 25; i++) {
						board[i][Col1] = "-";
					}
					
					// check if bottom card needs to be flipped
					moveNotMade = true;
					for (var i = 1; i < 25; i++) {
						if (moveNotMade && board[i][Col1] == "-") {
							if (board[i-1][Col1] == ".") {
								board[i-1][Col1] = getCard();
								undoDeckIndexCheck++;
								moveNotMade = false;
							}
						}
					}
					pop.play();
				}

				else {
					var message = "Not a valid move";
					errorMessage(message);
					error.play();
				}	
			}

			else {
				var message = "Column is not sequential";
				errorMessage(message);
				error.play();
			}
		boardLoad();
}

function multiArrayUniformity(multiArray) { 
		var uniform = false;
		var validityCounter = 0;
		var card1 = "";
		var card2 = "";  
		
		for (var i = 0; i < (multiArray.length - 1); i++) {
			card2 = multiArray[i];
			card1 = multiArray[i+1];
			if (cardValidity(card1, card2)) {
				validityCounter++;
			}
		}
		
		if (validityCounter == (multiArray.length - 1)) {
			uniform = true;
		}
		
		return uniform;
}

function suitErase(y, x) {
		var notFirstCard = true;
		// Sound
		var completed = new Audio("sounds/completed.wav");
		
		if (y == 0) {
			notFirstCard = false;
		}
		
		if (notFirstCard) {
			if (board[y-1][x] == ".") {
				board[y-1][x] = getCard();
			}
		}
		
		for (var i = 0; i < 13; i++) {
			board[y+i][x] = "-";
		}

		completed.play();
}

function winCheck() {
		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 8; y++) {
				if (board[y][x] == "K" && board[y+1][x] == "Q" && board[y+2][x] == "J" && board[y+3][x] == "T" && board[y+4][x] == "9" && board[y+5][x] == "8" && board[y+6][x] == "7" && board[y+7][x] == "6" && board[y+8][x] == "5" && board[y+9][x] == "4" && board[y+10][x] == "3" && board[y+11][x] == "2" && board[y+12][x] == "A") {
					completedSuits++;
					suitErase(y, x);
					if (completedSuits < 8) {
						var message = (8 - completedSuits) + " suits left";
						errorMessage(message);
					}
				}
			}
		}
		
		if (completedSuits == 8 && !(gameOver)) {
			// winner sounds
			var applause = new Audio("sounds/applause.wav");
			var hallelujah = new Audio("sounds/hallelujah.wav");

			gameOver = true;
			autoTimer = false;
			winAnimation();
			clearTimeout(t);
			applause.play();
			hallelujah.play();
		}
}

function findEmptyCol() {
	var col = 20;
	for (var i = 0; i < 10; i++) {
		if (board[0][i] == "-") {
			col = i;
		}
	}
	return col;
}

function winAnimation() {
	$("#container").append("<h1 id='winner'>Winner</h1>");
	$("#winner").css("background", "white");
	setTimeout(function() {
		$("#winner").fadeOut(3500, function() {
			$("#winner").remove();
		});
	}, 2500);
}

function findMove() {
	var testCard1;
	var testCard1col;
	var testCard1row;

	var testCard2;
	var testCard2col;
	var testCard2row;

	// boolean to stop propagation of function if a move has been found
	var contStartLoop = true;

	// First Check if there is an empty column and give hint there for highest available card

	if (completedSuits < 7) {
		var stopColCheck = true;
		for (var x = 0; x < 10; x++) {
			if (board[0][x] == "-" && stopColCheck) {
				contStartLoop = false;
				stopColCheck = false;
				emptyCol = x;
				emptyColCheck(emptyCol);
			}
		}
	}

	// Loop through every spot and run checker on card2
		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 25; y++) {
				if (board[y][x] == "K" || board[y][x] == "Q" || board[y][x] == "J" || board[y][x] == "T" || board[y][x] == "9" || board[y][x] == "8" || board[y][x] == "7" || board[y][x] == "6" || board[y][x] == "5" || board[y][x] == "4" || board[y][x] == "3" || board[y][x] == "2" || board[y][x] == "A") {
					testCard1 = board[y][x];
					if (contStartLoop) {
						testCard1col = x;
						testCard1row = y;
						getCard2Value(testCard1);
						if (testCard1 != "K") {
							findCard2Value();
						}
					}
				}
			}
		}


	function emptyColCheck(EmptyCol) {
		var emptyCol = EmptyCol;
		var highestCardcol;
		var highestCardrow;

		var stopLoop = true;
		for (var i = 0; i < 13; i++) {
			for (var x = 0; x < 10; x++) {
				for (var y = 1; y < 25; y++) {
					if (board[y][x] == "K" && stopLoop) {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					
					else if (board[y][x] == "Q" && stopLoop && i == 1) {
						if (board[y-1][x] == "K") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}
					
					else if (board[y][x] == "J" && stopLoop && i == 2) {
						if (board[y-1][x] == "Q") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "T" && stopLoop && i == 3) {
						if (board[y-1][x] == "J") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "9" && stopLoop && i == 4) {
						if (board[y-1][x] == "T") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "8" && stopLoop && i == 5) {
						if (board[y-1][x] == "9") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "7" && stopLoop && i == 6) {
						if (board[y-1][x] == "8") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "6" && stopLoop && i == 7) {
						if (board[y-1][x] == "7") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "5" && stopLoop && i == 8) {
						if (board[y-1][x] == "6") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "4" && stopLoop && i == 9) {
						if (board[y-1][x] == "5") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "3" && stopLoop && i == 10) {
						if (board[y-1][x] == "4") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}

					else if (board[y][x] == "2" && stopLoop && i == 11) {
						if (board[y-1][x] == "3") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}
					
					else if (board[y][x] == "A" && stopLoop && i == 12) {
						if (board[y-1][x] == "2") {}
						else {highestCardcol = x; highestCardrow = y; stopLoop = false;}
					}
					
				}
			}
		}



		var arraySize = 0;
		
		//		----------------------------------------------------------
		
		// Determine length of card move
			var endArray = true;
			for (var i = highestCardrow; i < 25; i++) {
				if (board[i][highestCardcol] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					arraySize++;
				}
			}
		
		// Set length of multiArray to arraySize
			var multiArray = [];
			var multiArray2 = [];
			multiArray.length = arraySize;
			multiArray2.length = arraySize;
		
		// Load ids into multiArray
			endArray = true;
			for (var i = highestCardrow; i < 25; i++) {
				if (board[i][highestCardcol] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					multiArray[i-highestCardrow] = "#" + i + "-" + highestCardcol;
					multiArray2[i-highestCardrow] = board[i][highestCardcol];
				}
			}

		if (multiArrayUniformity(multiArray2)) {

			// highlight the cards
				for (var i = 0; i < multiArray.length; i++) {
					var idString = multiArray[i];
					$(idString).addClass("hintHighlight");
				}

				var idString = "#" + 0 + "-" + emptyCol;
				var source = cardEncryption(".");
				// Sound
				var pop = new Audio("sounds/pop.flac");

				setTimeout(function() {
					$("img").removeClass("hintHighlight");
					$(idString).attr('src', source);
					$(idString).addClass("hintHighlight");
					pop.play();
					setTimeout(function() {
						$(idString).removeClass("hintHighlight");
						$(idString).attr('src', "");
						pop.play();
					}, 500);
				}, 500);
		}
	}

	function getCard2Value(givenCard) {

		if (givenCard == "A") {
			testCard2 = "2";
		}

		else if (givenCard == "2") {
			testCard2 = "3";
		}

		else if (givenCard == "3") {
			testCard2 = "4";
		}

		else if (givenCard == "4") {
			testCard2 = "5";
		}

		else if (givenCard == "5") {
			testCard2 = "6";
		}

		else if (givenCard == "6") {
			testCard2 = "7";
		}

		else if (givenCard == "7") {
			testCard2 = "8";
		}

		else if (givenCard == "8") {
			testCard2 = "9";
		}

		else if (givenCard == "9") {
			testCard2 = "T";
		}

		else if (givenCard == "T") {
			testCard2 = "J";
		}

		else if (givenCard == "J") {
			testCard2 = "Q";
		}

		else if (givenCard == "Q") {
			testCard2 = "K";
		}

		return testCard2;
	}

	function findCard2Value() {
		var topCard;
		var onlyOneCardTwo = true;
		for (var x = 0; x < 10; x++) {
			for (var y = 1; y < 25; y++) {

				if (board[0][x] == testCard2 && board[1][x] == "-") {
					testCard2col = x;
					testCard2row = 0;
					if (testCard1row > 0) {
						var card1Above = board[testCard1row-1][testCard1col];
						if (card1Above == testCard2) {
		
						}
						else {
							cardHighlightAnimation();
						}
					}

					else {
						cardHighlightAnimation();
					}
				}

				if (board[y][x] == "-") {
					topCard = board[y-1][x];
					if (topCard == testCard2 && onlyOneCardTwo) {
						onlyOneCardTwo = false;
						testCard2col = x;
						testCard2row = y-1;
						var numCardsMoved = getArray();

						if (numCardsMoved.length > 1) {
							if (multiArrayUniformity(numCardsMoved)) {
								numCardsAbove();
							}
						}

						else if (numCardsMoved.length == 1) {
							numCardsAbove();
						}
						
					}
				}

			}
		}
	}

	function getArray() {

		var arraySize = 0;
		
		//		----------------------------------------------------------
		
		// Determine length of card move
			var endArray = true;
			for (var i = testCard1row; i < 25; i++) {
				if (board[i][testCard1col] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					arraySize++;
				}
			}

		// Set length of multiArray to arraySize
			var multiArray = [];
			multiArray.length = arraySize;
		
		// Load values into multiArray
			endArray = true;
			for (var i = testCard1row; i < 25; i++) {
				if (board[i][testCard1col] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					multiArray[i-testCard1row] = board[i][testCard1col];
				}
			}

		return multiArray;
	}

	function numCardsAbove() {
		var numCards1 = 0;
		var numCards2 = 0;

		var endArray = true;
		testCard2 = testCard1;
		for (var y = testCard1row-1; y >= 0; y--) {
			if (board[y][testCard1col] == ".") {
				endArray = false; 
			}

			if (endArray) {
				var card1Above = board[y][testCard1col];
				var card1ShouldAbove = getCard2Value(testCard2);
				if (card1Above == card1ShouldAbove) {
					numCards1++;
				}
			}
		}

		endArray = true;
		testCard2 = getCard2Value(testCard1);
		testCard2 = getCard2Value(testCard2);
		for (var y = testCard2row-1; y >= 0; y--) {
			if (board[y][testCard2col] == ".") {
				endArray = false;
			}

			if (endArray) {
				var card2Above = board[y][testCard2col];
				var card2ShouldAbove = getCard2Value(testCard2);
				if (card2Above == card2ShouldAbove) {
					numCards2++;
				}
			}
		}

		// alert("Card 1: " + testCard1 + "\n" + "Col: " + testCard1col + "\n" + "Row: " + testCard1row + "\n\n" + "Card 2: " + testCard2 + "\n" + "Col: " + testCard2col + "\n" + "Row: " + testCard2row);
		
		if (numCards2 >= numCards1) {
			cardHighlightAnimation();
		}
	}

	function cardHighlightAnimation() {

		contStartLoop = false;

		var arraySize = 0;
		
		//		----------------------------------------------------------
		
		// Determine length of card move
			var endArray = true;
			for (var i = testCard1row; i < 25; i++) {
				if (board[i][testCard1col] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					arraySize++;
				}
			}
		
		// Set length of multiArray to arraySize
			var multiArray = [];
			multiArray.length = arraySize;
		
		// Load ids into multiArray
			endArray = true;
			for (var i = testCard1row; i < 25; i++) {
				if (board[i][testCard1col] == "-") {
					endArray = false;
				}
				
				if (endArray) {
					multiArray[i-testCard1row] = "#" + i + "-" + testCard1col; 
				}
			}

		// highlight the cards
			for (var i = 0; i < multiArray.length; i++) {
				var idString = multiArray[i];
				$(idString).addClass("hintHighlight");
			}

			var idString = "#" + (testCard2row) + "-" + testCard2col;
			// Sound
			var pop = new Audio("sounds/pop.flac");

			setTimeout(function() {
				$("img").removeClass("hintHighlight");
				$(idString).addClass("hintHighlight");
				pop.play();
				setTimeout(function() {
					$(idString).removeClass("hintHighlight");
					pop.play();
				}, 500);
			}, 500);
	}
}

function autoSolver() {
	
	Timer();
	var t;

	function Timer() {
		t = setTimeout(timer, 400);
		function timer() {
			Findmove();
			winCheck();
			boardLoad();
			if (autoTimer) {
				Timer();
			}
		}
	}

	function Findmove() {
		var testCard1;
		var testCard1col;
		var testCard1row;

		var testCard2;
		var testCard2col;
		var testCard2row;

		// boolean to stop propagation of function if a move has been found
		var contStartLoop = true;

		// First Check if there is an empty column and give hint there for highest available card
		if (flopsLeft > 0) {
			var stopColCheck = true;
			for (var x = 0; x < 10; x++) {
				if (board[0][x] == "-" && stopColCheck) {
					contStartLoop = false;
					stopColCheck = false;
					var emptyCol = x;
					emptyColCheck(emptyCol);
				}
			}
		}


		// Loop through every spot and run checker on card2
		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 25; y++) {
				if (board[y][x] == "Q" || board[y][x] == "J" || board[y][x] == "T" || board[y][x] == "9" || board[y][x] == "8" || board[y][x] == "7" || board[y][x] == "6" || board[y][x] == "5" || board[y][x] == "4" || board[y][x] == "3" || board[y][x] == "2" || board[y][x] == "A") {
					testCard1 = board[y][x];
					if (contStartLoop) {
						testCard1col = x;
						testCard1row = y;
						getCard2Value(testCard1);
						findCard2Value();
					}
				}
			}
		}

		if (contStartLoop) {
			winCheck();

			if (flopValid()) {
				winCheck();
				cardFlop();
			}

			else if (completedSuits < 8) {
				var stopColCheck = true;
				for (var x = 0; x < 10; x++) {
					if (board[0][x] == "-" && stopColCheck) {
						stopColCheck = false;
						var emptyCol = x;
						emptyColCheck(emptyCol);
					}
				}
			}
		}

		function flopPrepare() {

			while (!(flopValid())) {
				var emptyCol;
				var cardHoldingCol;

				var stopLoop = true;
				for (var x = 0; x < 10; x++) {
					if (board[0][x] == "-" && stopLoop) {
						emptyCol = x;
					}
				}

				var cardRow;
				for (var x = 0; x < 10; x++) {
					for (var y = 1; y < 25; y++) {
						if (board[y][x] == "K" || board[y][x] == "Q" || board[y][x] == "J" || board[y][x] == "T" || board[y][x] == "9" || board[y][x] == "8" || board[y][x] == "7" || board[y][x] == "6" || board[y][x] == "5" || board[y][x] == "4" || board[y][x] == "3" || board[y][x] == "2" || board[y][x] == "A") {
							cardHoldingCol = x;
							cardRow = y;
						}
					}
				}

				multiCardMove(cardHoldingCol, cardRow, emptyCol);
			}
		}

		function emptyColCheck(emptyCol) {
			var highestCardcol;
			var highestCardrow;

			var stopLoop = true;
			for (var i = 0; i < 13; i++) {
				for (var x = 0; x < 10; x++) {
					for (var y = 1; y < 25; y++) {
						if (board[y][x] == "K" && stopLoop) {highestCardcol = x; highestCardrow = y; highCardVerify();}
						
						else if (board[y][x] == "Q" && stopLoop && i == 1) {
							if (board[y-1][x] == "K") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}
						
						else if (board[y][x] == "J" && stopLoop && i == 2) {
							if (board[y-1][x] == "Q") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "T" && stopLoop && i == 3) {
							if (board[y-1][x] == "J") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "9" && stopLoop && i == 4) {
							if (board[y-1][x] == "T") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "8" && stopLoop && i == 5) {
							if (board[y-1][x] == "9") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "7" && stopLoop && i == 6) {
							if (board[y-1][x] == "8") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "6" && stopLoop && i == 7) {
							if (board[y-1][x] == "7") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "5" && stopLoop && i == 8) {
							if (board[y-1][x] == "6") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "4" && stopLoop && i == 9) {
							if (board[y-1][x] == "5") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "3" && stopLoop && i == 10) {
							if (board[y-1][x] == "4") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}

						else if (board[y][x] == "2" && stopLoop && i == 11) {
							if (board[y-1][x] == "3") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}
						
						else if (board[y][x] == "A" && stopLoop && i == 12) {
							if (board[y-1][x] == "2") {}
							else {highestCardcol = x; highestCardrow = y; highCardVerify();}
						}
						
					}
				}
			}

			if (stopLoop) {
				flopPrepare();
				winCheck();
				cardFlop();
			}

			function highCardVerify() {

				var arraySize = 0;
				
				//		----------------------------------------------------------
				
				// Determine length of card move
					var endArray = true;
					for (var i = highestCardrow; i < 25; i++) {
						if (board[i][highestCardcol] == "-") {
							endArray = false;
						}
						
						if (endArray) {
							arraySize++;
						}
					}
				
				// Set length of multiArray to arraySize
					var multiArray = [];
					var multiArray2 = [];
					multiArray.length = arraySize;
					multiArray2.length = arraySize;
				
				// Load ids into multiArray
					endArray = true;
					for (var i = highestCardrow; i < 25; i++) {
						if (board[i][highestCardcol] == "-") {
							endArray = false;
						}
						
						if (endArray) {
							multiArray[i-highestCardrow] = "#" + i + "-" + highestCardcol;
							multiArray2[i-highestCardrow] = board[i][highestCardcol];
						}
					}

				if (multiArrayUniformity(multiArray2)) {
					stopLoop = false;
					highCardLoad(multiArray);
				}

			}

			function highCardLoad(multiArray) {

				for (var i = 0; i < multiArray.length; i++) {
					var idString = multiArray[i];
					$(idString).addClass("hintHighlight");
				}

				var idString = "#" + 0 + "-" + emptyCol;
				var source = cardEncryption(".");

				setTimeout(function() {
					$("img").removeClass("hintHighlight");
					$(idString).attr('src', source);
					$(idString).addClass("hintHighlight");
					setTimeout(function() {
						$(idString).removeClass("hintHighlight");
						$(idString).attr('src', "");
						multiCardMove(highestCardcol, highestCardrow, emptyCol);
					}, 150);
				}, 150);
			}
		}

		function getCard2Value(givenCard) {

			if (givenCard == "A") {
				testCard2 = "2";
			}

			else if (givenCard == "2") {
				testCard2 = "3";
			}

			else if (givenCard == "3") {
				testCard2 = "4";
			}

			else if (givenCard == "4") {
				testCard2 = "5";
			}

			else if (givenCard == "5") {
				testCard2 = "6";
			}

			else if (givenCard == "6") {
				testCard2 = "7";
			}

			else if (givenCard == "7") {
				testCard2 = "8";
			}

			else if (givenCard == "8") {
				testCard2 = "9";
			}

			else if (givenCard == "9") {
				testCard2 = "T";
			}

			else if (givenCard == "T") {
				testCard2 = "J";
			}

			else if (givenCard == "J") {
				testCard2 = "Q";
			}

			else if (givenCard == "Q") {
				testCard2 = "K";
			}

			return testCard2;
		}

		function findCard2Value() {
			var topCard;
			var onlyOneCardTwo = true;
			for (var x = 0; x < 10; x++) {
				for (var y = 1; y < 25; y++) {

					if (board[y][x] == "-" && onlyOneCardTwo) {
						topCard = board[y-1][x];
						if (topCard == testCard2) {
							onlyOneCardTwo = false;
							testCard2col = x;
							testCard2row = y-1;
							var numCardsMoved = getArray();

							if (numCardsMoved.length > 1) {
								if (multiArrayUniformity(numCardsMoved)) {
									numCardsAbove();
								}
							}

							else if (numCardsMoved.length == 1) {
								numCardsAbove();
							}
							
						}
					}

				}
			}
		}

		function getArray() {

			var arraySize = 0;
			
			//		----------------------------------------------------------
			
			// Determine length of card move
				var endArray = true;
				for (var i = testCard1row; i < 25; i++) {
					if (board[i][testCard1col] == "-") {
						endArray = false;
					}
					
					if (endArray) {
						arraySize++;
					}
				}

			// Set length of multiArray to arraySize
				var multiArray = [];
				multiArray.length = arraySize;
			
			// Load values into multiArray
				endArray = true;
				for (var i = testCard1row; i < 25; i++) {
					if (board[i][testCard1col] == "-") {
						endArray = false;
					}
					
					if (endArray) {
						multiArray[i-testCard1row] = board[i][testCard1col];
					}
				}

			return multiArray;
		}

		function numCardsAbove() {
			var numCards1 = 0;
			var numCards2 = 0;

			var endArray = true;
			testCard2 = testCard1;
			for (var y = testCard1row-1; y >= 0; y--) {
				if (board[y][testCard1col] == ".") {
					endArray = false; 
				}

				if (endArray) {
					var card1Above = board[y][testCard1col];
					var card1ShouldAbove = getCard2Value(testCard2);
					if (card1Above == card1ShouldAbove) {
						numCards1++;
					}
				}
			}

			endArray = true;
			testCard2 = getCard2Value(testCard1);
			// testCard2 = getCard2Value(testCard2);
			for (var y = testCard2row-1; y >= 0; y--) {
				if (board[y][testCard2col] == ".") {
					endArray = false;
				}

				if (endArray) {
					var card2Above = board[y][testCard2col];
					var card2ShouldAbove = getCard2Value(testCard2);
					if (card2Above == card2ShouldAbove) {
						numCards2++;
					}
				}
			}
			
			if (numCards2 >= numCards1) {
				cardHighlightAnimation();
			}
		}

		function cardHighlightAnimation() {

			contStartLoop = false;

			var arraySize = 0;
			
			//	----------------------------------------------------------
			
			// Determine length of card move
				var endArray = true;
				for (var i = testCard1row; i < 25; i++) {
					if (board[i][testCard1col] == "-") {
						endArray = false;
					}
					
					if (endArray) {
						arraySize++;
					}
				}
			
			// Set length of multiArray to arraySize
				var multiArray = [];
				multiArray.length = arraySize;
			
			// Load ids into multiArray
				endArray = true;
				for (var i = testCard1row; i < 25; i++) {
					if (board[i][testCard1col] == "-") {
						endArray = false;
					}
					
					if (endArray) {
						multiArray[i-testCard1row] = "#" + i + "-" + testCard1col; 
					}
				}

			// highlight the cards
				for (var i = 0; i < multiArray.length; i++) {
					var idString = multiArray[i];
					$(idString).addClass("hintHighlight");
				}

				var idString = "#" + (testCard2row) + "-" + testCard2col;

				setTimeout(function() {
					$("img").removeClass("hintHighlight");
					$(idString).addClass("hintHighlight");
					setTimeout(function() {
						$(idString).removeClass("hintHighlight");
						multiCardMove(testCard1col, testCard1row, testCard2col);
					}, 150);
				}, 150);
		}
	}
}

function errorMessage(message) {
	if ($("#errorMessage").length > 0) {}

	else {
		$("#container").append("<h1 id='errorMessage'>" + message + "</h1>");
		var top = ((screen.height - 60) / 3) + "px";
		var left = ((screen.width - 550) / 2) + "px";
		$("#errorMessage").css("top", top);
		$("#errorMessage").css("left", left);
		setTimeout(function() {
			$("#errorMessage").fadeOut(1000, function() {
				$("#errorMessage").remove();
			});
		}, 500);
	}
}

function elementsSequential(elements) {
	if (elements.length > 1) {
		var sequential = true;

		for (var i = 0; i < (elements.length-1); i++) {
			if (elements[i].value < elements[i+1].value) {
				sequential = false;
			}
		}

		return sequential;
	}

	else {
		return true;
	}
}

function getElements(elmnt) {
	var elements = [];
	var column = colSubString($(elmnt).attr("id"));
	var topIndex = multiTopIndex($(elmnt).attr("id"));
	var stopLoop = false;
	for (y = topIndex; y < 25; y++) {
		if (board[y][column] != "-") {
			var idString = "#" + y + "-" + column;
			var card = cardObj(idString);
			elements.push(card);
		}
	}
	return elements;
}

function cardObj(idString) {
	var card = {
		reference: $(idString),
		value: cardDecryption($(idString).attr("src")),
		top: $(idString).css("top"),
		left: $(idString).css("left"),
		zIndex: $(idString).css("z-index")
	};
	return card;
}


// Movable img
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var finalXPosition;
  var elements = getElements(elmnt);

  if (elementsSequential(elements)) {
  	elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the elements' new positions:
    var curTop = (elmnt.offsetTop - pos2);
    var left = (elmnt.offsetLeft - pos1) + "px";
    for (var i = 0; i < elements.length; i++) {
    	var element = $(elements[i].reference);
    	var top = curTop + (i*30) + "px";
    	$(element).css("top", top);
    	$(element).css("left", left);
    	$(element).css("z-index", (30+i));
    }
    // save the final Xposition
    finalXPosition = pos3;
  }

  function getCol2(xPos) {
  	var width = screen.width;
  	if (xPos < (width*.1)) {return 0;}
  	else if (xPos < (width*.2)) {return 1;}
  	else if (xPos < (width*.3)) {return 2;}
  	else if (xPos < (width*.4)) {return 3;}
  	else if (xPos < (width*.5)) {return 4;}
  	else if (xPos < (width*.6)) {return 5;}
  	else if (xPos < (width*.7)) {return 6;}
  	else if (xPos < (width*.8)) {return 7;}
  	else if (xPos < (width*.9)) {return 8;}
  	else if (xPos > (width*.9)) {return 9;}
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    // return cards to their original spots before move
    for (var i = 0; i < elements.length; i++) {
    	var element = $(elements[i].reference);
    	$(element).css("top", elements[i].top);
    	$(element).css("left", elements[i].left);
    	$(element).css("z-index", elements[i].zIndex);
    }
    // Make the move
    var id = $(elmnt).attr("id");
    var col1 = colSubString(id);
    var topIndex = multiTopIndex(id);
    var col2 = getCol2(finalXPosition);
    multiCardMove(col1, topIndex, col2);
    winCheck();
    boardLoad();
  }
}
// End of Movable img

// TIMER
	var stopWatch = document.querySelector('time'),
		start = document.querySelector('#start'),
	    seconds = 0, minutes = 0, hours = 0,
	    t;

	function add() {
	    seconds++;
	    if (seconds >= 60) {
	        seconds = 0;
	        minutes++;
	        if (minutes >= 60) {
	            minutes = 0;
	            hours++;
	        }
	    }
	    
	    stopWatch.textContent = ((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

	    timer();
	}

	function timer() {
	    t = setTimeout(add, 1000);
	}

	/* Start button */
	start.onclick = timer;

// END OF TIMER