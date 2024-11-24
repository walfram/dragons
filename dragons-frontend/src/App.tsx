import {StartGameButton} from "./components/StartGameButton.tsx";
import {PlayGamePage} from "./components/PlayGamePage.tsx";
import {useAppSelector} from "./store/store.ts";

function App() {
  console.log("rendering app");
  
  // TODO ping (fetch/OPTIONS) server?
  
  const gameStarted = useAppSelector(state => state.gameState.started);

  return (
    <>
      {gameStarted && <PlayGamePage />}
      {!gameStarted && <StartGameButton />}
    </>
  )
}

export default App
