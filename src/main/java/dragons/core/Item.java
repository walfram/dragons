package dragons.core;

import com.fasterxml.jackson.databind.JsonNode;

public class Item {

	private final String itemId;
	private final String name;
	private final double price;

	public Item(JsonNode json) {
		this.itemId = json.get("id").textValue();
		this.name = json.get("name").textValue();
		this.price = json.get("cost").doubleValue();
	}
	
	@Override
	public String toString() {
		return String.format("Item{id=%s, price=%s, name=%s}", itemId, price, name);
	}

	public String id() {
		return itemId;
	}

	public double price() {
		return price;
	}

	public String name() {
		return name;
	}
	

}
