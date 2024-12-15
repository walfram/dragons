import {GameId} from "./types.ts";

export function savedGameIds(): GameId[] {
  const serializedGameIds: string = localStorage.getItem("gameIds") || "[]";
  return JSON.parse(serializedGameIds);
}

function saveGameIds(ids: GameId[]) {
  localStorage.setItem("gameIds", JSON.stringify(ids));
}

export function saveGameId(gameId: GameId) {
  const gameIds = savedGameIds();
  const set = new Set<GameId>([gameId, ...gameIds]);
  saveGameIds(Array.from(set));
}
