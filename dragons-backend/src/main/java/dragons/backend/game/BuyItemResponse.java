package dragons.backend.game;

public record BuyItemResponse(
    Boolean shoppingSuccess,
    Integer gold,
    Integer lives,
    Integer level,
    Integer turn
) {

}
