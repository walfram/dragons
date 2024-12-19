import {GameId} from "../etc/types.ts";
import {useAppDispatch} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";

function checkGameIsValid(gameId: GameId): Promise<Response> {
  return fetch(`https://dragonsofmugloar.com/api/v2/${gameId.gameId}/investigate/reputation`, {method: "post"})
  .then(response => {
    console.log("response.ok", response.ok);
    console.log("response.status", response.status);
    return response;
  });
}

export default function ContinueGameButton({gameId}: { gameId: GameId }) {
  const dispatch = useAppDispatch();

  function onClick() {
    console.log("continue game", gameId);
    dispatch(showSpinner());

    checkGameIsValid(gameId)
    .then(response => {
      console.log("game is valid");
      return response.json();
    })
    .catch(error => console.error("invalid game id", error))
    .finally(() => dispatch(hideSpinner()))
  }

  return (
      <button onClick={() => onClick()}>continue game {gameId.gameId}</button>
  );
}
