import React from "react";
import {useAppDispatch} from "../store/store.ts";
import {startNewGame} from "../store/gameStateSlice.ts";

export function StartGameButton() {
  
  const dispatch = useAppDispatch();
  
  function onStartNewGameClick(event: React.MouseEvent) {
    event.preventDefault();
    dispatch(startNewGame());
  }
  
  return (
      <button onClick={onStartNewGameClick}>start new game</button>
  );
}
