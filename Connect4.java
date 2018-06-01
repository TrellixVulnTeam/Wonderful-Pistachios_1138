//Personal Project
//Connect 4

package Connect4;

import java.util.Scanner;

public class Connect4 {
	
	public static String board[][] = new String[8][8];
	public static int chipCount = 0;
	public static boolean gameWon = false;
	
	public static void main(String Args[]) {
		Connect4.home();
		
		System.out.print("\n" + Connect4.printBoard());
		System.out.println("\nYOU WON!!!");
	}
	
	public static void home() {
		initBoardLoad();
		Scanner scan = new Scanner(System.in);
		
		while (gameWon == false) {
			System.out.print(printBoard());
			System.out.print("\n\nWhich column: ");
			
			int column = scan.nextInt();
			chipPlacer(column);
			
			chipCount++;
			spotSequencer();
		}
		
		scan.close();
	}
	
	public static void chipPlacer(int column) {
		column = column - 1;
		boolean oneMove = true;
		
		for (int i = 0; i < board.length; i++) {
			
			if (oneMove) {
				if (board[i][column].equals("Y") || board[i][column].equals("R")) {
					board[i-1][column] = playerTurn();
					oneMove = false;
				}
				
				else if (i == 7) {
					board[i][column] = playerTurn();
					oneMove = false;
				}
			}
		}
	}
	
	public static void initBoardLoad() {
		for (int x = 0; x < board.length; x++) {
			for (int y = 0; y < board[0].length; y++) {
				board[x][y] = "-";
			}
		}
	}
	
	public static String playerTurn() {
//		String to hold which color turn
		String color = "";
		
			if (chipCount % 2 == 0) {
				color = "Y";
			}
			
			else if (chipCount % 2 == 1) {
				color = "R";
			}
		
		return color;
	}
	
	public static void spotSequencer() {
		for (int x = 0; x < board.length; x++) {
			for (int y = 0; y < board[0].length; y++) {
				if (board[x][y].equals("R")) {
					gameWon(x, y);
				}
				
				else if (board[x][y].equals("Y")) {
					gameWon(x, y);
				}
			}
		}
	}
	
	public static void gameWon(int row, int col) {
		
		if (columnChecker(row, col)) {
			gameWon = true;
		}
		
		else if (rowChecker(row, col)) {
			gameWon = true;
		}
		
		else if (diagonalChecker(row, col)) {
			gameWon = true;
		}
		
	}
	
	public static boolean columnChecker(int row, int col) {
		boolean winner = false;
		try {
			if (board[row][col].equals("Y") && board[row][col+1].equals("Y") && board[row][col+2].equals("Y") && board[row][col+3].equals("Y") || board[row][col].equals("R") && board[row][col+1].equals("R") && board[row][col+2].equals("R") && board[row][col+3].equals("R")) {
				winner = true;
			}
		}
		catch(ArrayIndexOutOfBoundsException i) {}
		
		try {
			if (board[row][col].equals("Y") && board[row][col-1].equals("Y") && board[row][col-2].equals("Y") && board[row][col-3].equals("Y") || board[row][col].equals("R") && board[row][col-1].equals("R") && board[row][col-2].equals("R") && board[row][col-3].equals("R")) {
				winner = true;
			}
		}
		catch(ArrayIndexOutOfBoundsException i) {}
		
		return winner;
	}
	
	public static boolean rowChecker(int row, int col) {
		boolean winner = false;
		try {
			
			if (board[row][col].equals("Y") && board[row+1][col].equals("Y") && board[row+2][col].equals("Y") && board[row+3][col].equals("Y") || board[row][col].equals("R") && board[row+1][col].equals("R") && board[row+2][col].equals("R") && board[row+3][col].equals("R")) {
				winner = true;
			}
		}
		catch(ArrayIndexOutOfBoundsException i) {}
		
		try {
			if (board[row][col].equals("Y") && board[row-1][col].equals("Y") && board[row-2][col].equals("Y") && board[row-3][col].equals("Y") || board[row][col].equals("R") && board[row-1][col].equals("R") && board[row-2][col].equals("R") && board[row-3][col].equals("R")) {
				winner = true;
			}
		}
		catch(ArrayIndexOutOfBoundsException i) {}
		
		return winner;
	}
	
	public static boolean diagonalChecker(int row, int col) {
		boolean winner = false;
		try {
			if (board[row][col].equals("Y") && board[row+1][col+1].equals("Y") && board[row+2][col+2].equals("Y") && board[row+3][col+3].equals("Y") || board[row][col].equals("R") && board[row+1][col+1].equals("R") && board[row+2][col+2].equals("R") && board[row+3][col+3].equals("R")) {
				winner = true;
			}
		}	
		catch(ArrayIndexOutOfBoundsException i) {}
		
		try {
			if (board[row][col].equals("Y") && board[row+1][col-1].equals("Y") && board[row+2][col-2].equals("Y") && board[row+3][col-3].equals("Y") || board[row][col].equals("R") && board[row+1][col-1].equals("R") && board[row+2][col-2].equals("R") && board[row+3][col-3].equals("R")) {
				winner = true;
			}
		}	
		catch(ArrayIndexOutOfBoundsException i) {}
			
		try {
			if (board[row][col].equals("Y") && board[row-1][col+1].equals("Y") && board[row-2][col+2].equals("Y") && board[row-3][col+3].equals("Y") || board[row][col].equals("R") && board[row-1][col+1].equals("R") && board[row-2][col+2].equals("R") && board[row-3][col+3].equals("R")) {
				winner = true;
			}
		}	
		catch(ArrayIndexOutOfBoundsException i) {}
			
		try {
			if (board[row][col].equals("Y") && board[row-1][col-1].equals("Y") && board[row-2][col-2].equals("Y") && board[row-3][col-3].equals("Y") || board[row][col].equals("R") && board[row-1][col-1].equals("R") && board[row-2][col-2].equals("R") && board[row-3][col-3].equals("R")) {
				winner = true;
			}
		}
		catch(ArrayIndexOutOfBoundsException i) {}
		
		return winner;
	}
	
	public static String printBoard() {
		return (board[0][0] + " " + board[0][1] + " " + board[0][2] + " " + board[0][3] + " " + board[0][4] + " " + board[0][5] + " " + board[0][6] + " " + board[0][7] + "\n" + 
				board[1][0] + " " + board[1][1] + " " + board[1][2] + " " + board[1][3] + " " + board[1][4] + " " + board[1][5] + " " + board[1][6] + " " + board[1][7] + "\n" +
				board[2][0] + " " + board[2][1] + " " + board[2][2] + " " + board[2][3] + " " + board[2][4] + " " + board[2][5] + " " + board[2][6] + " " + board[2][7] + "\n" +
				board[3][0] + " " + board[3][1] + " " + board[3][2] + " " + board[3][3] + " " + board[3][4] + " " + board[3][5] + " " + board[3][6] + " " + board[3][7] + "\n" +
				board[4][0] + " " + board[4][1] + " " + board[4][2] + " " + board[4][3] + " " + board[4][4] + " " + board[4][5] + " " + board[4][6] + " " + board[4][7] + "\n" +
				board[5][0] + " " + board[5][1] + " " + board[5][2] + " " + board[5][3] + " " + board[5][4] + " " + board[5][5] + " " + board[5][6] + " " + board[5][7] + "\n" +
				board[6][0] + " " + board[6][1] + " " + board[6][2] + " " + board[6][3] + " " + board[6][4] + " " + board[6][5] + " " + board[6][6] + " " + board[6][7] + "\n" +
				board[7][0] + " " + board[7][1] + " " + board[7][2] + " " + board[7][3] + " " + board[7][4] + " " + board[7][5] + " " + board[7][6] + " " + board[7][7]);
	
	}
}
