// VARS
	var mainBoard = [
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ]
	];

	var holeBoard = [
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ]
	];

	var solvBoard = [
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ],
			[ , , , , , , , , ]
	];
	var difficulty = 0;
	var errors = 0;
// END VARS



// EVENT HANDLERS
	$("td").on("keyup", "input", function(event) {
		var userAnswer = $(this).val();
		var row = $(this).parent().attr('id').charAt(0);
		var col = $(this).parent().attr('id').charAt(1);
		if (userAnswer == mainBoard[row][col]) {
			holeBoard[row][col] = mainBoard[row][col];
			$(this).css("border", "1px solid black");
			$(this).parent().addClass("numberFinder");
			setTimeout(function() {$("td").removeClass("numberFinder")},500);
			$(this).parent().text(userAnswer);
		}

		else {
			$(this).addClass("wrongAns");
			errors++;
		}
		if (event.which === 8) {
			$(this).removeClass("wrongAns");
		}

		winCheck();
		completedCheck(row, col);
	});

	$("td").on("click", function() {
		var val = $(this).text();
		if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5 || val == 6 || val == 7 || val == 8 || val == 9) {
			$(this).addClass("numberFinder")
			$("td").each(function() {
				if ($(this).text() == val) {
					$(this).addClass("numberFinder")
				}
			})
		}
		setTimeout(function() {$("td").removeClass("numberFinder")},1500)
	})

	$("button").click(function() {
		errors = 0;
		$("#results").remove();
		$("#resTopBlock").remove();
		$("button").removeClass("selectedButton");
		$("#holesLeft").addClass("selectedButton");
		$("#timer").addClass("selectedButton");
		$("td").removeClass("winner");
		$("td").fadeOut(100, function(){

		});
		$("td").fadeIn(1000, function(){});

		if ($(this).text() === "Easy") {
			$(this).addClass("selectedButton");
			difficulty = 25;
			createBoard();
			resetInputs();
			boardPageLoad();
		}

		if ($(this).text() === "Medium") {
			$(this).addClass("selectedButton");
			difficulty = 40;
			createBoard();
			resetInputs();
			boardPageLoad();
		}

		if ($(this).text() === "Hard") {
			$(this).addClass("selectedButton");
			difficulty = 55;
			createBoard();
			resetInputs();
			boardPageLoad();
		}
		winCheck();
	});

	$("#holesLeft").mouseenter(function() {
		$("#holesLeft").text("Hint?");
		$("#holesLeft").css("width", "50px");
		$("#holesLeft").css("margin-left", "45px");
	});

	$("#holesLeft").mouseleave(function(){
		winCheck();
		$("#holesLeft").css("width","30px");
		$("#holesLeft").css("margin-left", "54px");
	});

	$("#holesLeft").click(function() {
		if (winCheck == true) {}
		else {hint()}
	});
// END OF EVENT HANDLERS



// BOARD GENERATOR

	function createBoard() {
		boardIterator();
		holeGenerator();
		solve();
	}

	function boardIterator() {
		clearBoards();
		var validity = false;
		while (validity === false) {
			clearBoards();
			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					genUsed(x, y);
				}
			}
			

			validity = true;

			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					if (mainBoard[x][y] === ".") {
						validity = false;
					}
				}
			}
		}
	}

	function genUsed(row, col) {

		var used = [];

		for (var x = 0; x < 9; x++) {
			if (mainBoard[row][x] === ".") {
				
			}
			else {
				used.push(mainBoard[row][x]);
			}
		}

		for (var x = 0; x < 9; x++) {
			if (mainBoard[x][col] === ".") {

			}
			else {
				used.push(mainBoard[x][col]);
			}
		}

		function squareCheck(rowLim, colLim) {
			for (var x = (rowLim-3); x < rowLim; x++) {
				for (var y = (colLim-3); y < colLim; y++) {
					if (mainBoard[x][y] === ".") {

					}
					else {
						used.push(mainBoard[x][y]);
					}
				}
			}
		}

		if (row < 3 && col < 3) {squareCheck(3,3);}

		else if (row < 3 && col < 6) {squareCheck(3,6);}

		else if (row < 3 && col < 9) {squareCheck(3,9);}

		else if (row < 6 && col < 3) {squareCheck(6,3);}

		else if (row < 6 && col < 6) {squareCheck(6,6);}

		else if (row < 6 && col < 9) {squareCheck(6,9);}

		else if (row < 9 && col < 3) {squareCheck(9,3);}

		else if (row < 9 && col < 6) {squareCheck(9,6);}

		else if (row < 9 && col < 9) {squareCheck(9,9);}

		spotLoad(row, col, used);
	}

	function spotLoad(row, col, used) {
		var possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		for (var x = 0; x < used.length; x++) {
			for (var y = 0; y < possibilities.length; y++) {
				if (used[x] === possibilities[y]) {
	  				possibilities.splice(y, 1);
				}
			}
		}

		var ranChoice = Math.floor(Math.random() * possibilities.length);

		if (possibilities.length === 0) {
			mainBoard[row][col] = ".";
		}

		else {
		mainBoard[row][col] = possibilities[ranChoice];
		}
	}
// END OF BOARD GENERATOR


 
// SOLVER

	function solve() {
		holeSolvTran();
		solvIterator();
		if (boardEquality()) {
			console.log("Solver successful.");
		}
		else {
			console.log("boards not equal.");
			createBoard();
		}
	}

	function solvIterator() {
		var validity = false;
		solvCount = 0;
		while (validity === false && solvCount < 1000) {
			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					if (solvBoard[x][y] === ".") {
						solvUsed(x, y);
					}
				}
			}
			

			validity = true;

			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					if (solvBoard[x][y] === ".") {
						validity = false;
					}
				}
			}
			solvCount++;
		}
	}

	function solvUsed(row, col) {

		var used = [];

		for (var x = 0; x < 9; x++) {
			if (solvBoard[row] [x] === ".") {
				 
			}
			else {
				used.push(solvBoard[row][x]);
			}
		}

		for (var x = 0; x < 9; x++) {
			if (solvBoard[x][col] === ".") {

			}
			else {
				used.push(solvBoard[x][col]);
			}
		}

		function squareCheck(rowLim, colLim) {
			for (var x = (rowLim-3); x < rowLim; x++) {
				for (var y = (colLim-3); y < colLim; y++) {
					if (solvBoard[x][y] === ".") {

					}
					else {
						used.push(solvBoard[x][y]);
					}
				}
			}
		}

		if (row < 3 && col < 3) {squareCheck(3,3);}

		else if (row < 3 && col < 6) {squareCheck(3,6);}

		else if (row < 3 && col < 9) {squareCheck(3,9);}

		else if (row < 6 && col < 3) {squareCheck(6,3);}

		else if (row < 6 && col < 6) {squareCheck(6,6);}

		else if (row < 6 && col < 9) {squareCheck(6,9);}

		else if (row < 9 && col < 3) {squareCheck(9,3);}

		else if (row < 9 && col < 6) {squareCheck(9,6);}

		else if (row < 9 && col < 9) {squareCheck(9,9);}

		solvLoad(row, col, used);
	}

	function solvLoad(row, col, used) {
		var possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		for (var x = 0; x < used.length; x++) {
			for (var y = 0; y < possibilities.length; y++) {
				if (used[x] === possibilities[y]) {
	  				possibilities.splice(y, 1);
				}
			}
		}

		var ranChoice = Math.floor(Math.random() * possibilities.length);

		if (possibilities.length === 1) {
			solvBoard[row][col] = possibilities[ranChoice];
		}
	}
// END OF SOLVER



// AUXILIARY FUNCTIONS
	function clearBoards() {
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				mainBoard[x][y] = ".";
				holeBoard[x][y] = ".";
				solvBoard[x][y] = ".";
			}
		}
	}

	function mainHoleTran() {
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				holeBoard[x][y] = mainBoard[x][y];
			}
		}
	}

	function holeGenerator() {
		mainHoleTran();
		for (var i = 1; i <= difficulty; i++) {
			var x = Math.floor(Math.random() * 9);
			var y = Math.floor(Math.random() * 9);

			holeBoard[x][y] = ".";
		}
	}

	function holeSolvTran() {
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				solvBoard[x][y] = holeBoard[x][y];
			}
		}
	}

	function boardEquality() {
		var equality = 0;
		var validity;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				if (mainBoard[x][y] === solvBoard[x][y]) {
					equality++;
				}
			}
		}
		if (equality === 81) {
			validity = true;
		}
		else {
			validity = false;
		}
		return validity;
	}

	function boardPageLoad() {
		$("td").each(function() {
			var row = $(this).attr('id').charAt(0);
			var col = $(this).attr('id').charAt(1);

			if (holeBoard[row][col] === ".") {

			}

			else {
				$(this).text(holeBoard[row][col]);
			}
		})
	}

	function printMain() {
		console.log("Main")
		for (var x = 0; x < 9; x++) {
			console.log(mainBoard[x][0] + " " + mainBoard[x][1] + " " + mainBoard[x][2] + " " + mainBoard[x][3] + " " + mainBoard[x][4] + " " + mainBoard[x][5] + " " + mainBoard[x][6] + " " + mainBoard[x][7] + " " + mainBoard[x][8]);
		}
	}

	function printHole() {
		console.log("Hole")
		for (var x = 0; x < 9; x++) {
			console.log(holeBoard[x][0] + " " + holeBoard[x][1] + " " + holeBoard[x][2] + " " + holeBoard[x][3] + " " + holeBoard[x][4] + " " + holeBoard[x][5] + " " + holeBoard[x][6] + " " + holeBoard[x][7] + " " + holeBoard[x][8]);
		}
	}

	function printSolv() {
		console.log("Solv")
		for (var x = 0; x < 9; x++) {
			console.log(solvBoard[x][0] + " " + solvBoard[x][1] + " " + solvBoard[x][2] + " " + solvBoard[x][3] + " " + solvBoard[x][4] + " " + solvBoard[x][5] + " " + solvBoard[x][6] + " " + solvBoard[x][7] + " " + solvBoard[x][8]);
		}
	}

	function hintVals(row, col) {
		var used = [];

		for (var x = 0; x < 9; x++) {
			if (holeBoard[row] [x] === ".") {
				 
			}
			else {
				used.push(holeBoard[row][x]);
			}
		}

		for (var x = 0; x < 9; x++) {
			if (holeBoard[x][col] === ".") {

			}
			else {
				used.push(holeBoard[x][col]);
			}
		}

		function squareCheck(rowLim, colLim) {
			for (var x = (rowLim-3); x < rowLim; x++) {
				for (var y = (colLim-3); y < colLim; y++) {
					if (holeBoard[x][y] === ".") {

					}
					else {
						used.push(holeBoard[x][y]);
					}
				}
			}
		}

		if (row < 3 && col < 3) {squareCheck(3,3);}

		else if (row < 3 && col < 6) {squareCheck(3,6);}

		else if (row < 3 && col < 9) {squareCheck(3,9);}

		else if (row < 6 && col < 3) {squareCheck(6,3);}

		else if (row < 6 && col < 6) {squareCheck(6,6);}

		else if (row < 6 && col < 9) {squareCheck(6,9);}

		else if (row < 9 && col < 3) {squareCheck(9,3);}

		else if (row < 9 && col < 6) {squareCheck(9,6);}

		else if (row < 9 && col < 9) {squareCheck(9,9);}

		var possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		for (var x = 0; x < used.length; x++) {
			for (var y = 0; y < possibilities.length; y++) {
				if (used[x] === possibilities[y]) {
	  				possibilities.splice(y, 1);
				}
			}
		}

		return possibilities;
	}

	function hint() {
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				if (holeBoard[x][y] == ".") {
					var vals = hintVals(x, y);
					var idString = "#" + x + y;
					$(idString).css("height", "62px");
					$(idString).text("");
					$(idString).append("<div class='hint'></div><div class='hint'></div><div class='hint'></div><div class='hint'></div><div class='hint'></div><div class='hint'></div><div class='hint'></div><div class='hint'></div><div class='hint'></div>");
					var div1 = $(idString).children()[0];
					var div2 = $(idString).children()[1];
					var div3 = $(idString).children()[2];
					var div4 = $(idString).children()[3];
					var div5 = $(idString).children()[4];
					var div6 = $(idString).children()[5];
					var div7 = $(idString).children()[6];
					var div8 = $(idString).children()[7];
					var div9 = $(idString).children()[8];
					for (var i = 0; i < vals.length; i++) {
						if (vals[i] == 1){div1.textContent = "1";}
						if (vals[i] == 2){div2.textContent = "2";}
						if (vals[i] == 3){div3.textContent = "3";}
						if (vals[i] == 4){div4.textContent = "4";}
						if (vals[i] == 5){div5.textContent = "5";}
						if (vals[i] == 6){div6.textContent = "6";}
						if (vals[i] == 7){div7.textContent = "7";}
						if (vals[i] == 8){div8.textContent = "8";}
						if (vals[i] == 9){div9.textContent = "9";}
					}
				}
			}
		}

		function clearHint() {
			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					if (holeBoard[x][y] == ".") {
						for (var x = 0; x < 9; x++) {
							for (var y = 0; y < 9; y++) {
								if (holeBoard[x][y] == ".") {
									var vals = hintVals(x, y);
									var idString = "#" + x + y;
									$(idString).css("height", "60.5px");
									$(idString).text("");
									$(idString).append("<input type='text' maxlength='1'></input>");
								}
							}
						}
					}
				}
			}
		}

		setTimeout(clearHint, 1500);
	}

	function completedCheck(row, col) {
		// ROW CHECK
		var validCounter = 0;
		for (var y = 0; y < 9; y++) {
			var idString = "#" + row + y;
			var z = $(idString).text();
			if (z==1||z==2||z==3||z==4||z==5||z==6||z==7||z==8||z==9) {
				validCounter++;
			}
		}
		if (validCounter == 9) {
			for (var y = 0; y < 9; y++) {
				var idString = "#" + row + y;
				$(idString).addClass("winner");
			}
			setTimeout(function() {$("td").removeClass("winner")},1000);
		}

		// COL CHECK
		validCounter = 0;
		for (var x = 0; x < 9; x++) {
			var idString = "#" + x + col;
			var z = $(idString).text();
			if (z==1||z==2||z==3||z==4||z==5||z==6||z==7||z==8||z==9) {
				validCounter++;
			}
		}
		if (validCounter == 9) {
			for (var x = 0; x < 9; x++) {
				var idString = "#" + x + col;
				$(idString).addClass("winner");
			}
			setTimeout(function() {$("td").removeClass("winner")},1000);
		}

		function squareCheck(rowLim, colLim) {
			validCounter = 0;
			for (var x = (rowLim-3); x < rowLim; x++) {
				for (var y = (colLim-3); y < colLim; y++) {
					var idString = "#" + x + y;
					var z = $(idString).text()
					if (z==1||z==2||z==3||z==4||z==5||z==6||z==7||z==8||z==9) {
						validCounter++;
					}
				}
			}
			if (validCounter == 9) {
				for (var x = (rowLim-3); x < rowLim; x++) {
					for (var y = (colLim-3); y < colLim; y++) {
						var idString = "#" + x + y;
						$(idString).addClass("winner");
					}
				}
				setTimeout(function() {$("td").removeClass("winner")},1000);
			}
		}

		if (row < 3 && col < 3) {squareCheck(3,3);}

		else if (row < 3 && col < 6) {squareCheck(3,6);}

		else if (row < 3 && col < 9) {squareCheck(3,9);}

		else if (row < 6 && col < 3) {squareCheck(6,3);}

		else if (row < 6 && col < 6) {squareCheck(6,6);}

		else if (row < 6 && col < 9) {squareCheck(6,9);}

		else if (row < 9 && col < 3) {squareCheck(9,3);}

		else if (row < 9 && col < 6) {squareCheck(9,6);}

		else if (row < 9 && col < 9) {squareCheck(9,9);}
	}

	function winCheck() {
		var isInt = 0;
		var validity;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				var val = holeBoard[x][y];
				if (holeBoard[x][y] == ".") {

				}
				else if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5 || val == 6 || val == 7 || val == 8 || val == 9){
					isInt++;
				}
			}
		}

		$("#holesLeft").text((81-isInt));

		if (isInt === 81) {
			validity = true;
		}
		else {
			validity = false;
		}
		
		if (validity === true) {
			winAnimation();
			clearTimeout(t);
		}

		return validity;
	}

	function winAnimation() {
		$("td").addClass("winner");
		var valid = true;
		$("td").fadeOut(1000, function() {
			if (valid === true) {
				results();
			}
			valid = false;
		});
	}

	function results() {
		$("#results").remove();
		$("table").before("<div id='results'></div>");
		$("#results").append("<div id='resTextDiv'></div>");
		var time = $("time").text();
		$("#resTextDiv").append("<h1 class='resultsText'>Time: " + time + "</h1>");
		var Difficulty = 0;
		if (difficulty === 25) {Difficulty = "Easy"}
		else if (difficulty === 40) {Difficulty = "Medium"}
		else if (difficulty === 55) {Difficulty = "Hard"}
		$("#resTextDiv").append("<h1 class='resultsText'>Difficulty: " + Difficulty + "</h1>");
		$("#resTextDiv").append("<h1 class='resultsText'>Errors: " + errors + "</h1>");
	}

	function resetInputs() {
		$("td").text("");
		$("td").append("<input type='text' maxlength='1'></input>");
	}
// END OF AUXILIARY FUNCTIONS



// TIMER
	var stopWatch = document.querySelector('time'),
		start = document.getElementsByTagName('button')[0],
		start2 = document.getElementsByTagName('button')[1],
		start3 = document.getElementsByTagName('button')[2],
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
	start2.onclick = timer;
	start3.onclick = timer;

	/* Stop button */
	// Inside of wincheck

	/* Clear button == easy medium and hard */
	$("button").click(function() {
		clearTimeout(t);
	    stopWatch.textContent = "00:00";
	    seconds = 0; minutes = 0; hours = 0;
	});
// END OF TIMER
