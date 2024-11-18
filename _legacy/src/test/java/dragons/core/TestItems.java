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

import dragons.core.Item;

public class TestItems {

	private final ObjectMapper mapper = new ObjectMapper();
	
	@Test
	public void test_reqd_items() throws IOException {
		JsonNode tree = mapper.readTree(getClass().getClassLoader().getResource("items.json"));
		
		List<Item> items = new ArrayList<>();
		
		tree.get("items").forEach(json -> {
			items.add(new Item(json));
		});
		
		assertEquals(items.size(), 5);
		
		Optional<Item> o = items.stream().filter(i -> "mega-arrow".equals(i.id())).findFirst();
		assertTrue(o.isPresent());
		assertEquals(o.get().price(), 100.0);
		assertEquals(o.get().name(), "Mega arrow");
	}
	
}
