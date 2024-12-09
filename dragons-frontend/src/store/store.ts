import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {gameSlice} from "./gameSlice.ts";
import {questSlice} from "./questSlice.ts";

export const store = configureStore({
  reducer: {
    gameSlice: gameSlice.reducer,
    questSlice: questSlice.reducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
