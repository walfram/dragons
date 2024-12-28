import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameId, StartGameResponse} from "../etc/types.ts";
import {RootState} from "./store.ts";

type GameStatusState = {
  // TODO should not be null
  gameId: GameId | null;
}

const initialGameStatusState: GameStatusState = {
  gameId: null
}

export const gameStatusSlice = createSlice({
  name: "gameStatusSlice",
  initialState: initialGameStatusState,
  reducers: {
    continueGame: (state, action: PayloadAction<GameId>) => {
      state.gameId = action.payload;
    },
    endGame: (state) => {
      state.gameId = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(startNewGame.pending, () => {});
    builder.addCase(startNewGame.rejected, () => {});
    builder.addCase(startNewGame.fulfilled, (state, action: PayloadAction<StartGameResponse>) => {
      state.gameId = {gameId: action.payload.gameId};
    });
  }
});

export const {
  continueGame, endGame
} = gameStatusSlice.actions;

export const isGameStarted = (state: RootState) => state.gameStatusSlice.gameId !== null;

export const startNewGame = createAsyncThunk(
    "startNewGame",
    async () => fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "post"})
    .then(response => response.json())
    .then(data => data as StartGameResponse)
);
