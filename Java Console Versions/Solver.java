/* Solver: 
 * 
 * finds a zero on board
 * 
 * generates used array containing values from
 * the row, column, and square relating to the 
 * spot of the zero
 * 
 * once used array is created a function checks if there
 * is a single value that is not used, if there is that spot
 * then becomes that value
 * 
 * process is repeated until all zeroes are gone or
 * runtimes limit is met
 * 
 * if runtimes limit is met this indicates that the board
 * does not have only one solution and the generator 
 * process begins again
 * 
 * if zeroes are all gone then the board has one solution*/

package sudoku;

	public class Solver {

		public static int[][] board = Generator.getBoard();
		public static int[] used = new int[27];
		public static int[] avaVal = new int [9];
	
//		---------------------------------------------------
		
		public static void solverHome() {
			solvSpot();
		}
		
		public static void solvSpot() {
			int solvCount = 0;
			int zeroLeft = 1;
			while (zeroLeft > 0 && solvCount <= 1000) {
				solvCount++;
				zeroLeft = 0;
				for (int i = 0; i < board.length; i++) {
					for (int x = 0; x < board[0].length; x++) {
						if (board[i][x] == 0) {
						solvUsed(i, x);
						zeroLeft++;
						}
					}
				}
				if (solvCount == 1000) {
					Generator.reRun();
				}
			}
		}
		
		public static void solvUsed(int row, int col) {
			
//			Load row values
			for (int i = 0; i < 9; i++) {
				used[i] = board[row][i];
			}
			
//			Load col values
			for (int i = 9; i < 18; i++) {
				used[i] = board[(i-9)][col];
			}
			
//			----------- Load square values ------------
			
//			Square1
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
			
//			Square2
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
			
//			Square3
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
			
//			Square4
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
			
//			Square5
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
			
//			Square6
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
			
//			Square7
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
			
//			Square8
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
			
//			Square9
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
			
			solvVal(row, col);
		}
		
		public static void solvVal(int row, int col) {
//			Assemble ints to see how many values present
			int one = 0;
			int two = 0;
			int three = 0;
			int four = 0;
			int five = 0;
			int six = 0;
			int seven = 0;
			int eight = 0;
			int nine = 0;
			
//			Loop through array to find available values not used
			for (int i = 0; i < 27; i++) {
				if (used[i] == 1) {
					one++;
				}
				
				if (used[i] == 2) {
					two++;
				}
				
				if (used[i] == 3) {
					three++;
				}
				
				if (used[i] == 4) {
					four++;
				}
				
				if (used[i] == 5) {
					five++;
				}
				
				if (used[i] == 6) {
					six++;
				}
				
				if (used[i] == 7) {
					seven++;
				}
				
				if (used[i] == 8) {
					eight++;
				}
				
				if (used[i] == 9) {
					nine++;
				}
			}
			
			int zeroCounter = 0;
			
			if (one == 0) {
				zeroCounter++;
			}
			
			if (two == 0) {
				zeroCounter++;
			}
			
			if (three == 0) {
				zeroCounter++;
			}
			
			if (four == 0) {
				zeroCounter++;
			}
			
			if (five == 0) {
				zeroCounter++;
			}
			
			if (six == 0) {
				zeroCounter++;
			}
			
			if (seven == 0) {
				zeroCounter++;
			}
			
			if (eight == 0) {
				zeroCounter++;
			}
			
			if (nine == 0) {
				zeroCounter++;
			}
			
			if (zeroCounter == 1) {
				if (one == 0) {
					solvLoad(row, col, 1);
				}
				
				if (two == 0) {
					solvLoad(row, col, 2);
				}
				
				if (three == 0) {
					solvLoad(row, col, 3);
				}
				
				if (four == 0) {
					solvLoad(row, col, 4);
				}
				
				if (five == 0) {
					solvLoad(row, col, 5);
				}
				
				if (six == 0) {
					solvLoad(row, col, 6);
				}
				
				if (seven == 0) {
					solvLoad(row, col, 7);
				}
				
				if (eight == 0) {
					solvLoad(row, col, 8);
				}
				
				if (nine == 0) {
					solvLoad(row, col, 9);
				}
			}
			
			
			
		}
		
		public static void solvLoad(int row, int col, int val) {
			board[row][col] = val;
		}
	}
