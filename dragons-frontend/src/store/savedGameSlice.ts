import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameId} from "../etc/types.ts";

type SavedGameState = {
  savedGameIds: GameId[];
}

const initialSavedGameState: SavedGameState = {
  savedGameIds: [],
}

export const savedGameSlice = createSlice({
  "name": "saved-game-slice",
  initialState: initialSavedGameState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkGameIds.rejected, (state) => {
      console.log("checking game ids failed");
      state.savedGameIds = [];
    });
    builder.addCase(checkGameIds.pending, (_state) => {
      console.log("checking valid game ids...");
    });
    builder.addCase(checkGameIds.fulfilled, (state, action: PayloadAction<GameId[]>) => {
      state.savedGameIds = action.payload;
    });   
  }
});

export const continueGame = createAsyncThunk(
    "continueGame",
    async (gameId: GameId, {dispatch}) => {
      console.log("continue game", gameId);
      // TODO what next?
      dispatch(continueGame(gameId));
    }
)

export const checkGameIds = createAsyncThunk(
    'checkGameIds',
    async (gameIds: GameId[]) => {
      const validGames: GameId[] = [];

      for (const gameId of gameIds) {
        const response = await fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`, { signal: AbortSignal.timeout(200) });
        if (response.ok) {
          validGames.push(gameId);
          console.log(`game id ${gameId} is valid`);
        } else {
          console.log(`game id ${gameId} is invalid`);
        }
      }

      return validGames;
    }
)
