import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {spinnerSlice} from "./spinnerSlice.ts";
import {gameInstanceSlice} from "./gameInstanceSlice.ts";

export const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
    gameInstance: gameInstanceSlice.reducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
