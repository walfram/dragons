package dragons.backend.game;

public record GameInstanceResponse(
    String gameId,
    Integer lives,
    Integer gold,
    Integer level,
    Integer score,
    Integer highScore,
    Integer turn
) {

}
