import React from "react";
import {useAppDispatch} from "../store/store.ts";
import {endGame} from "../store/gameSlice.ts";

export function GameEndButton() {
  
  const dispatch = useAppDispatch();
  
  function onGameEndClick(event: React.MouseEvent) {
    event.preventDefault();
    dispatch(endGame());
  }
  
  return (
      <button onClick={onGameEndClick}>end game</button>  
  );
}
