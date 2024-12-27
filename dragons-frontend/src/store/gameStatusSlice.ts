import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(startNewGame.pending, () => {});
    builder.addCase(startNewGame.rejected, () => {});
    builder.addCase(startNewGame.fulfilled, (state, action: PayloadAction<StartGameResponse>) => {
      state.gameId = {gameId: action.payload.gameId};
    });

    builder.addCase(continueGame, (state, action: PayloadAction<GameId>) => {
      state.gameId = action.payload;
    });

    builder.addCase(endGame, (state) => {
      state.gameId = null;
    })
  }
});

export const isGameStarted = (state: RootState) => state.gameStatusSlice.gameId !== null;

export const continueGame = createAction("continueGame", function (gameId: GameId) {
  return {
    payload: gameId
  }
});

export const startNewGame = createAsyncThunk(
    "startNewGame",
    async () => fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "post"})
    .then(response => response.json())
    .then(data => data as StartGameResponse)
);

export const endGame = createAction("endGame");
