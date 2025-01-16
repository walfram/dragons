package dragons.backend.external;

import dragons.backend.game.BuyItemResponse;
import dragons.backend.game.GameInstanceResponse;
import dragons.backend.game.PlayerReputationResponse;
import dragons.backend.game.ProductResponse;
import dragons.backend.game.QuestResponse;
import dragons.backend.game.SolveQuestResponse;

public interface ExternalApi {

  GameInstanceResponse startGame();

  QuestResponse[] fetchQuests(String gameId);

  ProductResponse[] fetchProducts(String gameId);

  PlayerReputationResponse fetchReputation(String gameId);

  SolveQuestResponse solveQuest(String gameId, String questId);

  BuyItemResponse buyItem(String gameId, String itemId);
}
