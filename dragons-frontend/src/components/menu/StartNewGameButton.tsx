import {useAppDispatch} from "../../store/store.ts";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";
import {saveGameId} from "../../store/savedGameSlice.ts";
import {startNewGame} from "../../store/gameStatusSlice.ts";

export default function StartNewGameButton() {
  const dispatch = useAppDispatch();

  function onClick() {
    console.log("starting new game");
    dispatch(showSpinner());

    dispatch(startNewGame())
    .unwrap()
    .then(startGameResponse => {
      console.log("started new game", startGameResponse);
      dispatch(saveGameId({gameId: startGameResponse.gameId}));
    })
    .catch(error => console.error("cannot start new game", error))
    .finally(() => dispatch(hideSpinner()));
  }

  return (
      <button onClick={() => onClick()}>start new game</button>
  )
}
