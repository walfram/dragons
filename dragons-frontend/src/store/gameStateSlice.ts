import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StartGameResponse} from "../etc/types.ts";

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
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(startNewGame.fulfilled, (state, action: PayloadAction<StartGameResponse>) => {
      state.started = true;
      state.game = action.payload;
    });
    builder.addCase(startNewGame.pending, (_state) => {
      
    });
    builder.addCase(startNewGame.rejected, (state, _action) => {
      state.started = false;
    });
  }
});

export const startNewGame = createAsyncThunk(
  'startNewGame',
  async () => fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "POST"})
  .then(response => response.json())
  .then(data => data as StartGameResponse)  
);
