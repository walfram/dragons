package dragons.backend.game.responses;

public record BuyItemResponse(
    Boolean shoppingSuccess,
    Integer gold,
    Integer lives,
    Integer level,
    Integer turn
) {

}
