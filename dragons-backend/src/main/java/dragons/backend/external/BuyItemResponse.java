package dragons.backend.external;

public record BuyItemResponse(
    Boolean shoppingSuccess,
    Integer gold,
    Integer lives,
    Integer level,
    Integer turn
) {

}
