import {endGame, isGameStarted} from "../store/gameStatusSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {GameId} from "../etc/types.ts";
import {useState} from "react";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";

export default function DebugPanel() {
  const dispatch = useAppDispatch();

  const gameStarted = useAppSelector(isGameStarted);
  const gameIds: GameId[] = useAppSelector(state => state.savedGameSlice.gameIds);

  const [serverCheckStatus, setServerCheckStatus] = useState<string>("not checked");

  function checkServer() {
    dispatch(showSpinner());

    fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "options"})
    .then(response => response.text())
    .then(data => {
      console.log("server check ok", data);
      setServerCheckStatus(`checked OK, ${new Date().toISOString()}`);
    })
    .catch(error => {
      console.error("server check failed", error);
      setServerCheckStatus(`check FAILED, ${new Date().toISOString()}`);
    })
    .finally(() => dispatch(hideSpinner()));
  }
  
  function endCurrentGame() {
    dispatch(endGame());
  }

  return (
      <section className={"debug-panel"}>
        <div>saved games {gameIds.map(gid => gid.gameId).join(",")}</div>
        <div>current game state started={gameStarted.toString()}</div>
        <div>
          <button onClick={() => checkServer()}>check server</button>
          {serverCheckStatus}
        </div>
        {gameStarted && <div>
          <button onClick={() => endCurrentGame()}>end current game</button>
        </div>}
      </section>
  );
}
