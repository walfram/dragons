import {PlayGamePage} from "./components/PlayGamePage.tsx";
import {useAppSelector} from "./store/store.ts";
import "./App.css";
import {SelectGamePage} from "./components/SelectGamePage.tsx";

function App() {
  console.log("rendering app");

  // TODO ping (fetch/OPTIONS) server?

  const gameStarted = useAppSelector(state => state.gameSlice.started);

  return (
      <>
        {gameStarted && <PlayGamePage/>}
        {!gameStarted && <SelectGamePage />}
      </>
  );
}

export default App
