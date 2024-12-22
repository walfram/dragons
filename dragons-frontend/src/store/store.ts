import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {gameSlice} from "./gameSlice.ts";
import {spinnerSlice} from "./spinnerSlice.ts";
import {savedGameSlice} from "./savedGameSlice.ts";

export const store = configureStore({
  reducer: {
    spinnerSlice: spinnerSlice.reducer,
    savedGameSlice: savedGameSlice.reducer,
    gameSlice: gameSlice.reducer,
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
