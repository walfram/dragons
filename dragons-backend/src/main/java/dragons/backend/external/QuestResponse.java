package dragons.backend.external;

public record QuestResponse(
    String adId,
    String message,
    String reward,
    Integer expiresIn,
    Integer encrypted,
    String probability
) {

}
