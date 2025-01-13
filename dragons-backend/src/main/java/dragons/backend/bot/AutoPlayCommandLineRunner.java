package dragons.backend.bot;

import dragons.backend.controller.GameState;
import dragons.backend.external.ExternalApi;
import dragons.backend.external.GameInstanceResponse;
import dragons.backend.external.QuestResponse;
import dragons.backend.external.SolveQuestResponse;
import java.util.Arrays;
import java.util.Comparator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AutoPlayCommandLineRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AutoPlayCommandLineRunner.class);

  private final ExternalApi api;

  public AutoPlayCommandLineRunner(ExternalApi api) {
    this.api = api;
  }

  @Override
  public void run(String... args) throws Exception {
    logger.debug(">>> running auto-play");

    GameInstanceResponse gameInstanceResponse = api.startGame();

    GameState gameState = new GameState();
    gameState.init(gameInstanceResponse);

    boolean gameOver = false;

    while (!gameOver) {
      QuestResponse[] quests = api.fetchQuests(gameState.gameId());
      Arrays.asList(quests).forEach(quest -> logger.info("### quest: {}", quest));
      
      QuestResponse questResponse = Arrays.stream(quests)
          .min(new ProbabilitComparator().thenComparing(QuestResponse::reward, Comparator.reverseOrder()))
          .orElseThrow();
      
      logger.info(">>> picked quest: {}", questResponse);

      // TODO if low on lives, try buy health potion
      
      SolveQuestResponse solveQuestResponse = api.solveQuest(gameState.gameId(), questResponse.adId());
      logger.info("!!! solve quest: {}", solveQuestResponse);
      gameState.update(solveQuestResponse);
      
      // TODO buy item(s)
      
      gameOver = (gameState.lives() <= 0);
    }

  }
}
