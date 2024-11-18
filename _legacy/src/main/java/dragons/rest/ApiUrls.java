package dragons.rest;

public class ApiUrls {

	private final String serverUrl;
	
	public ApiUrls(String serverUrl) {
		this.serverUrl = serverUrl;
	}

	public String gameStart() {
		return String.format("%s/api/v2/game/start", serverUrl);
	}
	
	public String pollQuests(String gameId) {
		return String.format("%s/api/v2/%s/messages", serverUrl, gameId);
	}
	
	public String solveQuest(String gameId, String questId) {
		return String.format("%s/api/v2/%s/solve/%s", serverUrl, gameId, questId);
	}
	
	public String shopList(String gameId) {
		return String.format("%s/api/v2/%s/shop", serverUrl, gameId);
	}
	
	public String shopBuy(String gameId, String itemId) {
		return String.format("%s/api/v2/%s/shop/buy/%s", serverUrl, gameId, itemId);
	}

}
