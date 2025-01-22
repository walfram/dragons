package dragons.backend.external;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import dragons.backend.game.responses.GameStartResponse;
import dragons.backend.game.responses.PlayerReputationResponse;
import dragons.backend.game.responses.ProductResponse;
import dragons.backend.game.responses.QuestResponse;
import java.util.Arrays;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
public class RestClientDragonsApiTest {

  private static final Logger logger = LoggerFactory.getLogger(RestClientDragonsApiTest.class);
  
  @Autowired
  ExternalApi dragonsApi;

  static String gameId;

  @Test
  @Order(1)
  void should_execute_start_game() {
    GameStartResponse gameInstance = dragonsApi.startGame();
    gameId = gameInstance.gameId();

    assertNotNull(gameId);
    assertNotNull(gameInstance);

    assertNotNull(gameInstance.gameId());

    assertEquals(3, gameInstance.lives());

    assertEquals(0, gameInstance.gold());
    assertEquals(0, gameInstance.level());
    assertEquals(0, gameInstance.score());
    assertEquals(0, gameInstance.highScore());
    assertEquals(0, gameInstance.turn());
  }

  @Test
  @Order(2)
  void should_fetch_quests() {
    assertNotNull(gameId);
    
    QuestResponse[] quests = dragonsApi.fetchQuests(gameId);

    assertNotNull(quests);

    logger.debug("### quests = {}", Arrays.asList(quests));
    
    assertTrue(quests.length > 0);
    assertEquals(10, quests.length);
  }

  @Test
  @Order(3)
  void should_fetch_shop_products() {
    assertNotNull(gameId);
    
    ProductResponse[] productListResponse = dragonsApi.fetchProducts(gameId);

    assertNotNull(productListResponse);

    assertNotEquals(0, productListResponse.length);
    assertEquals(11, productListResponse.length);
  }

  @Test
  @Order(4)
  void should_fetch_player_reputation() {
    assertNotNull(gameId);
    
    PlayerReputationResponse playerReputationResponse = dragonsApi.fetchReputation(gameId);

    assertNotNull(playerReputationResponse);
    
    assertEquals(0, playerReputationResponse.people());
    assertEquals(0, playerReputationResponse.state());
    assertEquals(0, playerReputationResponse.underworld());
  }

}
