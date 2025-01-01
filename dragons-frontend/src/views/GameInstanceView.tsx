import GameState from "../widgets/game-instance/GameState.tsx";
import QuestList from "../widgets/game-instance/QuestList.tsx";

export default function GameInstanceView() {
  return (
    <section>
      <h3>game instance view</h3>
      <GameState />
      <QuestList />
    </section>  
  );
}
