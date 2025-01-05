import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameInstance, GameStartResponse, ProductId, PurchaseResponse, Quest, QuestId, QuestResponse} from "../etc/types.ts";

const initialGameInstance: GameInstance = {
  gameId: gameIdFromUrl(),
  gameState: {
    gold: 0,
    highScore: 0,
    level: 0,
    lives: 0,
    score: 0,
    turn: 0
  },
  quests: [],
  gameOver: false
}

export const gameInstanceSlice = createSlice({
  name: "gameInstanceSlice",
  initialState: initialGameInstance,
  reducers: {
    gameOver: (state) => {
      state.gameOver = true;
    }
  },
  extraReducers: builder => {
    builder.addCase(startGame.fulfilled, (state, action: PayloadAction<GameStartResponse>) => {
      state.gameId = action.payload.gameId;
      state.gameState = {...action.payload};
      state.gameOver = false;
    });

    builder.addCase(acceptQuest.fulfilled, (state, action: PayloadAction<QuestResponse>) => {
      state.gameState = {
        ...state.gameState,
        ...action.payload
      }
    });

    builder.addCase(fetchQuests.fulfilled, (state, action: PayloadAction<Quest[]>) => {
      state.quests = action.payload;
    });
    
    builder.addCase(purchaseItem.fulfilled, (state, action: PayloadAction<PurchaseResponse>) => {
      state.gameState.gold = action.payload.gold;
      state.gameState.level = action.payload.level;
      state.gameState.lives = action.payload.lives;
      state.gameState.turn = action.payload.turn;
    });
  }
});

export const {
  gameOver
} = gameInstanceSlice.actions;

export const startGame = createAsyncThunk(
    "startGame",
    async () => fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "post"})
    .then(response => response.json())
    .then(data => data as GameStartResponse)
);

function gameIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const gameId = searchParams.get("gameId");
  console.log("### gameId from url", gameId);
  return gameId;
}

export const fetchQuests = createAsyncThunk(
    "fetchQuests",
    async (gameId: string) => fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    // TODO might return 410:Gone and response body {status: "Game Over"} -- handle this 
    .then(response => response.json())
    .then(data => data as Quest[])
);

export const acceptQuest = createAsyncThunk(
    "acceptQuest",
    async (questId: QuestId) => fetch(`https://dragonsofmugloar.com/api/v2/${questId.gameId}/solve/${questId.adId}`, {method: "post"})
    .then(response => response.json())
    .then(data => data as QuestResponse)
)

export const purchaseItem = createAsyncThunk(
    "purchaseItem",
    async (productId: ProductId) => fetch(`https://dragonsofmugloar.com/api/v2/${productId.gameId}/shop/buy/${productId.itemId}`, {method: "post"})
    .then(response => response.json())
    .then(data => data as PurchaseResponse)
)
