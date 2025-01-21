package dragons.backend.runners.advanced;

import dragons.backend.game.QuestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FetchQuestsAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(FetchQuestsAction.class);
  
  private final Context context;

  public FetchQuestsAction(Context context) {
    this.context = context;
  }

  @Override
  public Action exec() {
    QuestResponse[] quests = context.api().fetchQuests(context.gameId());
    logger.info("fetched quests {}", quests.length);
    return new SelectQuestAction(context, quests);
  }
}
