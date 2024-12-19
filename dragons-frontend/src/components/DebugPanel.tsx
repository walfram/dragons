import {isGameStarted} from "../store/gameSlice.ts";
import {useAppSelector} from "../store/store.ts";
import {GameId} from "../etc/types.ts";
import {savedGameIds} from "../etc/saveGame.ts";

export default function DebugPanel() {
  const gameStarted = useAppSelector(isGameStarted);

  const gameIds: GameId[] = savedGameIds();

  function checkServer() {
    fetch(`https://dragonsofmugloar.com/api/v2/game/start`, {method: "options"})
    .then(response => response.text())
    .then(data => console.log("server check ok", data))
    .catch(error => console.error("server check failed", error));
  }

  return (
      <section className={"debug-panel"}>
        <div>saved games {gameIds.map(gid => gid.gameId).join(",")}</div>
        <div>current game state started={gameStarted.toString()}</div>
        <div>
          <button onClick={() => checkServer()}>check server</button>
        </div>
      </section>
  );
}
