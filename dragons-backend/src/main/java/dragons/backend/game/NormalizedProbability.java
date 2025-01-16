package dragons.backend.game;

public class NormalizedProbability {

  private final String probability;

  public NormalizedProbability(String probability) {
    if (probability == null) {
      throw new IllegalArgumentException("Probability is null");
    }

    this.probability = probability;
  }

  public String value() {
    return probability.toLowerCase();
  }
}
