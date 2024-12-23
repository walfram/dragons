import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GameId, StartGameResponse} from "../etc/types.ts";
import {RootState} from "./store.ts";

type GameState = {
  gameId: GameId | null;
}

const initialGameState: GameState = {
  gameId: null
}

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: initialGameState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(startNewGame.pending, () => {
      
    });
    builder.addCase(startNewGame.rejected, () => {
      
    });
    builder.addCase(startNewGame.fulfilled, () => {
      
    });
  }
});

export const isGameStarted = (state: RootState) => state.gameSlice.gameId !== null;

export const startNewGame = createAsyncThunk(
    "startNewGame",
    async () => fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "post"})
    .then(response => response.json())
    .then(data => data as StartGameResponse)
);
