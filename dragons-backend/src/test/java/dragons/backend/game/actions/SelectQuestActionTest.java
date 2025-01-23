package dragons.backend.game.actions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import dragons.backend.game.Context;
import dragons.backend.game.QuestProbability;
import dragons.backend.game.responses.QuestResponse;
import java.io.IOException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.MockedConstruction;
import org.springframework.core.io.ClassPathResource;

class SelectQuestActionTest {

  private final ObjectMapper mapper = new ObjectMapper();

  @Test
  void should_return_SolveQuestAction_when_no_easy_quests_found_and_cannot_idle() throws IOException {
    ClassPathResource classPathResource = new ClassPathResource("quests/98.json");
    QuestResponse[] quests = mapper.readValue(classPathResource.getInputStream(), QuestResponse[].class);

    Context context = mock(Context.class);
    when(context.canIdle()).thenReturn(false);

    SelectQuestAction action = new SelectQuestAction(context, quests);

    Action exec = action.exec();

    assertEquals(SolveQuestAction.class, exec.getClass());
  }

  @Test
  void should_return_IdlingAction_when_no_easy_quests_found_and_can_idle() throws IOException {
    ClassPathResource classPathResource = new ClassPathResource("quests/98.json");
    QuestResponse[] quests = mapper.readValue(classPathResource.getInputStream(), QuestResponse[].class);

    Context context = mock(Context.class);
    when(context.canIdle()).thenReturn(true);
    
    SelectQuestAction action = new SelectQuestAction(context, quests);

    Action exec = action.exec();
    
    assertEquals(IdlingAction.class, exec.getClass());
  }

  @ParameterizedTest
  @ValueSource(strings = {"quests/01.json", "quests/02.json", "quests/03.json", "quests/04.json", "quests/05.json"})
  void should_return_SolveQuestAction_when_easy_quests_found(String resourcePath) throws IOException {
    ClassPathResource classPathResource = new ClassPathResource(resourcePath);
    QuestResponse[] quests = mapper.readValue(classPathResource.getInputStream(), QuestResponse[].class);

    Context context = mock(Context.class);
    
    SelectQuestAction action = new SelectQuestAction(context, quests);

    try (MockedConstruction<SolveQuestAction> mockedConstruction = mockConstruction(SolveQuestAction.class, (mock, ctx) -> {
      String probability = ((QuestResponse) ctx.arguments().get(1)).probability();
      // assertEquals("Piece of cake", probability);
      assertTrue(QuestProbability.of(probability).isEasy());
    })) {
      Action nextAction = action.exec();
      
      assertEquals(SolveQuestAction.class, nextAction.getClass());
      assertEquals(1, mockedConstruction.constructed().size());
    }
  }

}
