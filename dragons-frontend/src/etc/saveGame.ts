import {GameId} from "./types.ts";

export function savedGameIds(): GameId[] {
  const s = localStorage.getItem("gameIds");
  const parsed: string[] = JSON.parse(s || "[]");
  return parsed.map(parsedGameId => ({gameId: parsedGameId}));
}
