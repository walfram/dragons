import DebugPanel from "./components/DebugPanel.tsx";
import {useAppSelector} from "./store/store.ts";
import {isGameStarted} from "./store/gameStatusSlice.ts";
import SelectGameView from "./components/SelectGameView.tsx";
import GameMainView from "./components/GameMainView.tsx";
import Spinner from "./components/Spinner.tsx";

export default function App() {
  console.log("rendering app");

  const gameStarted = useAppSelector(isGameStarted);
  
  return (
      <>
        <DebugPanel />

        {!gameStarted && <SelectGameView />}
        {gameStarted && <GameMainView />}
        
        <Spinner />
      </>
  );
}
