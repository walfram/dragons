import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameState, ProductId, PurchaseResponse, QuestId, QuestResponse} from "../etc/types.ts";

const initialGameInstance: GameState = {
  gold: 0,
  highScore: 0,
  level: 0,
  lives: 0,
  score: 0,
  turn: 0
}

export const gameInstanceSlice = createSlice({
  name: "gameStateSlice",
  initialState: initialGameInstance,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(acceptQuest.rejected, () => {});
    builder.addCase(acceptQuest.pending, () => {});
    builder.addCase(acceptQuest.fulfilled, (state, action: PayloadAction<QuestResponse>) => {
      state.gold = action.payload.gold;
      state.highScore = action.payload.highScore;
      state.lives = action.payload.lives;
      state.score = action.payload.score;
      state.turn = action.payload.turn;
      // state.level is updated on shop item purchase
    });

    builder.addCase(purchaseItem.rejected, () => {});
    builder.addCase(purchaseItem.pending, () => {});
    builder.addCase(purchaseItem.fulfilled, (state, action: PayloadAction<PurchaseResponse>) => {
      state.turn = action.payload.turn;
      state.lives = action.payload.lives;
      state.gold = action.payload.gold;
      state.level = action.payload.level;
    });
  }
});

export const purchaseItem = createAsyncThunk(
    "purchaseItem",
    async (itemId: ProductId) => fetch(`https://dragonsofmugloar.com/api/v2/${itemId.gameId.gameId}/shop/buy/${itemId.itemId}`, {method: "post"})
    .then(response => response.json())
    .then(data => data as PurchaseResponse)
);

export const acceptQuest = createAsyncThunk(
    "acceptQuest",
    async (questId: QuestId) => fetch(`https://dragonsofmugloar.com/api/v2/${questId.gameId.gameId}/solve/${questId.adId}`, {method: "post"})
    .then(response => response.json())
    .then(data => data as QuestResponse)
);
