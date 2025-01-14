package dragons.backend.bot;

import com.fasterxml.jackson.databind.ObjectMapper;
import dragons.backend.controller.GameState;
import dragons.backend.external.BuyItemResponse;
import dragons.backend.external.ExternalApi;
import dragons.backend.external.GameInstanceResponse;
import dragons.backend.external.PlayerReputationResponse;
import dragons.backend.external.ProductResponse;
import dragons.backend.external.QuestResponse;
import dragons.backend.external.SolveQuestResponse;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AutoPlayCommandLineRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AutoPlayCommandLineRunner.class);

  private static final String HEALTH_POTION = "hpot";

  private final ObjectMapper mapper = new ObjectMapper();
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
      // if low on lives, try buy health potion
      if (gameState.lives() < 2) {
        if (gameState.gold() > 50) {
          BuyItemResponse buyItemResponse = api.buyItem(gameState.gameId(), HEALTH_POTION);
          logger.info("@@@ buy health potion (low on lives): {}", buyItemResponse);
          gameState.update(buyItemResponse);
          continue;
        }
      }

      PlayerReputationResponse playerReputationResponse = api.fetchReputation(gameState.gameId());
      logger.info("### reputation: {}", playerReputationResponse);

      QuestResponse[] quests = api.fetchQuests(gameState.gameId());
      logger.info("{}", mapper.writeValueAsString(quests));

      QuestResponse questResponse = Arrays.stream(quests)
          .min(new ProbabilitComparator().thenComparing(QuestResponse::reward, Comparator.reverseOrder()))
          .orElseThrow();

      logger.info(">>> picked quest: {}", questResponse);

      SolveQuestResponse solveQuestResponse = api.solveQuest(gameState.gameId(), questResponse.adId());
      logger.info("{} solve quest: {}", solveQuestResponse.success() ? "===" : "!!!", solveQuestResponse);
      gameState.update(solveQuestResponse);
      
      logger.info("%%% game state: {}", mapper.writeValueAsString(gameState));

      // buy item(s)
      // TODO move fetch products outside while - fetch only once, probably create class Shop
      ProductResponse[] productResponses = api.fetchProducts(gameState.gameId());
      logger.info("~~~ products: {}", mapper.writeValueAsString(productResponses));
      
      Optional<ProductResponse> selectedProduct = Arrays.stream(productResponses)
          .filter(product -> !Objects.equals(HEALTH_POTION, product.id()))
          .filter(product -> product.cost() <= gameState.gold())
          // TODO clarify products effects, may be "random" buy is not optimal
          .findAny();

      selectedProduct.ifPresentOrElse(productResponse -> {
        BuyItemResponse buyItemResponse = api.buyItem(gameState.gameId(), productResponse.id());
        logger.info("$$$ buy product {}: {}", productResponse, buyItemResponse);
        gameState.update(buyItemResponse);
      }, () -> logger.info("$$$ cannot pick product to buy, current gold: {}", gameState.gold()));

      gameOver = (gameState.lives() <= 0);
    }

  }
}
