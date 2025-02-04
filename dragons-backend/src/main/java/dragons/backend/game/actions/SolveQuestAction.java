package dragons.backend.game.actions;

import dragons.backend.game.responses.QuestResponse;
import dragons.backend.game.responses.SolveQuestResponse;
import dragons.backend.game.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SolveQuestAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(SolveQuestAction.class);
  
  private final Context context;
  private final QuestResponse quest;

  public SolveQuestAction(Context context, QuestResponse quest) {
    this.context = context;
    this.quest = quest;
  }

  @Override
  public Action exec() {
    SolveQuestResponse response = context.api().solveQuest(context.gameId(), quest.adId());
    context.onSolveQuest(response);
    
    logger.info("solved quest success={}, lives={}, gold={}, score={}, turn={}", 
        response.success(), response.lives(), response.gold(), response.score(), response.turn());

    if (context.healthPotionNeeded()) {
      logger.warn("NEED HEALTH POTION!!!");
      return new BuyHealthPotionAction(context);
    }
    
    if (!context.isGameOver()) {
      return new BuyItemAction(context);
    }
    
    return new GameOverAction(context);
  }
}
