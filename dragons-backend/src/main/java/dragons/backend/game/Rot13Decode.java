package dragons.backend.game;

public class Rot13Decode {

  private final String source;

  public Rot13Decode(String source) {
    this.source = source;
  }

  // https://stackoverflow.com/questions/8981296/rot-13-function-in-java
  public String value() {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < source.length(); i++) {
      char c = source.charAt(i);
      if (c >= 'a' && c <= 'm') {
        c += 13;
      } else if (c >= 'A' && c <= 'M') {
        c += 13;
      } else if (c >= 'n' && c <= 'z') {
        c -= 13;
      } else if (c >= 'N' && c <= 'Z') {
        c -= 13;
      }
      sb.append(c);
    }
    return sb.toString();
  }
}
