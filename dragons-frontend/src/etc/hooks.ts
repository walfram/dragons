import {GameId} from "./types.ts";

export function useSavedGameIds() {
  const item: string = localStorage.getItem("gameIds") || "";
  const gameIds: GameId[] = JSON.parse(item) || [];

  function saveGameIds(ids: GameId[]) {
    localStorage.setItem("gameIds", JSON.stringify(ids));
  }

  return {gameIds, saveGameIds};
}
