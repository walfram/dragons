import {GameInstance} from "../../etc/types.ts";
import {useAppDispatch} from "../../store/store.ts";
import {fetchQuests, startGame} from "../../store/gameInstanceSlice.ts";

export default function NewGameButton() {
  const dispatch = useAppDispatch();

  function onStartNewGameClick() {
    console.log("onStartNewGameClick");

    fetch("https://dragonsofmugloar.com/api/v2/game/start", {method: "post"})
    .then(response => response.json())
    .then(data => {
      const instance = data as GameInstance;
      console.log("game instance", instance);
      window.history.replaceState(null, "", `?gameId=${instance.gameId}`);
      dispatch(startGame(instance));
      dispatch(fetchQuests(instance.gameId!));
    })
    .catch(error => console.error(error));
  }

  return (
      <button onClick={() => onStartNewGameClick()}>start new game</button>
  );
}
