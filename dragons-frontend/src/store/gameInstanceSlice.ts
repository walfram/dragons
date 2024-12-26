import {createSlice} from "@reduxjs/toolkit";
import {GameState} from "../etc/types.ts";

const initialGameInstance: GameState = {
  gold: 0,
  highScore: 0,
  level: 0,
  lives: 0,
  score: 0,
  turn: 0
}

export const gameInstanceSlice = createSlice({
  name: "gameStateSlice",
  initialState: initialGameInstance,
  reducers: {}
})
