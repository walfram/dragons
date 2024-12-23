import {useAppDispatch} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";
import {StartGameResponse} from "../etc/types.ts";
import {saveGameId} from "../store/savedGameSlice.ts";

function startNewGame() {
  return fetch(`https://dragonsofmugloar.com/api/v2/game/start`, {method: "post"})
  .then(response => {
    console.log("start new game response.ok", response.ok);
    console.log("start new game response.status", response.status);
    return response;
  });
}

export default function StartNewGameButton() {
  const dispatch = useAppDispatch();

  function onClick() {
    console.log("starting new game");
    dispatch(showSpinner());

    startNewGame()
    .then(response => response.json())
    .then(data => {
      const startGameResponse = data as StartGameResponse;
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
