package dragons.impl;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import dragons.core.Game;
import dragons.core.GameState;
import dragons.core.Item;
import dragons.core.Quest;

public class TestGame implements Game {

	private static final int MAX_IDLE_ROUNDS = 10;

	private final String id;
	private final AtomicInteger round = new AtomicInteger(1);

	private int lives;
	private double gold;
	private int level;
	private int score;
	private int highScore;
	private AtomicInteger idle = new AtomicInteger(0);

	public TestGame() {
		this.id = "test-game";
		this.lives = 10;
		this.gold = 100.0;
	}

	@Override
	public List<Quest> pollQuests() {
		return Collections.emptyList();
	}

	@Override
	public void solve(Quest quest) {
		// for test just increment round
		// actual impl might increment more
		round.incrementAndGet();
	}

	@Override
	public boolean canPlay() {
		return (lives > 0) && (idle.get() < MAX_IDLE_ROUNDS);
	}

	@Override
	public List<Item> pollShop() {
		return Collections.emptyList();
	}

	@Override
	public void buy(Item item) {
		round.incrementAndGet();
	}

	@Override
	public String id() {
		return id;
	}

	@Override
	public int roundNumber() {
		return round.get();
	}

	@Override
	public GameState state() {
		return new GameState(id, lives, gold, level, score, highScore, round.get());
	}

	@Override
	public void idle() {
		idle.incrementAndGet();
	}

	@Override
	public void finish() {
		// TODO Auto-generated method stub
		
	}

}
