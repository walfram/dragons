package dragons.core;

public class GameState {

	private final String gameId;
	private final int lives;
	private final double gold;
	private final int level;
	private final int score;
	private final int highScore;
	private final int round;

	public GameState(String id, int lives, double gold, int level, int score, int highScore, int round) {
		this.gameId = id;
		this.lives = lives;
		this.gold = gold;
		this.level = level;
		this.score = score;
		this.highScore = highScore;
		this.round = round;
	}

	@Override
	public String toString() {
		return String.format("game id = %s, round = %s, lives = %s, gold = %s, level = %s, score = %s, highScore = %s", gameId, round, lives, gold,
				level, score, highScore);
	}

	public String gameId() {
		return gameId;
	}

	public int lives() {
		return lives;
	}

	public double gold() {
		return gold;
	}

	public int level() {
		return level;
	}

	public int score() {
		return score;
	}

	public int highScore() {
		return highScore;
	}

	public int round() {
		return round;
	}

}
