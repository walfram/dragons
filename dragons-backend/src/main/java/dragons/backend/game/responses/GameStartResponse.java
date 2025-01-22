package dragons.backend.game.responses;

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
