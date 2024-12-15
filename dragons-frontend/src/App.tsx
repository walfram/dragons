import {useState} from 'react'
import './App.css'
import {StartGameButton} from "./components/StartGameButton.tsx";
import {PlayGamePage} from "./components/PlayGamePage.tsx";

function App() {
  console.log("rendering app");
  
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <>
      {gameStarted && <PlayGamePage />}
      {!gameStarted && <StartGameButton onStartGame={setGameStarted} />}
    </>
  )
}

export default App
