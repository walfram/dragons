import GameState from "../widgets/game-instance/GameState.tsx";
import QuestList from "../widgets/game-instance/QuestList.tsx";
import {useAppSelector} from "../store/store.ts";

export default function GameInstanceView() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  
  return (
    <section>
      <h3>game instance view {gameId}</h3>
      <GameState />
      <QuestList />
    </section>  
  );
}