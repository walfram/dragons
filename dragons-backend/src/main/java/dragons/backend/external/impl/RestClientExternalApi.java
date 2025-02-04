package dragons.backend.external.impl;

import dragons.backend.game.responses.BuyItemResponse;
import dragons.backend.external.ExternalApi;
import dragons.backend.game.responses.GameStartResponse;
import dragons.backend.game.responses.PlayerReputationResponse;
import dragons.backend.game.responses.ProductResponse;
import dragons.backend.game.responses.QuestResponse;
import dragons.backend.game.responses.SolveQuestResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class RestClientExternalApi implements ExternalApi {

  private final RestClient restClient;

  public RestClientExternalApi(RestClient restClient) {
    this.restClient = restClient;
  }

  public GameStartResponse startGame() {
    return restClient.post().uri("/game/start").retrieve().body(GameStartResponse.class);
  }

  public QuestResponse[] fetchQuests(String gameId) {
    return restClient
        .get()
        .uri("/%s/messages".formatted(gameId))
        .retrieve()
        .body(QuestResponse[].class);
  }

  public ProductResponse[] fetchProducts(String gameId) {
    return restClient
        .get()
        .uri("/%s/shop".formatted(gameId))
        .retrieve()
        .body(ProductResponse[].class);
  }

  public PlayerReputationResponse fetchReputation(String gameId) {
    return restClient
        .post()
        .uri("/%s/investigate/reputation".formatted(gameId))
        .retrieve()
        .body(PlayerReputationResponse.class);
  }

  @Override
  public SolveQuestResponse solveQuest(String gameId, String questId) {
    return restClient
        .post()
        .uri("/%s/solve/%s".formatted(gameId, questId))
        .retrieve()
        .body(SolveQuestResponse.class);
  }

  @Override
  public BuyItemResponse buyItem(String gameId, String itemId) {
    return restClient
        .post()
        .uri("/%s/shop/buy/%s".formatted(gameId, itemId))
        .retrieve()
        .body(BuyItemResponse.class);
  }
}
