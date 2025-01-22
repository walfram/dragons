package dragons.backend.game;

import static dragons.backend.game.Difficulty.EASY;
import static dragons.backend.game.Difficulty.HARD;
import static dragons.backend.game.Difficulty.MEDIUM;

import java.util.Arrays;
import java.util.List;

public enum QuestProbability {

  PIECE_OF_CAKE("piece of cake", EASY),
  QUITE_LIKELY("quite likely", EASY),
  SURE_THING("sure thing", EASY),
  WALK_IN_THE_PARK("walk in the park", EASY),

  GAMBLE("gamble", MEDIUM),
  HMMM("hmmm....", MEDIUM),
  RISKY("risky", MEDIUM),

  RATHER_DETRIMENTAL("rather detrimental", HARD),
  SUICIDE_MISSION("suicide mission", HARD),
  PLAYING_WITH_FIRE("playing with fire", HARD),
  IMPOSSIBLE("impossible", HARD);

  private final String stringValue;
  private final Difficulty difficulty;

  QuestProbability(String stringValue, Difficulty difficulty) {
    this.stringValue = stringValue;
    this.difficulty = difficulty;
  }

  public static List<QuestProbability> easy() {
    return Arrays
        .stream(values())
        .filter(qp -> qp.difficulty == EASY)
        .toList();
  }

  public static QuestProbability of(String probability) {
    return Arrays
        .stream(values())
        .filter(qp -> qp.stringValue.equalsIgnoreCase(probability))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Unknown quest probability %s".formatted(probability)));
  }
  
  public boolean isEasy() {
    return difficulty == EASY;
  }
  
  public boolean isMedium() {
    return difficulty == MEDIUM;
  }

  public boolean isHard() {
    return difficulty == HARD;
  }
}
