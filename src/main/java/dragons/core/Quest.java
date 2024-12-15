package dragons.core;

import com.fasterxml.jackson.databind.JsonNode;

public class Quest {

	private final String questId;
	private final String description;
	private final double reward;
	private final int expiresIn;

	public Quest(JsonNode json) {
		this.questId = json.get("adId").textValue();
		this.description = json.get("message").textValue();
		this.reward = json.get("reward").doubleValue();
		this.expiresIn = json.get("expiresIn").intValue();
	}
	
	public int expiresIn() {
		return expiresIn;
	}
	
	public String description() {
		return description;
	}
	
	public String id() {
		return questId;
	}

	public double reward() {
		return reward;
	}

}
