import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameId, GameState, QuestResult, StartGameResponse} from "../etc/types.ts";
import {RootState} from "./store.ts";

type GameSlice = GameId & GameState & {
  started: boolean;
};

const initialGameState: GameSlice = {
  started: false,
  lives: 0,
  gold: 0,
  level: 0,
  score: 0,
  highScore: 0,
  turn: 0,
  gameId: ""
};

export const gameSlice = createSlice({
  name: 'game-slice',
  initialState: initialGameState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(startNewGame.fulfilled, (_state, action: PayloadAction<StartGameResponse>) => {
      return {...action.payload, started: true};
    });
    builder.addCase(startNewGame.pending, (_state) => {

    });
    builder.addCase(startNewGame.rejected, (state, action) => {
      state.started = false;
      console.error("rejected", action.payload);
    });

    builder.addCase(acceptQuest.fulfilled, (state, action: PayloadAction<QuestResult>) => {
      // TODO check action.payload.success
      // TODO trigger quest list refresh
      return {
        ...state, ...action.payload
      };
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
        fetch(`https://dragonsofmugloar.com/api/v2/${(getState() as RootState).gameSlice.gameId}/solve/${adId}`, {method: 'POST'})
        .then(response => response.json())
        .then(data => data as QuestResult)
);
