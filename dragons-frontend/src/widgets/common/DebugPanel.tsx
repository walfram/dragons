import {useAppDispatch} from "../../store/store.ts";
import {useState} from "react";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";

export default function DebugPanel() {
  const dispatch = useAppDispatch();

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
  
  function resetGame() {
    console.log("resetting game");
    window.location.href = "/";
  }
  
  return (
      <section className={"debug-panel"}>
        <div>
          <button onClick={() => checkServer()}>check server</button>
          {serverCheckStatus}
        </div>
        <div>
          <button onClick={() => resetGame()}>reset game</button>
        </div>
      </section>
  );
}
