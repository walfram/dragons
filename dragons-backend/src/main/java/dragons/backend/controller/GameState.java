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

  public String gameId() {
    return gameId;
  }

  public Integer lives() {
    return lives;
  }
  
  public void init(GameInstanceResponse response) {
    this.gameId = response.gameId();
    this.lives = response.lives();
    this.gold = response.gold();
    this.level = response.level();
    this.score = response.score();
    this.highScore = response.highScore();
    this.turn = response.turn();
    
    this.message = "Game started";
  }
  
  public void restore(String gameId) {
    this.gameId = gameId;
    this.message = "Restored game";
  }

  public void update(SolveQuestResponse response) {
    this.lives = response.lives();
    this.gold = response.gold();
    this.score = response.score();
    this.highScore = response.highScore();
    this.turn = response.turn();
    
    this.message = response.message();
  }

  public void update(BuyItemResponse response) {
    this.gold = response.gold();
    this.lives = response.lives();
    this.level = response.level();
    this.turn = response.turn();
    
    this.message = response.shoppingSuccess() ? "Shopping success" : "Shopping failed";
  }

}
