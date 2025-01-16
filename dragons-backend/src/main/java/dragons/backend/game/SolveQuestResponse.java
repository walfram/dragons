package dragons.backend.game;

public record SolveQuestResponse(
    Boolean success,
    Integer lives,
    Integer gold,
    Integer score,
    Integer highScore,
    Integer turn,
    String message
) {

}
