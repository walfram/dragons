import {PlayGamePage} from "./components/PlayGamePage.tsx";
import {useAppDispatch, useAppSelector} from "./store/store.ts";
import "./App.css";
import {checkGameIds} from "./store/savedGameSlice.ts";
import {useSavedGameIds} from "./etc/hooks.ts";
import {SelectGamePage} from "./components/SelectGamePage.tsx";

function App() {
  console.log("rendering app");

  // TODO ping (fetch/OPTIONS) server?

  const {gameIds} = useSavedGameIds();
  const dispatch = useAppDispatch();
  dispatch(checkGameIds(gameIds));

  const gameStarted = useAppSelector(state => state.gameSlice.started);

  return (
      <>
        {gameStarted && <PlayGamePage/>}
        {!gameStarted && <SelectGamePage />}
      </>
  );
}

export default App
