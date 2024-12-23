import {GameId} from "../etc/types.ts";
import {useAppDispatch} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";
import {DeleteSavedGameDialog} from "./DeleteSaveGameDialog.tsx";
import {useState} from "react";
import {checkGameIsValid} from "../store/savedGameSlice.ts";

// function checkGameIsValid(gameId: GameId): Promise<Response> {
//   return fetch(`https://dragonsofmugloar.com/api/v2/${gameId.gameId}/investigate/reputation`, {method: "post"})
//   .then(response => {
//     console.log("response.ok", response.ok);
//     console.log("response.status", response.status);
//     return response;
//   });
// }

type ContinueGameButtonProps = { 
  gameId: GameId, 
}

export default function ContinueGameButton({gameId}: ContinueGameButtonProps) {
  const dispatch = useAppDispatch();

  const [isValidGame, setIsValidGame] = useState<boolean>(true);
  
  function onClick() {
    console.log("continue game", gameId);
    dispatch(showSpinner());

    dispatch(checkGameIsValid(gameId))
    .unwrap()
    .then(isValid => {
        console.log("game is valid");
        setIsValidGame(isValid);
    })
    .catch(error => {
      console.error("invalid game id", error);
      setIsValidGame(false);
    })
    .finally(() => dispatch(hideSpinner()))
  }

  return (
      <>
        <button onClick={() => onClick()}>continue game {gameId.gameId}</button>
        <DeleteSavedGameDialog gameId={gameId} show={!isValidGame} />
      </>
  );
}
