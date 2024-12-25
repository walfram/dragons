import {useAppSelector} from "../store/store.ts";

export function useGameId() {
  return useAppSelector(state => state.gameSlice.gameId);
}
