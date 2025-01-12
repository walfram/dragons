package dragons.backend.external;

public interface ExternalApi {

  GameInstanceResponse startGame();

  QuestResponse[] fetchQuests(String gameId);

  ProductResponse[] fetchProducts(String gameId);

  PlayerReputationResponse fetchReputation(String gameId);

  SolveQuestResponse solveQuest(String gameId, String questId);

  BuyItemResponse buyItem(String gameId, String itemId);
}
