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
    },
    saveGameId: (state, action: PayloadAction<GameId>) => {
      state.gameIds = [
          action.payload,
          ...state.gameIds
      ];
      storeGameIds(state.gameIds);
    }
  }
});

export const {
  removeGameId,
  saveGameId
} = savedGameSlice.actions;

function savedGameIds(): GameId[] {
  const s = localStorage.getItem("gameIds");
  console.log("stored raw game ids", s);
  const parsed: string[] = JSON.parse(s || "[]");
  return parsed.map(parsedGameId => ({gameId: parsedGameId}));
}

function storeGameIds(gameIds: GameId[]) {
  console.log("persisting gameIds", gameIds);
  localStorage.setItem("gameIds", JSON.stringify(gameIds.map(gid => gid.gameId)));
}
