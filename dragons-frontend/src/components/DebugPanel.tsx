import {isGameStarted} from "../store/gameSlice.ts";
import {useAppSelector} from "../store/store.ts";
import {GameId} from "../etc/types.ts";
import {savedGameIds} from "../etc/saveGame.ts";

export default function DebugPanel() {
  const gameStarted = useAppSelector(isGameStarted);

  const gameIds: GameId[] = savedGameIds();

  return (
      <section className={"debug-panel"}>
        <div>saved games {gameIds.map(gid => gid.gameId).join(",")}</div>
        <div>current game state started={gameStarted.toString()}</div>
      </section>
  );
}
