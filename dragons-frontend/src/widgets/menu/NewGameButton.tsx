import {useAppDispatch} from "../../store/store.ts";
import {fetchQuests, startGame} from "../../store/gameInstanceSlice.ts";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";

export default function NewGameButton() {
  const dispatch = useAppDispatch();

  function onStartNewGameClick() {
    console.log("onStartNewGameClick");
    dispatch(showSpinner());
    dispatch(startGame())
    .unwrap()
    .then(gameStartResponse => {
      window.history.replaceState(null, "", `?gameId=${gameStartResponse.gameId}`);
      return gameStartResponse;
    })
    .then(gameStartResponse => dispatch(fetchQuests(gameStartResponse.gameId!)))
    .finally(() => dispatch(hideSpinner()));
  }

  return (
      <button onClick={() => onStartNewGameClick()}>start new game</button>
  );
}
