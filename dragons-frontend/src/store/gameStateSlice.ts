import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {QuestResult, StartGameResponse} from "../etc/types.ts";
import {RootState} from "./store.ts";

type GameState = {
  started: boolean;
  game: StartGameResponse; // change type name
};

const initialGameState: GameState = {
  started: false,
  game: {
    gameId: "",
    lives: 0,
    gold: 0,
    level: 0,
    score: 0,
    highScore: 0,
    turn: 0
  }
};

export const gameStateSlice = createSlice({
  name: 'game-state-slice',
  initialState: initialGameState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(startNewGame.fulfilled, (state, action: PayloadAction<StartGameResponse>) => {
      state.started = true;
      state.game = action.payload;
    });
    builder.addCase(startNewGame.pending, (_state) => {

    });
    builder.addCase(startNewGame.rejected, (state, action) => {
      state.started = false;
      console.error("rejected", action.payload);
    });

    builder.addCase(acceptQuest.fulfilled, (state, action: PayloadAction<QuestResult>) => {
      state.game.gold = action.payload.gold;
      state.game.highScore = action.payload.gold;
      state.game.score = action.payload.score;
      // state.game.level = action.payload.level;
      state.game.lives = action.payload.lives;
      state.game.turn = action.payload.turn;
      // TODO check action.payload.success
      // TODO trigger quest list refresh
    });
    builder.addCase(acceptQuest.pending, (_state) => {
      
    });
    builder.addCase(acceptQuest.rejected, (_state, action) => {
      console.error("rejected", action.payload);
    });
  }
});

export const startNewGame = createAsyncThunk(
    'startNewGame',
    async () => fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "POST"})
    .then(response => response.json())
    .then(data => data as StartGameResponse)
);

export const acceptQuest = createAsyncThunk(
    'acceptQuest',
    async (adId: string, {getState}) =>
        fetch(`https://dragonsofmugloar.com/api/v2/${(getState() as RootState).gameState.game.gameId}/solve/${adId}`, {method: 'POST'})
        .then(response => response.json())
        .then(data => data as QuestResult)
);
