package dragons.backend.external;

import dragons.backend.game.responses.BuyItemResponse;
import dragons.backend.game.responses.GameStartResponse;
import dragons.backend.game.responses.PlayerReputationResponse;
import dragons.backend.game.responses.ProductResponse;
import dragons.backend.game.responses.QuestResponse;
import dragons.backend.game.responses.SolveQuestResponse;

public interface ExternalApi {

  GameStartResponse startGame();

  QuestResponse[] fetchQuests(String gameId);

  ProductResponse[] fetchProducts(String gameId);

  PlayerReputationResponse fetchReputation(String gameId);

  SolveQuestResponse solveQuest(String gameId, String questId);

  BuyItemResponse buyItem(String gameId, String itemId);
}
