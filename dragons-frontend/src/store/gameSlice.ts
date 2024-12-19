import {createSlice} from "@reduxjs/toolkit";
import {GameId} from "../etc/types.ts";
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
  reducers: {
    
  }
});

export const isGameStarted = (state: RootState) => state.gameSlice.gameId !== null;
