package dragons.backend.external;

import com.fasterxml.jackson.databind.ObjectMapper;
import dragons.backend.game.responses.GameStartResponse;
import dragons.backend.game.responses.QuestResponse;
import java.io.IOException;
import java.util.Arrays;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Request.Builder;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OkHttpTest {

  private static final Logger logger = LoggerFactory.getLogger(OkHttpTest.class);

  OkHttpClient client = new OkHttpClient
      .Builder().addInterceptor(new OkLoggingInterceptor()).build();

  ObjectMapper mapper = new ObjectMapper();

  @Test
  void should_start_game_and_fetch_quests() throws IOException {
    RequestBody emptyBody = RequestBody.create("", MediaType.get("application/json"));
    Request startGameRequest = new Request.Builder().url("https://dragonsofmugloar.com/api/v2/game/start").post(emptyBody).build();
    Response startGameResponse = client.newCall(startGameRequest).execute();

    GameStartResponse gameStartResponse = mapper.readValue(startGameResponse.body().byteStream(), GameStartResponse.class);

    String gameId = gameStartResponse.gameId();
    logger.debug("got game id = {}", gameId);

    Request questsRequest = new Builder().url("https://dragonsofmugloar.com/api/v2/%s/messages".formatted(gameId)).get().build();
    Response questsResponse = client.newCall(questsRequest).execute();

    QuestResponse[] quests = mapper.readValue(questsResponse.body().byteStream(), QuestResponse[].class);

    logger.debug("quests = {}", Arrays.asList(quests));
  }

}
