package dragons.backend.game.responses;

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
