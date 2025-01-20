import DebugPanel from "./widgets/common/DebugPanel.tsx";
import Spinner from "./widgets/common/Spinner.tsx";
import GameInstanceView from "./views/GameInstanceView.tsx";
import SelectGameView from "./views/SelectGameView.tsx";
import {useAppSelector} from "./store/store.ts";

export default function App() {
  console.log("rendering app");

  const gameId = useAppSelector(state => state.gameInstance.gameId);
  console.log("using game id", gameId);

  return (
      <>
        <DebugPanel/>

        {gameId && <GameInstanceView/>}
        {!gameId && <SelectGameView/>}

        <Spinner/>
      </>
  );
}
