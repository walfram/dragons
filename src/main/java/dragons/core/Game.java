package dragons.core;

import java.util.List;

public interface Game {

	boolean canPlay();
	
	List<Quest> pollQuests();

	void solve(Quest quest);

	List<Item> pollShop();

	void buy(Item item);
	
	String id();

	int roundNumber();

	GameState state();

	void idle();

	void finish();

}
