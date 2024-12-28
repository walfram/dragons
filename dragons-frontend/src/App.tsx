import DebugPanel from "./components/DebugPanel.tsx";
import {useAppSelector} from "./store/store.ts";
import {isGameStarted} from "./store/gameStatusSlice.ts";
import SelectGameView from "./components/menu/SelectGameView.tsx";
import GameMainView from "./components/game/GameMainView.tsx";
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
