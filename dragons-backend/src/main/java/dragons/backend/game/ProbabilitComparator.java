package dragons.backend.game;

import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProbabilitComparator implements Comparator<QuestResponse> {

  private static final Logger logger = LoggerFactory.getLogger(ProbabilitComparator.class);
  
  private static final List<String> probabilities = List.of(
      "piece of cake",
      "quite likely",
      "sure thing",
      "walk in the park",

      "gamble",
      "hmmm....",
      "risky",

      "rather detrimental",
      "suicide mission",
      "playing with fire",
      "impossible"
  );

  @Override
  public int compare(QuestResponse left, QuestResponse right) {
    String leftProbability = new NormalizedProbability(left.probability()).value();
    int leftIndex = probabilities.indexOf(leftProbability);
    
    if (leftIndex == -1) {
      logger.warn("unknown probability {}", left.probability());
      leftIndex = -128;
    }
    
    String rightProbability = new NormalizedProbability(right.probability()).value();
    int rightIndex = probabilities.indexOf(rightProbability);
    
    if (rightIndex == -1) {
      logger.warn("unknown probability {}", right.probability());
      rightIndex = -128;
    }
    
    return leftIndex - rightIndex;
  }
  
}
