package dragons.backend.game;

import dragons.backend.external.ExternalApi;
import dragons.backend.game.responses.BuyItemResponse;
import dragons.backend.game.responses.GameStartResponse;
import dragons.backend.game.responses.PlayerReputationResponse;
import dragons.backend.game.responses.ProductResponse;
import dragons.backend.game.responses.SolveQuestResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class Context {

  private static final String HEALTH_POTION_ID = "hpot";
  private static final int HEALTH_POTION_PRICE = 50;
  private static final int LIVES_TOO_LOW_THRESHOLD = 1;
  private static final int MAX_IDLING_TURNS = 24;

  private final ExternalApi api;

  private String gameId;

  private int lives;
  private int gold;
  private int level;
  private int score;
  private int highScore;
  private int turn;

  private List<ProductResponse> products;
  private int idling = MAX_IDLING_TURNS;
  
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
    return "Game[id=%s,lives=%s,gold=%s,level=%s,score=%s,turn=%s], reputation=%s".formatted(gameId, lives, gold, level, score, turn, reputation);
  }

  public boolean healthPotionNeeded() {
    return lives == LIVES_TOO_LOW_THRESHOLD;
  }

  public boolean canByHealthPotion() {
    return gold >= HEALTH_POTION_PRICE;
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
