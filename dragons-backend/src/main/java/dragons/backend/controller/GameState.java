package dragons.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import dragons.backend.external.BuyItemResponse;
import dragons.backend.external.GameInstanceResponse;
import dragons.backend.external.SolveQuestResponse;

public class GameState {

  // TODO should return GameStateView?
  @JsonProperty
  private String gameId;
  @JsonProperty
  private Integer lives;
  @JsonProperty
  private Integer gold;
  @JsonProperty
  private Integer level;
  @JsonProperty
  private Integer score;
  @JsonProperty
  private Integer highScore;
  @JsonProperty
  private Integer turn;
  @JsonProperty
  private String message;
  
  public void init(GameInstanceResponse response) {
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

  public void update(SolveQuestResponse response) {
    if (!response.success())
      return;
    
    this.lives = response.lives();
    this.gold = response.gold();
    this.score = response.score();
    this.highScore = response.highScore();
    this.turn = response.turn();
    this.message = response.message();
  }

  public void update(BuyItemResponse response) {
    if (!response.shoppingSuccess())
      return;
    
    this.gold = response.gold();
    this.lives = response.lives();
    this.level = response.level();
    this.turn = response.turn();
  }
}
