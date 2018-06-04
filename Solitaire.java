//Personal Project:
//Console run solitaire

package Solitaire;

import java.util.Scanner;
import java.util.Random;

public class Solitaire {

	public static String table[][] = new String[25][10];
	public static String[] deck = new String[104];
	public static int deckIndex = -1;
	public static int flopsLeft = 5;
	public static int completedSuits = 0;
	public static boolean gameWon = false;
	
	public static void main(String Args[]) {
		deckLoad();
		initLoadTable();
		gameHome();
	}
	
	public static void deckLoad() {
		int numK = 8;
		int numQ = 8;
		int numJ = 8;
		int numT = 8;
		int num9 = 8;
		int num8 = 8;
		int num7 = 8;
		int num6 = 8;
		int num5 = 8;
		int num4 = 8;
		int num3 = 8;
		int num2 = 8;
		int numA = 8;
		
		Random gen = new Random();
		
		for (int i = 0; i < deck.length; i++) {
			boolean choiceNotMade = true;
			while (choiceNotMade) {
				int ranNum = gen.nextInt(13) + 1;
				
				if (ranNum == 1 && numA > 0) {
					deck[i] = "A";
					numA--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 2 && num2 > 0) {
					deck[i] = "2";
					num2--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 3 && num3 > 0) {
					deck[i] = "3";
					num3--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 4 && num4 > 0) {
					deck[i] = "4";
					num4--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 5 && num5 > 0) {
					deck[i] = "5";
					num5--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 6 && num6 > 0) {
					deck[i] = "6";
					num6--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 7 && num7 > 0) {
					deck[i] = "7";
					num7--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 8 && num8 > 0) {
					deck[i] = "8";
					num8--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 9 && num9 > 0) {
					deck[i] = "9";
					num9--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 10 && numT > 0) {
					deck[i] = "T";
					numT--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 11 && numJ > 0) {
					deck[i] = "J";
					numJ--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 12 && numQ > 0) {
					deck[i] = "Q";
					numQ--;
					choiceNotMade = false;
				}
				
				else if (ranNum == 13 && numK > 0) {
					deck[i] = "K";
					numK--;
					choiceNotMade = false;
				}
				
			}
			
		}
		
		
	}

	public static void deckCheck() {
		int numK = 0;
		int numQ = 0;
		int numJ = 0;
		int numT = 0;
		int num9 = 0;
		int num8 = 0;
		int num7 = 0;
		int num6 = 0;
		int num5 = 0;
		int num4 = 0;
		int num3 = 0;
		int num2 = 0;
		int numA = 0;
				
		for (int i = 0; i < deck.length; i++) {
			
				if (deck[i].equals("A")) {
					numA++;
				}
				
				else if (deck[i].equals("2")) {
					num2++;
				}
				
				else if (deck[i].equals("3")) {
					num3++;
				}
				
				else if (deck[i].equals("4")) {
					num4++;
				}
				
				else if (deck[i].equals("5")) {
					num5++;
				}
				
				else if (deck[i].equals("6")) {
					num6++;
				}
				
				else if (deck[i].equals("7")) {
					num7++;
				}
				
				else if (deck[i].equals("8")) {
					num8++;
				}
				
				else if (deck[i].equals("9")) {
					num9++;
				}
				
				else if (deck[i].equals("T")) {
					numT++;
				}
				
				else if (deck[i].equals("J")) {
					numJ++;
				}
				
				else if (deck[i].equals("Q")) {
					numQ++;
				}
				
				else if (deck[i].equals("K")) {
					numK++;
				}
			
		}
		
		if (numA == 8 && num2 == 8 && num3 == 8 && num4 == 8 && num5 == 8 && num6 == 8 && num7 == 8 && num8 == 8 && num9 == 8 && numT == 8 && numJ == 8 && numQ == 8 && numK == 8) {
			System.out.println("Deck is all good.");
		}
		
		else {
			System.out.println("Deck not valid.");
			System.out.println("Aces: " + numA);
			System.out.println("Twos: " + num2);
			System.out.println("Threes: " + num3);
			System.out.println("Fours: " + num4);
			System.out.println("Fives: " + num5);
			System.out.println("Sixes: " + num6);
			System.out.println("Sevens: " + num7);
			System.out.println("Eights: " + num8);
			System.out.println("Nines: " + num9);
			System.out.println("Tens: " + numT);
			System.out.println("Jacks: " + numJ);
			System.out.println("Queens: " + numQ);
			System.out.println("Kings: " + numK);
		}
	}
	
	public static void initLoadTable() {
		for (int x = 0; x < table.length; x++) {
			for (int y = 0; y < table[0].length; y++) {
				table[x][y] = "-";
			}
		}
		
		for (int x = 0; x < 4; x++) {
			for (int y = 0; y < table[0].length; y++) {
				table[x][y] = ".";
			}
		}
		
		for (int i = 0; i < 4; i++) {
			table[4][i] = ".";
		}
		
		for (int i = 4; i < table[0].length; i++) {
			table[4][i] = getCard();
		}
		
		for(int i = 0; i < 4; i++) {
			table[5][i] = getCard();
		}
		
		System.out.print(printTable());
	}
	
	public static String getCard() {
		deckIndex++;
		return deck[deckIndex];
	}
	
//	--------------------------------------
	
	public static void gameHome() {
		Scanner scan = new Scanner(System.in);
		int col1 = 0;
		int col2 = 0;
		int multiTopIndex = 0;
		
		while (!(gameWon)) {
			System.out.print("1 = single 2 = multi 3 = flop: ");
			int move = scan.nextInt();
			
			if (move == 1) {
				try {
					System.out.print("Move from: ");
					col1 = scan.nextInt();
					System.out.print("To: ");
					col2 = scan.nextInt();
					singleCardMove(col1, col2);
				}
				catch (Exception e) {
					System.out.print("Invalid input.");
				}
			}
			
			else if (move == 2) {
				try {
					System.out.print("Column: ");
					col1 = scan.nextInt();
					System.out.print("Top index: ");
					multiTopIndex = scan.nextInt();
					System.out.print("To: ");
					col2 = scan.nextInt();
					multiCardMove(col1, multiTopIndex, col2);
				}
				catch (Exception e) {
					System.out.print("Invalid input.\n");
				}
			}
			
			else if (move == 3) {
				cardFlop();
			}
			
			winCheck();
			
		}
		
		System.out.print("\n\n\t\t\t\t\tWINNER!!!!!!!!!");
		
		scan.close();
	}
	
	public static void cardFlop() {
		if (flopValid()) {
		
			if (flopsLeft > 0) {
				for (int x = 0; x < table[0].length; x++) {
					boolean moveNotMade = true;
					for (int y = 0; y < table.length; y++) {
						if (moveNotMade && table[y][x].equals("-")) {
							moveNotMade = false;
							table[y][x] = getCard();
						}
					}
				}
				
				flopsLeft--;
				
				System.out.print(printTable());
			}
			
			else if (flopsLeft <= 0) {
				System.out.print("No flops left.\n");
			}
		
		}
		
		else {
			System.out.print("To flop, each column must have at least one card.\n");
		}
	}
	
	public static boolean flopValid() {
		boolean valid = true;
		
		for (int i = 0; i < 10; i++) {
			if (table[0][i].equals("-")) {
				valid = false;
			}
		}
		
		return valid;
	}
	
	public static void singleCardMove(int col1, int col2) {
//		Index on display is higher reduce to usable value
		col1--;
		col2--;
		
//		create cards to use to check for validity of move
		String card1 = "";
		String card2 = "";
		
//		to make sure that first item in column is not incorrectly deleted
		boolean card1NotI1 = true;
		
		
	//		find lowest card in column1 save as card1
			boolean moveNotMade = true;
			for (int i = 0; i < 25; i++) {
				if (moveNotMade && table[i][col1].equals("-")) {
					card1 = table[i-1][col1];
					moveNotMade = false;
					if (i > 1) {
						card1NotI1 = false;
					}
				}
			}
			
			
	//		find lowest card in column2 and save as card2
			moveNotMade = true;
			for (int i = 0; i < 25; i++) {
				if (moveNotMade && table[0][col2].equals("-")) {
					card2 = "-";
					moveNotMade = false;
				}
				
				if (moveNotMade && table[i][col2].equals("-")) {
					card2 = table[i-1][col2];
					moveNotMade = false;
				}
			}
			
	//		----------------------------------------------------------
			
	//		if card1 is top of column
			if (card1 == table[0][col1] && card1NotI1) {
				table[0][col1] = "-";
				
				moveNotMade = true;
				for (int i = 0; i < 25; i++) {
					if (moveNotMade && table[i][col2].equals("-")) {
						table[i][col2] = card1;
						moveNotMade = false;
					}
				}
				
				System.out.print(printTable());
			}
			
			
	//		if cards are a valid move run process
			else if (cardValidity(card1, card2)) {
				
	//			save card1 replace as "-" and if there is a dot above card1 get a new card for dot spot
				moveNotMade = true;
				for (int i = 0; i < 25; i++) {
					if (moveNotMade && table[i][col1].equals("-")) {
						card1 = table[i-1][col1];
						table[i-1][col1] = "-";
						moveNotMade = false;
						
						if (table[i-2][col1].equals(".")) {
							table[i-2][col1] = getCard();
						}
					}
				}
				
	//		    find furthest spot down and make it equal card1
				moveNotMade = true;
				for (int i = 0; i < 25; i++) {
					if (moveNotMade && table[i][col2].equals("-")) {
						table[i][col2] = card1;
						moveNotMade = false;
					}
				}
				
				System.out.print(printTable());
			}
			
			else {
				System.out.print("Not a valid move.\n");
			}
			
		}
	
	public static void multiCardMove(int col1, int multiTopIndex, int col2) {
		col1--;
		multiTopIndex--;
		col2--;
		String card1 = "";
		String card2 = "";
		int arraySize = 0;
		boolean moveNotMade = true;
		
//		----------------------------------------------------------
		
		boolean endArray = true;
		for (int i = multiTopIndex; i < 25; i++) {
			if (table[i][col1].equals("-")) {
				endArray = false;
			}
			
			if (endArray) {
				arraySize++;
			}
		}
		
		String[] multiArray = new String[arraySize];
		
		endArray = true;
		for (int i = multiTopIndex; i < 25; i++) {
			if (table[i][col1].equals("-")) {
				endArray = false;
			}
			
			if (endArray) {
				multiArray[i-multiTopIndex] = table[i][col1]; 
			}
		}
		
		card1 = multiArray[0];
		
		moveNotMade = true;
		for (int i = 0; i < 25; i++) {
			if (moveNotMade && table[0][col2].equals("-")) {
				card2 = "-";
				moveNotMade = false;
			}
			
			if (moveNotMade && table[i][col2].equals("-")) {
				card2 = table[i-1][col2];
				moveNotMade = false;
			}
		}
		
//		----------------------------------------------------------
		
		if (multiArrayUniformity(multiArray)) {
		
	//		if card1 is top of column
			if (card1 == table[0][col1] && multiTopIndex == 0) {
				for (int i = 0; i < multiArray.length; i++) {
					table[i][col1] = "-";
				}
			
				moveNotMade = true;
				for (int i = 0; i < 25; i++) {
					if (moveNotMade && table[i][col2].equals("-")) {
						for (int x = 0; x < multiArray.length; x++) {
							table[i+x][col2] = multiArray[x];
							
						}
						moveNotMade = false;
					}
				}
			
					
				System.out.print(printTable());
			}
			
			else if (cardValidity(card1, card2)) {
				
				moveNotMade = true;
				for (int i = 0; i < 25; i++) {
					if (moveNotMade && table[i][col2].equals("-")) {
						for (int x = 0; x < multiArray.length; x++) {
							table[i+x][col2] = multiArray[x];
							
						}
						moveNotMade = false;
					}
				}
				
				endArray = true;
				for (int i = multiTopIndex; i < 25; i++) {
					if (table[i][col1].equals("-")) {
						endArray = false;
					}
					
					if (endArray) {
						table[i][col1] = "-"; 
					}
				}
				
				moveNotMade = true;
				for (int i = 0; i < 25; i++) {
					if (moveNotMade && table[i][col1].equals("-")) {
						if (table[i-1][col1].equals(".")) {
							table[i-1][col1] = getCard();
							moveNotMade = false;
						}
					}
				}
				
				System.out.print(printTable());
			}
			
			else {
				System.out.print("Not a valid move.\n");
				System.out.print("Card 2: " + card2 + " Card 1: " + card1 + "\n");
			}
			
		}
		
		else {
			System.out.print("The column is not sequential.\n");
		}
		
	}

	public static boolean multiArrayUniformity(String[] multiArray) { 
		boolean uniform = false;
		int validityCounter = 0;
		String card1 = "";
		String card2 = "";  
		
		for (int i = 0; i < (multiArray.length - 1); i++) {
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
	
	public static boolean cardValidity(String card1, String card2) {
		boolean valid = false;
		
		if (card2.equals("K") && card1.equals("Q")) {
			valid = true;
		}
		
		else if (card2.equals("Q") && card1.equals("J")) {
			valid = true;
		}
		
		else if (card2.equals("J") && card1.equals("T")) {
			valid = true;
		}
		
		else if (card2.equals("T") && card1.equals("9")) {
			valid = true;
		}
		
		else if (card2.equals("9") && card1.equals("8")) {
			valid = true;
		}
		
		else if (card2.equals("8") && card1.equals("7")) {
			valid = true;
		}
		
		else if (card2.equals("7") && card1.equals("6")) {
			valid = true;
		}
		
		else if (card2.equals("6") && card1.equals("5")) {
			valid = true;
		}
		
		else if (card2.equals("5") && card1.equals("4")) {
			valid = true;
		}
		
		else if (card2.equals("4") && card1.equals("3")) {
			valid = true;
		}
		
		else if (card2.equals("3") && card1.equals("2")) {
			valid = true;
		}
		
		else if (card2.equals("2") && card1.equals("A")) {
			valid = true;
		}
		
		else if (card2.equals("-") && card1.equals("K") || card2.equals("-") && card1.equals("Q") || card2.equals("-") && card1.equals("J") || card2.equals("-") && card1.equals("T") || card2.equals("-") && card1.equals("9") || card2.equals("-") && card1.equals("8") || card2.equals("-") && card1.equals("7") || card2.equals("-") && card1.equals("6") || card2.equals("-") && card1.equals("5") || card2.equals("-") && card1.equals("4") || card2.equals("-") && card1.equals("3") || card2.equals("-") && card1.equals("2") || card2.equals("-") && card1.equals("A")) {
			valid = true;
		}
		
		return valid;
	}
	
	public static void winCheck() {
		for (int x = 0; x < 10; x++) {
			for (int y = 0; y < 13; y++) {
				if (table[y][x].equals("K") && table[y+1][x].equals("Q") && table[y+2][x].equals("J") && table[y+3][x].equals("T") && table[y+4][x].equals("9") && table[y+5][x].equals("8") && table[y+6][x].equals("7") && table[y+7][x].equals("6") && table[y+8][x].equals("5") && table[y+9][x].equals("4") && table[y+10][x].equals("3") && table[y+11][x].equals("2") && table[y+12][x].equals("A")) {
					completedSuits++;
					suitErase(y, x);
				}
			}
		}
		
		if (completedSuits == 8) {
			gameWon = true;
			System.out.print(printTable());
		}
	}
	
	public static void suitErase(int y, int x) {
		boolean notFirstCard = true;
		
		if (y == 0) {
			notFirstCard = false;
		}
		
		if (notFirstCard) {
			if (table[y-1][x].equals(".")) {
				table[y-1][x] = getCard();
			}
		}
		
		for (int i = 0; i < 13; i++) {
			table[y+i][x] = "-";
		}
		
		System.out.print(printTable());
	}
	
//	------------------------------------
	
	//	--------------------------------------
	
	public static String printTable() {
		return ("\t\t\t\t\t\t" + table[0][0] + "   " + table[0][1] + "   " + table[0][2] + "   " + table[0][3] + "   " + table[0][4] + "   " + table[0][5] + "   " + table[0][6] + "   " + table[0][7] + "   " + table[0][8] + "   " + table[0][9] + "\t" + "|1" + "\t Flops Left" + "\n" + 
				"\t\t\t\t\t\t" + table[1][0] + "   " + table[1][1] + "   " + table[1][2] + "   " + table[1][3] + "   " + table[1][4] + "   " + table[1][5] + "   " + table[1][6] + "   " + table[1][7] + "   " + table[1][8] + "   " + table[1][9] + "\t" + "|2" + "\t     " + flopsLeft + "\n" +
				"\t\t\t\t\t\t" + table[2][0] + "   " + table[2][1] + "   " + table[2][2] + "   " + table[2][3] + "   " + table[2][4] + "   " + table[2][5] + "   " + table[2][6] + "   " + table[2][7] + "   " + table[2][8] + "   " + table[2][9] + "\t" + "|3" + "\n" + 
				"\t\t\t\t\t\t" + table[3][0] + "   " + table[3][1] + "   " + table[3][2] + "   " + table[3][3] + "   " + table[3][4] + "   " + table[3][5] + "   " + table[3][6] + "   " + table[3][7] + "   " + table[3][8] + "   " + table[3][9] + "\t" + "|4" + "\n" + 
				"\t\t\t\t\t\t" + table[4][0] + "   " + table[4][1] + "   " + table[4][2] + "   " + table[4][3] + "   " + table[4][4] + "   " + table[4][5] + "   " + table[4][6] + "   " + table[4][7] + "   " + table[4][8] + "   " + table[4][9] + "\t" + "|5" + "\n" + 
				"\t\t\t\t\t\t" + table[5][0] + "   " + table[5][1] + "   " + table[5][2] + "   " + table[5][3] + "   " + table[5][4] + "   " + table[5][5] + "   " + table[5][6] + "   " + table[5][7] + "   " + table[5][8] + "   " + table[5][9] + "\t" + "|6" + "    Completed Suits:" + "\n" + 
				"\t\t\t\t\t\t" + table[6][0] + "   " + table[6][1] + "   " + table[6][2] + "   " + table[6][3] + "   " + table[6][4] + "   " + table[6][5] + "   " + table[6][6] + "   " + table[6][7] + "   " + table[6][8] + "   " + table[6][9] + "\t" + "|7" + "\t     " + completedSuits + "\n" + 
				"\t\t\t\t\t\t" + table[7][0] + "   " + table[7][1] + "   " + table[7][2] + "   " + table[7][3] + "   " + table[7][4] + "   " + table[7][5] + "   " + table[7][6] + "   " + table[7][7] + "   " + table[7][8] + "   " + table[7][9] + "\t" + "|8" + "\n" + 
				"\t\t\t\t\t\t" + table[8][0] + "   " + table[8][1] + "   " + table[8][2] + "   " + table[8][3] + "   " + table[8][4] + "   " + table[8][5] + "   " + table[8][6] + "   " + table[8][7] + "   " + table[8][8] + "   " + table[8][9] + "\t" + "|9" + "\n" + 
				"\t\t\t\t\t\t" + table[9][0] + "   " + table[9][1] + "   " + table[9][2] + "   " + table[9][3] + "   " + table[9][4] + "   " + table[9][5] + "   " + table[9][6] + "   " + table[9][7] + "   " + table[9][8] + "   " + table[9][9] + "\t" + "|10" + "\n" + 
				"\t\t\t\t\t\t" + table[10][0] + "   " + table[10][1] + "   " + table[10][2] + "   " + table[10][3] + "   " + table[10][4] + "   " + table[10][5] + "   " + table[10][6] + "   " + table[10][7] + "   " + table[10][8] + "   " + table[10][9] + "\t" + "|11" + "\n" + 
				"\t\t\t\t\t\t" + table[11][0] + "   " + table[11][1] + "   " + table[11][2] + "   " + table[11][3] + "   " + table[11][4] + "   " + table[11][5] + "   " + table[11][6] + "   " + table[11][7] + "   " + table[11][8] + "   " + table[11][9] + "\t" + "|12" + "\n" + 
				"\t\t\t\t\t\t" + table[12][0] + "   " + table[12][1] + "   " + table[12][2] + "   " + table[12][3] + "   " + table[12][4] + "   " + table[12][5] + "   " + table[12][6] + "   " + table[12][7] + "   " + table[12][8] + "   " + table[12][9] + "\t" + "|13" + "\n" + 
				"\t\t\t\t\t\t" + table[13][0] + "   " + table[13][1] + "   " + table[13][2] + "   " + table[13][3] + "   " + table[13][4] + "   " + table[13][5] + "   " + table[13][6] + "   " + table[13][7] + "   " + table[13][8] + "   " + table[13][9] + "\t" + "|14" + "\n" + 
				"\t\t\t\t\t\t" + table[14][0] + "   " + table[14][1] + "   " + table[14][2] + "   " + table[14][3] + "   " + table[14][4] + "   " + table[14][5] + "   " + table[14][6] + "   " + table[14][7] + "   " + table[14][8] + "   " + table[14][9] + "\t" + "|15" + "\n" + 
				"\t\t\t\t\t\t" + table[15][0] + "   " + table[15][1] + "   " + table[15][2] + "   " + table[15][3] + "   " + table[15][4] + "   " + table[15][5] + "   " + table[15][6] + "   " + table[15][7] + "   " + table[15][8] + "   " + table[15][9] + "\t" + "|16" + "\n" + 
				"\t\t\t\t\t\t" + table[16][0] + "   " + table[16][1] + "   " + table[16][2] + "   " + table[16][3] + "   " + table[16][4] + "   " + table[16][5] + "   " + table[16][6] + "   " + table[16][7] + "   " + table[16][8] + "   " + table[16][9] + "\t" + "|17" + "\n" + 
				"\t\t\t\t\t\t" + table[17][0] + "   " + table[17][1] + "   " + table[17][2] + "   " + table[17][3] + "   " + table[17][4] + "   " + table[17][5] + "   " + table[17][6] + "   " + table[17][7] + "   " + table[17][8] + "   " + table[17][9] + "\t" + "|18" + "\n" + 
				"\t\t\t\t\t\t" + table[18][0] + "   " + table[18][1] + "   " + table[18][2] + "   " + table[18][3] + "   " + table[18][4] + "   " + table[18][5] + "   " + table[18][6] + "   " + table[18][7] + "   " + table[18][8] + "   " + table[18][9] + "\t" + "|19" + "\n" + 
				"\t\t\t\t\t\t" + table[19][0] + "   " + table[19][1] + "   " + table[19][2] + "   " + table[19][3] + "   " + table[19][4] + "   " + table[19][5] + "   " + table[19][6] + "   " + table[19][7] + "   " + table[19][8] + "   " + table[19][9] + "\t" + "|20" + "\n" +
				"\t\t\t\t\t\t" + table[20][0] + "   " + table[20][1] + "   " + table[20][2] + "   " + table[20][3] + "   " + table[20][4] + "   " + table[20][5] + "   " + table[20][6] + "   " + table[20][7] + "   " + table[20][8] + "   " + table[20][9] + "\t" + "|21" + "\n" + 
				"\t\t\t\t\t\t" + table[21][0] + "   " + table[21][1] + "   " + table[21][2] + "   " + table[21][3] + "   " + table[21][4] + "   " + table[21][5] + "   " + table[21][6] + "   " + table[21][7] + "   " + table[21][8] + "   " + table[21][9] + "\t" + "|22" + "\n" + 
				"\t\t\t\t\t\t" + table[22][0] + "   " + table[22][1] + "   " + table[22][2] + "   " + table[22][3] + "   " + table[22][4] + "   " + table[22][5] + "   " + table[22][6] + "   " + table[22][7] + "   " + table[22][8] + "   " + table[22][9] + "\t" + "|23" + "\n" + 
				"\t\t\t\t\t\t" + table[23][0] + "   " + table[23][1] + "   " + table[23][2] + "   " + table[23][3] + "   " + table[23][4] + "   " + table[23][5] + "   " + table[23][6] + "   " + table[23][7] + "   " + table[23][8] + "   " + table[23][9] + "\t" + "|24" + "\n" + 
				"\t\t\t\t\t\t" + table[24][0] + "   " + table[24][1] + "   " + table[24][2] + "   " + table[24][3] + "   " + table[24][4] + "   " + table[24][5] + "   " + table[24][6] + "   " + table[24][7] + "   " + table[24][8] + "   " + table[24][9] + "\t" + "|25" + "\n" +
				"\t\t\t\t\t\t" + "______________________________________" + "\n" +
				"\t\t\t\t\t\t" + 1 + "   " + 2 + "   " + 3 + "   " + 4 + "   " + 5 + "   " + 6 + "   " + 7 + "   " + 8 + "   " + 9 + "   " + 10 + "\n\n\n");
	}
}
