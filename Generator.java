/* Personal Project
 * Creates a sudoku board:
 * 
 * prompts the user for desired difficulty
 * 
 * auto loads all the values in the array to 0
 * 
 * moves forward through each spot on the board
 * 
 * creates a used array of 27 values of every value
 * used in the column, row, and square corresponding to
 * the location on the board
 * 
 * randomly chooses a value that is not already used
 * and loads it into that spot into the array
 * 
 * does this process until the board is filled
 * 
 * the process is not always successful due to the random choices
 * so the process is run over and over until a function verifies
 * that there are no zeroes
 * 
 * once a valid board with the constraints is created it is 
 * sent to the hole generator
 * 
 * then the board is saved to another board 
 * 
 * after this it is sent to the solver to ensure that there is only one solution
 * 
 * if there is not one solution the entire process is run again
 * 
 * finally a solvable board of chosen difficulty is printed out*/

package sudoku;
import java.util.Random;
import java.util.Scanner;

public class Generator {
	
	public static int[][] board = new int[9][9];
	public static int[][] savedBoard = new int[9][9];
	public static int[] used = new int[27];
	public static int difficulty = 25;
	
	public static void main(String[] args) {
//		Prompts the user for difficulty
		Generator.difficulty();
//		Runs the sudoku generator
		Generator.run ();
//		Generates holes
		Generator.holeGen();
//		Saves board before it is sent to the solver
		Generator.saveBoard();
//		Begins solver process
		Solver.solverHome();
//		If all constraints and tests are met a board is printed out
		Generator.convertSavedBoard();

	}

//	Prompts the user for desired difficulty
	public static void difficulty() {
		Scanner scan = new Scanner(System.in);
		
		String difficultyChoice;
		
			System.out.print("Enter your desired difficulty (easy, medium, or hard): ");
			difficultyChoice = scan.nextLine();
			
			if (difficultyChoice.equals("easy")) {
				difficulty = 25;
			}
			
			else if (difficultyChoice.equals("medium")) {
				difficulty = 40;
			}
			
			else if (difficultyChoice.equals("hard")) {
				difficulty = 55;
			}
		
		scan.close();
	}
	
//	--------------------------------------------------------
	
//	Runs the board generator
	public static void run() {
		int runAgain = 1;
		while (runAgain == 1) {

//			Set the board to 0's
			for (int i = 0; i < board.length; i++) {
				for (int x = 0; x < board[0].length; x++) {
					board[i][x] = 0;
				}
			}
			
//			Create Sudoku
			curSpot();
//		Check if zero anywhere
			
//			Set run again to false
			runAgain = 0;
			for (int i = 0; i < 9; i++) {
				for (int x = 0; x < 9; x++) {
						if (board[i][x] == 0) {
//							if zero exists run again
							runAgain = 1;
						}
				}
			}
		}
	}
	
//	Keeps track of current spot on board
	public static void curSpot() {
		
//		Run process on each individual array spot
		for (int i = 0; i < board.length; i++) {
			for (int x = 0; x < board[0].length; x++) {
				genUsed(x, i);
			}
		}
	}
	
//	generates a used array based on the spot on the board
	public static void genUsed(int row, int col) {
		
//		Load row values
		for (int i = 0; i < 9; i++) {
			used[i] = board[row][i];
		}
		
//		Load col values
		for (int i = 9; i < 18; i++) {
			used[i] = board[(i-9)][col];
		}
		
//		----------- Load square values ------------
		
//		Square1
		if (row <= 2 && col <= 2) {
			used[18] = board[0][0];
			used[19] = board[0][1];
			used[20] = board[0][2];
			used[21] = board[1][0];
			used[22] = board[1][1];
			used[23] = board[1][2];
			used[24] = board[2][0];
			used[25] = board[2][1];
			used[26] = board[2][2];
		}
		
//		Square2
		else if (row <= 2 && col <= 5) {
			used[18] = board[0][3];
			used[19] = board[0][4];
			used[20] = board[0][5];
			used[21] = board[1][3];
			used[22] = board[1][4];
			used[23] = board[1][5];
			used[24] = board[2][3];
			used[25] = board[2][4];
			used[26] = board[2][5];
		}
		
//		Square3
		else if (row <= 2 && col <= 8) {
			used[18] = board[0][6];
			used[19] = board[0][7];
			used[20] = board[0][8];
			used[21] = board[1][6];
			used[22] = board[1][7];
			used[23] = board[1][8];
			used[24] = board[2][6];
			used[25] = board[2][7];
			used[26] = board[2][8];
		}
		
//		Square4
		else if (row <= 5 && col <= 2) {
			used[18] = board[3][0];
			used[19] = board[3][1];
			used[20] = board[3][2];
			used[21] = board[4][0];
			used[22] = board[4][1];
			used[23] = board[4][2];
			used[24] = board[5][0];
			used[25] = board[5][1];
			used[26] = board[5][2];
		}
		
//		Square5
		else if (row <= 5 && col <= 5) {
			used[18] = board[3][3];
			used[19] = board[3][4];
			used[20] = board[3][5];
			used[21] = board[4][3];
			used[22] = board[4][4];
			used[23] = board[4][5];
			used[24] = board[5][3];
			used[25] = board[5][4];
			used[26] = board[5][5];
		}
		
//		Square6
		else if (row <= 5 && col <= 8) {
			used[18] = board[3][6];
			used[19] = board[3][7];
			used[20] = board[3][8];
			used[21] = board[4][6];
			used[22] = board[4][7];
			used[23] = board[4][8];
			used[24] = board[5][6];
			used[25] = board[5][7];
			used[26] = board[5][8];
		}
		
//		Square7
		else if (row <= 8 && col <= 2) {
			used[18] = board[6][0];
			used[19] = board[6][1];
			used[20] = board[6][2];
			used[21] = board[7][0];
			used[22] = board[7][1];
			used[23] = board[7][2];
			used[24] = board[8][0];
			used[25] = board[8][1];
			used[26] = board[8][2];
		}
		
//		Square8
		else if (row <= 8 && col <= 5) {
			used[18] = board[6][3];
			used[19] = board[6][4];
			used[20] = board[6][5];
			used[21] = board[7][3];
			used[22] = board[7][4];
			used[23] = board[7][5];
			used[24] = board[8][3];
			used[25] = board[8][4];
			used[26] = board[8][5];
		}
		
//		Square9
		else if (row <= 8 && col <= 8) {
			used[18] = board[6][6];
			used[19] = board[6][7];
			used[20] = board[6][8];
			used[21] = board[7][6];
			used[22] = board[7][7];
			used[23] = board[7][8];
			used[24] = board[8][6];
			used[25] = board[8][7];
			used[26] = board[8][8];
		}
		
		avaVal(row, col, used);
	}
	
//	finds and randomly chooses a value that has not already been used
	public static void avaVal(int row, int col, int[] used) {
		
//		Assemble booleans for value types
		boolean one = true;
		boolean two = true;
		boolean three = true;
		boolean four = true;
		boolean five = true;
		boolean six = true;
		boolean seven = true;
		boolean eight = true;
		boolean nine = true;
		
//		Loop through array to find available values
		for (int i = 0; i < 27; i++) {
			if (used[i] == 1) {
				one = false;
			}
			
			if (used[i] == 2) {
				two = false;
			}
			
			if (used[i] == 3) {
				three = false;
			}
			
			if (used[i] == 4) {
				four = false;
			}
			
			if (used[i] == 5) {
				five = false;
			}
			
			if (used[i] == 6) {
				six = false;
			}
			
			if (used[i] == 7) {
				seven = false;
			}
			
			if (used[i] == 8) {
				eight = false;
			}
			
			if (used[i] == 9) {
				nine = false;
			}
		}
		
//		Choose random option
		Random gen = new Random();
		while (one || two || three || four || five || six || seven || eight || nine) {
//			Generate random number
			int z = gen.nextInt(9) + 1;
			
			if (one && z == 1) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 1);
			}
			
			else if (two && z == 2) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 2);
			}
			
			else if (three && z == 3) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 3);
			}
			
			else if (four && z == 4) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 4);
			}
			
			else if (five && z == 5) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 5);
			}
			
			else if (six && z == 6) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 6);
			}
			
			else if (seven && z == 7) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 7);
			}
			
			else if (eight && z == 8) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 8);
			}
			
			else if (nine && z == 9) {
//				satisfy while loop exit
				one = false;
				two = false;
				three = false;
				four = false;
				five = false;
				six = false;
				seven = false;
				eight = false;
				nine = false;
//				send to spotLoad
				spotLoad(row, col, 9);
			}

		}
		
	}
	
//	Loads spot with given value
	public static void spotLoad(int row, int col, int avaVal) {
//		Load value
		board[row][col] = avaVal;
	}
		
//	Generates a number of random holes in the board depending on difficulty chosen
	public static void holeGen() {
		Random gen = new Random();
		
		for (int x = 1; x <= 55; x++) {
			int a = gen.nextInt(9);
			int b = gen.nextInt(9);
			
			board[a][b] = 0;
		}
	}
	
//	Saves board after hole generation
	public static void saveBoard() {
		for (int i = 0; i < board.length; i++) {
			for (int x = 0; x < board[0].length; x++) {
				savedBoard[i][x] = board[i][x];
			}
		}
	}
		
//	returns board for solver to access
	public static int[][] getBoard() {
		return board;
	}
	
//	-------------------------------------------------------
	
//	Reruns entire process if solver finds more than one solution
	public static void reRun() {

		Generator.run ();
		
		Generator.holeGen();
		
		Solver.solverHome();

	}
	
	
//	converts saved board to main board and then prints
	public static void convertSavedBoard() {
		for (int i = 0; i < 9; i++) {
			for (int x = 0; x < 9; x++) {
				board[i][x] = savedBoard[i][x];
			}
		}
		
		System.out.print(Generator.printBoard());
	}

//	-------------------------------------------------------
	
//	prints board
	public static String printBoard() {
		return (board[0][0] + " " + board[0][1] + " " + board[0][2] + " " + board[0][3] + " " + board[0][4] + " " + board[0][5] + " " + board[0][6] + " " + board[0][7] + " " + board[0][8] + "\n" + 
				board[1][0] + " " + board[1][1] + " " + board[1][2] + " " + board[1][3] + " " + board[1][4] + " " + board[1][5] + " " + board[1][6] + " " + board[1][7] + " " + board[1][8] + "\n" +
				board[2][0] + " " + board[2][1] + " " + board[2][2] + " " + board[2][3] + " " + board[2][4] + " " + board[2][5] + " " + board[2][6] + " " + board[2][7] + " " + board[2][8] + "\n" +
				board[3][0] + " " + board[3][1] + " " + board[3][2] + " " + board[3][3] + " " + board[3][4] + " " + board[3][5] + " " + board[3][6] + " " + board[3][7] + " " + board[3][8] + "\n" +
				board[4][0] + " " + board[4][1] + " " + board[4][2] + " " + board[4][3] + " " + board[4][4] + " " + board[4][5] + " " + board[4][6] + " " + board[4][7] + " " + board[4][8] + "\n" +
				board[5][0] + " " + board[5][1] + " " + board[5][2] + " " + board[5][3] + " " + board[5][4] + " " + board[5][5] + " " + board[5][6] + " " + board[5][7] + " " + board[5][8] + "\n" +
				board[6][0] + " " + board[6][1] + " " + board[6][2] + " " + board[6][3] + " " + board[6][4] + " " + board[6][5] + " " + board[6][6] + " " + board[6][7] + " " + board[6][8] + "\n" +
				board[7][0] + " " + board[7][1] + " " + board[7][2] + " " + board[7][3] + " " + board[7][4] + " " + board[7][5] + " " + board[7][6] + " " + board[7][7] + " " + board[7][8] + "\n" +
				board[8][0] + " " + board[8][1] + " " + board[8][2] + " " + board[8][3] + " " + board[8][4] + " " + board[8][5] + " " + board[8][6] + " " + board[8][7] + " " + board[8][8]);
	}
}
