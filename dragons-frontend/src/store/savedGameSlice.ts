import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameId} from "../etc/types.ts";

type SavedGameState = {
  gameIds: GameId[];
}

const initialSavedGames: SavedGameState = {
  gameIds: savedGameIds()
}

export const savedGameSlice = createSlice({
  name: "savedGameSlice",
  initialState: initialSavedGames,
  reducers: {
    removeGameId: (state, action: PayloadAction<GameId>) => {
      state.gameIds = state.gameIds.filter(e => e.gameId !== action.payload.gameId);
      storeGameIds(state.gameIds); // not sure if this is ok, side effect in reducer
    }
  }
});

export const {
  removeGameId
} = savedGameSlice.actions;

function savedGameIds(): GameId[] {
  const s = localStorage.getItem("gameIds");
  const parsed: string[] = JSON.parse(s || "[]");
  return parsed.map(parsedGameId => ({gameId: parsedGameId}));
}

// function removeGameId(gameId: GameId) {
//   const gameIds = savedGameIds();
//   const filtered = gameIds.filter(gid => gid.gameId !== gameId.gameId);
//   storeGameIds(filtered);
// }

function storeGameIds(gameIds: GameId[]) {
  localStorage.setItem("gameIds", JSON.stringify(gameIds.map(gid => gid.gameId)));
}
