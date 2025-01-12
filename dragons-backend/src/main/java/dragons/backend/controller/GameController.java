package dragons.backend.controller;

import dragons.backend.external.BuyItemResponse;
import dragons.backend.external.ExternalApi;
import dragons.backend.external.GameInstanceResponse;
import dragons.backend.external.PlayerReputationResponse;
import dragons.backend.external.ProductResponse;
import dragons.backend.external.QuestResponse;
import dragons.backend.external.SolveQuestResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameController {

  private final ExternalApi api;

  private final GameState gameState = new GameState();
  
  public GameController(ExternalApi api) {
    this.api = api;
  }

  @GetMapping("/state")
  public ResponseEntity<GameState> gameState() {
    return ResponseEntity.ok(gameState);
  }
  
  @GetMapping("/start")
  public ResponseEntity<GameState> startGame() {
    GameInstanceResponse response = api.startGame();
    gameState.init(response);
    return ResponseEntity.ok(gameState);
  }
  
  @GetMapping("/reputation")
  public ResponseEntity<PlayerReputationResponse> reputation() {
    PlayerReputationResponse playerReputationResponse = api.fetchReputation(gameState.gameId());
    return ResponseEntity.ok(playerReputationResponse);
  }
  
  @GetMapping("/quests")
  public ResponseEntity<QuestResponse[]> quests() {
    QuestResponse[] quests = api.fetchQuests(gameState.gameId());
    return ResponseEntity.ok(quests);
  }
  
  @GetMapping("/products")
  public ResponseEntity<ProductResponse[]> products() {
    ProductResponse[] products = api.fetchProducts(gameState.gameId());
    return ResponseEntity.ok(products);
  }
 
  @GetMapping("/solve/{questId}")
  public ResponseEntity<GameState> solveQuest(@PathVariable String questId) {
    // TODO check if quest id is valid -> use cached quests?
    SolveQuestResponse solveQuestResponse = api.solveQuest(gameState.gameId(), questId);
    gameState.update(solveQuestResponse);
    return ResponseEntity.ok(gameState);
  }
  
  @GetMapping("/buy/{itemId}")
  public ResponseEntity<GameState> buyItem(@PathVariable String itemId) {
    BuyItemResponse buyItemResponse = api.buyItem(gameState.gameId(), itemId);
    gameState.update(buyItemResponse);
    return ResponseEntity.ok(gameState);
  }
  
}
