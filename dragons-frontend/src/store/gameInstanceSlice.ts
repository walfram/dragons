import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameState, ItemId, PurchaseResponse, QuestId, QuestResult} from "../etc/types.ts";

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
    builder.addCase(acceptQuest.fulfilled, (state, action: PayloadAction<QuestResult>) => {
      state.gold = action.payload.gold;
      state.highScore = action.payload.highScore;
      state.lives = action.payload.lives;
      state.score = action.payload.score;
      state.turn = action.payload.turn;
      // state.level is updated on shop item purchase
    })
  }
});

export const purchaseItem = createAsyncThunk(
    "purchaseItem",
    async (itemId: ItemId) => fetch(`https://dragonsofmugloar.com/api/v2/${itemId.gameId.gameId}/shop/buy/${itemId.itemId}`, {method: "post"})
    .then(response => response.json())
    .then(data => data as PurchaseResponse)
);

export const acceptQuest = createAsyncThunk(
    "acceptQuest",
    async (questId: QuestId) => fetch(`https://dragonsofmugloar.com/api/v2/${questId.gameId.gameId}/solve/${questId.adId}`, {method: "post"})
    .then(response => response.json())
    .then(data => data as QuestResult)
);
