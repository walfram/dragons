package dragons.backend.game;

public record GameStartResponse(
    String gameId,
    Integer lives,
    Integer gold,
    Integer level,
    Integer score,
    Integer highScore,
    Integer turn
) {

}
