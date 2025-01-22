package dragons.backend.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dragons.backend.game.responses.QuestResponse;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Arrays;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class HttpClientTest {

  private static final Logger logger = LoggerFactory.getLogger(HttpClientTest.class);

  HttpClient client = HttpClient.newHttpClient();
  ObjectMapper mapper = new ObjectMapper();

  @Test
  void should_start_game_and_fetch_quests_products_reputation() throws IOException, InterruptedException {
    HttpRequest startGameRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://dragonsofmugloar.com/api/v2/game/start"))
        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .POST(HttpRequest.BodyPublishers.noBody())
        .build();

    HttpResponse<String> startGameResponse = client.send(startGameRequest, BodyHandlers.ofString());
    logger.debug("start game response = {}", startGameResponse);

    JsonNode startGameNode = mapper.readTree(startGameResponse.body());
    String gameId = startGameNode.get("gameId").asText();
    logger.debug("game id = {}", gameId);

    HttpRequest questsRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://dragonsofmugloar.com/api/v2/%s/messages".formatted(gameId)))
        .GET()
        .build();

    HttpResponse<String> questsResponse = client.send(questsRequest, BodyHandlers.ofString());
    QuestResponse[] quests = mapper.readValue(questsResponse.body(), QuestResponse[].class);
    logger.debug("quests = {}", Arrays.asList(quests));
  }

}
