package dragons;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.Test;

import dragons.core.Game;
import dragons.core.Item;
import dragons.core.Quest;
import dragons.impl.TestGame;

public class GamePlayTest {

	private static final Logger logger = LoggerFactory.getLogger(GamePlayTest.class);
	
	@Test
	public void test_gameplay() {
		Game game = new TestGame();
		logger.debug("created game context, id = {}", game.id());
		logger.debug("initial state = {}", game.state());

		while (game.canPlay()) {
			logger.debug("executing turn = {}", game.roundNumber());
			logger.debug("current state = {}", game.state());
			
			List<Quest> quests = game.pollQuests();
			logger.debug("available quests = {}", quests.size());
			
			List<Item> items = game.pollShop();
			logger.debug("available items = {}", items.size());

			Optional<Quest> optional = quests.stream().sorted((l, r) -> Double.compare(r.reward(), l.reward())).findFirst();

			if (optional.isPresent()) {
				logger.debug("trying to solve quest = {}", optional.get());
				game.solve(optional.get());
			} else {
				logger.debug("no quest at this round");
				game.idle();
			}
		}
		
		logger.debug("finished");
	}

}
