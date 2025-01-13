package dragons.backend.external;

import java.util.Base64;

public record QuestResponse(
    String adId,
    String message,
    String reward,
    Integer expiresIn,
    Integer encrypted,
    String probability
) {

  public String probability() {
    return decrypt(probability);
  }

  public String adId() {
    return decrypt(adId);
  }

  public String message() {
    return decrypt(message);
  }

  private String decrypt(String source) {
    return switch (encrypted) {
      case 1:
        yield new String(Base64.getDecoder().decode(source));
      case 2:
        yield new Rot13Decode(source).value();
      case null:
        yield source;
      default:
        throw new IllegalStateException("Unexpected value: " + encrypted);
    };
  }

}
