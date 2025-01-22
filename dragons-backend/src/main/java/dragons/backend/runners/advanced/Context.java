package dragons.backend.runners.advanced;

import dragons.backend.external.ExternalApi;
import dragons.backend.game.BuyItemResponse;
import dragons.backend.game.GameStartResponse;
import dragons.backend.game.PlayerReputationResponse;
import dragons.backend.game.ProductResponse;
import dragons.backend.game.SolveQuestResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class Context {

  private static final String HEALTH_POTION_ID = "hpot";

  private final ExternalApi api;

  private String gameId;

  private int lives;
  private int gold;
  private int level;
  private int score;
  private int highScore;
  private int turn;

  private List<ProductResponse> products;
  private int idling = 24;
  
  private PlayerReputationResponse reputation;

  public Context(ExternalApi api) {
    this.api = api;
  }

  public ExternalApi api() {
    return api;
  }

  public void update(GameStartResponse response) {
    this.gameId = response.gameId();
    this.lives = response.lives();
    this.gold = response.gold();
    this.level = response.level();
    this.score = response.score();
    this.highScore = response.highScore();
    this.turn = response.turn();
  }

  public String gameId() {
    return gameId;
  }

  public int turn() {
    return turn;
  }

  public void update(SolveQuestResponse response) {
    this.gold = response.gold();
    this.score = response.score();
    this.highScore = response.highScore();
    this.turn = response.turn();
    this.lives = response.lives();
  }

  public void update(BuyItemResponse response) {
    this.gold = response.gold();
    this.turn = response.turn();
    this.lives = response.lives();
    this.level = response.level();
  }

  public void update(PlayerReputationResponse response) {
    this.reputation = response;
    this.turn += 1;
  }

  public boolean isGameOver() {
    return lives <= 0;
  }

  @Override
  public String toString() {
    return "Game[id=%s,lives=%s,gold=%s,level=%s,score=%s,turn=%s]".formatted(gameId, lives, gold, level, score, turn);
  }

  public boolean healthPotionNeeded() {
    return lives == 1;
  }

  public boolean canByHealthPotion() {
    return gold >= 50;
  }

  public void bindProducts(ProductResponse[] products) {
    this.products = Arrays.stream(products).filter(p -> !Objects.equals(HEALTH_POTION_ID, p.id())).toList();
  }

  public List<ProductResponse> affordableProducts() {
    return products.stream().filter(p -> p.cost() <= gold).toList();
  }

  public int gold() {
    return gold;
  }

  public void idle() {
    this.idling = Math.max(0, idling - 1);
  }

  public boolean canIdle() {
    return idling > 0;
  }
}
