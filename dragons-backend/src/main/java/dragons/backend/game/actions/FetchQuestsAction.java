package dragons.backend.game.actions;

import dragons.backend.game.responses.QuestResponse;
import dragons.backend.game.Context;
import java.util.Arrays;
import java.util.stream.Collectors;
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
    logger.info("fetched quests, probabilities = {}", Arrays.stream(quests).map(QuestResponse::probability).collect(Collectors.toSet()));
    return new SelectQuestAction(context, quests);
  }
}
