import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {gameStatusSlice} from "./gameStatusSlice.ts";
import {spinnerSlice} from "./spinnerSlice.ts";
import {savedGameSlice} from "./savedGameSlice.ts";
import {gameInstanceSlice} from "./gameInstanceSlice.ts";

export const store = configureStore({
  reducer: {
    spinnerSlice: spinnerSlice.reducer,
    savedGameSlice: savedGameSlice.reducer,
    gameStatusSlice: gameStatusSlice.reducer,
    gameInstanceSlice: gameInstanceSlice.reducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
