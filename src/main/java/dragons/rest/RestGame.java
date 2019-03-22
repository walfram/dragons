package dragons.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dragons.core.Game;
import dragons.core.GameState;
import dragons.core.Item;
import dragons.core.Quest;
import dragons.core.QuestMessage;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class RestGame implements Game {

	private static final Logger logger = LoggerFactory.getLogger(RestGame.class);

	private static final int MAX_IDLE_ROUNDS = 32;
	private static final String APPLICATION_JSON = "application/json";

	private final ObjectMapper objectMapper = new ObjectMapper();

	private final AtomicInteger idle = new AtomicInteger(0);
	private final AtomicInteger round;

	private final OkHttpClient client = new OkHttpClient();

	private int lives;
	private double gold;
	private int level;
	private int score;
	private int highScore;

	private String gameId;
	
	private final List<QuestMessage> history = new ArrayList<>();
	private final List<Item> inventory = new ArrayList<>();

	private final ApiUrls apiUrls;

	public RestGame(String serverUrl) {
		this.apiUrls = new ApiUrls(serverUrl);
		
		RequestBody requestBody = RequestBody.create(MediaType.get(APPLICATION_JSON), "");
		Request request = new Request.Builder().url(this.apiUrls.gameStart()).post(requestBody).build();

		try (Response response = client.newCall(request).execute()) {
			JsonNode tree = objectMapper.readTree(response.body().string());

			this.gameId = tree.get("gameId").textValue();

			this.lives = tree.get("lives").intValue();
			this.gold = tree.get("gold").doubleValue();
			this.score = tree.get("score").intValue();
			this.highScore = tree.get("highScore").intValue();
			this.round = new AtomicInteger(tree.get("turn").intValue());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public boolean canPlay() {
		return (lives > 0) && (idle.get() < MAX_IDLE_ROUNDS);
	}

	@Override
	public List<Quest> pollQuests() {
		Request request = new Request.Builder().url(this.apiUrls.pollQuests(gameId)).get().build();

		try (Response response = client.newCall(request).execute()) {
			List<Quest> quests = new ArrayList<>();

			JsonNode tree = objectMapper.readTree(response.body().string());
			tree.get("messages").forEach(json -> {
				quests.add(new Quest(json));
			});

			return quests;
		} catch (IOException e) {
			return Collections.emptyList();
		}
	}

	@Override
	public void solve(Quest quest) {
		RequestBody body = RequestBody.create(MediaType.get(APPLICATION_JSON), "");
		Request request = new Request.Builder().url(this.apiUrls.solveQuest(gameId, quest.id())).post(body).build();

		try (Response response = client.newCall(request).execute()) {
			JsonNode tree = objectMapper.readTree(response.body().string());
			
			boolean success = tree.get("success").booleanValue();
			String message = tree.get("message").textValue();
			
			history.add(new QuestMessage(success, round.get(), message));

			this.lives = tree.get("lives").intValue();
			this.gold = tree.get("gold").doubleValue();
			this.score = tree.get("score").intValue();
			this.highScore = tree.get("highScore").intValue();
			this.round.set(tree.get("turn").intValue());
			
			idle.set(0);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}

	}

	@Override
	public List<Item> pollShop() {
		Request request = new Request.Builder().url(this.apiUrls.shopList(gameId)).get().build();

		try (Response response = client.newCall(request).execute()) {
			List<Item> items = new ArrayList<>();

			JsonNode tree = objectMapper.readTree(response.body().string());
			tree.get("items").forEach(json -> {
				items.add(new Item(json));
			});

			return items;
		} catch (IOException e) {
			return Collections.emptyList();
		}
	}

	@Override
	public void buy(Item item) {
		RequestBody body = RequestBody.create(MediaType.get(APPLICATION_JSON), "");
		Request request = new Request.Builder().url(this.apiUrls.shopBuy(gameId, item.id())).post(body).build();

		try (Response response = client.newCall(request).execute()) {
			JsonNode tree = objectMapper.readTree(response.body().string());

			// why on earth this is in spec as String?
			String shoppingSuccess = tree.get("shoppingSuccess").textValue();

			// from api desc: Current turn. Note the turn increases even if the purchase is unsuccessful.
			// assuming gold, lives and level only change if purchase was successfull

			boolean success = Boolean.valueOf(shoppingSuccess).booleanValue();
			
			if (success) {
				this.gold = tree.get("gold").doubleValue();
				this.lives = tree.get("lives").intValue();
				this.level = tree.get("level").intValue();
				
				this.inventory.add(item);
			}

			this.round.set(tree.get("turn").intValue());

			idle.set(0);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}

	}

	@Override
	public String id() {
		return gameId;
	}

	@Override
	public int roundNumber() {
		return round.get();
	}

	@Override
	public GameState state() {
		return new GameState(gameId, lives, gold, level, score, highScore, round.get());
	}

	@Override
	public void idle() {
		idle.incrementAndGet();
	}

	@Override
	public void finish() {
		// TODO any resource clean up (?)
	}

}
