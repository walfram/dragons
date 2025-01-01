import {useAppDispatch} from "../../store/store.ts";
import {fetchQuests, startGame} from "../../store/gameInstanceSlice.ts";

export default function NewGameButton() {
  const dispatch = useAppDispatch();

  function onStartNewGameClick() {
    console.log("onStartNewGameClick");
    dispatch(startGame())
    .unwrap()
    .then(gameStartResponse => {
      window.history.replaceState(null, "", `?gameId=${gameStartResponse.gameId}`);
      return gameStartResponse;
    })
    .then(gameStartResponse => dispatch(fetchQuests(gameStartResponse.gameId!)));
  }

  return (
      <button onClick={() => onStartNewGameClick()}>start new game</button>
  );
}
