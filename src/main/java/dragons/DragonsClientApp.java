package dragons;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dragons.core.Game;
import dragons.core.Item;
import dragons.core.Quest;
import dragons.rest.RestGame;

public class DragonsClientApp {

	private static final Logger logger = LoggerFactory.getLogger(DragonsClientApp.class);

	//
	public static void main(String[] args) {
		if (args.length == 0) {
			logger.warn("must pass server prefix, for example: http://localohost:8080/ (-Dexec.args=\"http://localhost:8080/\")");
			System.exit(-1);
		}

		logger.debug("executing, args = {}", Arrays.asList(args));

		Game game = new RestGame(args[0]);
		
		logger.debug("created game context, id = {}", game.id());
		logger.debug("initial state = {}", game.state());

		while (game.canPlay()) {
			logger.debug("executing turn = {}", game.roundNumber());
			logger.debug("current state = {}", game.state());
			
			List<Quest> quests = game.pollQuests();
			logger.debug("available quests = {}", quests.size());
			
			Optional<Quest> optional = quests.stream().sorted((l, r) -> Double.compare(r.reward(), l.reward())).findFirst();

			if (optional.isPresent()) {
				logger.debug("choosing quest = {}", optional.get());
				
				List<Item> items = game.pollShop();
				logger.debug("available items = {}", items.size());
				
				// probably first should buy, then choose quest as buying advances round
				Optional<Item> o = items.stream().filter(item -> {
					return item.price() <= game.state().gold();
				}).findFirst();
				
				if (o.isPresent()) {
					logger.debug("buying = {}", o.get().name());
					game.buy(o.get());
				} else {
					logger.debug("cannot buy anything, current cash = {}", game.state().gold());
				}
				
				game.solve(optional.get());
			} else {
				logger.debug("no quest at this round");
				game.idle();
			}
			
			if (game.state().score() >= 1000) {
				logger.debug("score 1000 achieved, exiting");
				break;
			}
		}
		
		game.finish();
		logger.debug("finished");

	}

}
