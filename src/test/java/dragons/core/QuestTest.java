package dragons.core;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.testng.annotations.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dragons.core.Quest;

public class QuestTest {

	private final ObjectMapper mapper = new ObjectMapper();

	@Test
	public void test_read_quests() throws IOException {
		JsonNode tree = mapper.readTree(getClass().getClassLoader().getResource("quests.json"));

		List<Quest> quests = new ArrayList<>();

		tree.get("messages").forEach(json -> {
			quests.add(new Quest(json));
		});

		assertEquals(quests.size(), 4);

		// quest-1: reward 100, expires in 10

		Optional<Quest> o = quests.stream().filter(q -> "quest-1".equals(q.id())).findFirst();
		assertTrue(o.isPresent());
		assertEquals(o.get().reward(), 100.0);
		assertEquals(o.get().expiresIn(), 10);
	}

}
