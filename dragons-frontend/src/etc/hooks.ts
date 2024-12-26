import {useAppSelector} from "../store/store.ts";

export function useGameId() {
  return useAppSelector(state => state.gameStatusSlice.gameId);
}
