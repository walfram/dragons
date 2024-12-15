import {GameId} from "../etc/types.ts";
import React from "react";
import {useAppDispatch} from "../store/store.ts";
import {continueGame} from "../store/savedGameSlice.ts";

export function GameContinueButton({gameId} : {gameId: GameId}) {
  
  const dispatch = useAppDispatch();
  
  function onContinueGameClick(event : React.MouseEvent) {
    event.preventDefault();
    dispatch(continueGame(gameId));
  }
  
  return (
      <div className={"continue-game-button-wrap"}>
        <button onClick={onContinueGameClick}>start new game</button>
      </div>
  );
}
