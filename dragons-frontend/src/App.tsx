import {StartGameButton} from "./components/StartGameButton.tsx";
import {PlayGamePage} from "./components/PlayGamePage.tsx";
import {useAppDispatch, useAppSelector} from "./store/store.ts";
import "./App.css";
import {GameId} from "./etc/types.ts";
import {checkGameIds} from "./store/savedGameSlice.ts";
import {Suspense} from "react";

function useSavedGameIds() {
  const item: string = localStorage.getItem("gameIds") || "";
  const gameIds: GameId[] = JSON.parse(item) || [];

  function saveGameIds(ids: GameId[]) {
    localStorage.setItem("gameIds", JSON.stringify(ids));
  }

  return {gameIds, saveGameIds};
}

function App() {
  console.log("rendering app");

  // TODO ping (fetch/OPTIONS) server?

  const {gameIds} = useSavedGameIds();
  const dispatch = useAppDispatch();
  dispatch(checkGameIds(gameIds));

  const checkingGameIds = useAppSelector(state => state.savedGameSlice.checkingGameIds);
  
  const gameStarted = useAppSelector(state => state.gameSlice.started);
  
  return (
      <Suspense fallback={"checking saved games..."}>
        {gameStarted && <PlayGamePage/>}
        {!gameStarted && <StartGameButton/>}
      </Suspense>
  )
}

export default App
