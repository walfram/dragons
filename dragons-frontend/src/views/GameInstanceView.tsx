import GameState from "../widgets/game-instance/GameState.tsx";
import QuestList from "../widgets/game-instance/QuestList.tsx";
import {useAppSelector} from "../store/store.ts";
import ProductList from "../widgets/game-instance/ProductList.tsx";
import PlayerReputation from "../widgets/game-instance/PlayerReputation.tsx";

export default function GameInstanceView() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);

  return (
      <div className={"content-wrap"}>
        <header>
          <h3>game instance view {gameId}</h3>
          <GameState/>
        </header>
        <main>
          <QuestList/>
        </main>
        <aside>
          <ProductList/>
        </aside>
        <footer>
          <PlayerReputation />
        </footer>
      </div>
  );
}
