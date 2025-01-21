package dragons.backend.runners.advanced;

import dragons.backend.game.ProbabilityComparator;
import dragons.backend.game.QuestResponse;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SelectQuestAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(SelectQuestAction.class);

  private final Context context;
  private final QuestResponse[] quests;

  public SelectQuestAction(Context context, QuestResponse[] quests) {
    this.context = context;
    this.quests = quests;
  }

  @Override
  public Action exec() {
    List<QuestResponse> easyQuests = Arrays.stream(quests)
        .filter(q -> QuestProbability.of(q.probability()).isEasy())
        .filter(q -> q.expiresIn() >= 1)
        .sorted(Comparator.comparingInt(QuestResponse::reward).reversed())
        .toList();
    easyQuests.forEach(q -> logger.debug("easy quest id={}, reward={}, expiresIn={}, probability={}", q.adId(), q.reward(), q.expiresIn(), q.probability()));

    // TODO if no easy quests - "idle" via investigation check
    if (easyQuests.isEmpty() && !context.idling()) {
      if (!context.idling()) {
        context.startIdling();
      } 
      
      logger.info("could not find easy quest, idling");
      return new IdlingAction(context);
    } else {
      context.stopIdling();
    }
    
    QuestResponse quest = Arrays.stream(quests)
        .min(new ProbabilityComparator().thenComparing(QuestResponse::reward, Comparator.reverseOrder()))
        .orElseThrow();

    logger.info("selected quest id={}, reward={}, probability={}, expires={}", quest.adId(), quest.reward(), quest.probability(), quest.expiresIn());

    return new SolveQuestAction(context, quest);
  }
}
