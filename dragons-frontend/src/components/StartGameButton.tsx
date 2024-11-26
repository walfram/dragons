import React from "react";
import {useAppDispatch} from "../store/store.ts";
import {startNewGame} from "../store/gameSlice.ts";
import "./StartGameButton.css";

export function StartGameButton() {

  const dispatch = useAppDispatch();

  function onStartNewGameClick(event: React.MouseEvent) {
    event.preventDefault();
    dispatch(startNewGame());
  }

  return (
      <div className={"start-game-button-wrap"}>
        <button onClick={onStartNewGameClick}>start new game</button>
      </div>
  );
}
