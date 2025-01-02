import GameState from "../widgets/game-instance/GameState.tsx";
import QuestList from "../widgets/game-instance/QuestList.tsx";
import {useAppSelector} from "../store/store.ts";
import ProductList from "../widgets/game-instance/ProductList.tsx";
import PlayerReputation from "../widgets/game-instance/PlayerReputation.tsx";

export default function GameInstanceView() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);

  return (
      <div className={"content-wrap"}>
        <header className={"boxed"}>
          <h3>game instance view {gameId}</h3>
          <GameState/>
        </header>
        <main className={"boxed"}>
          <QuestList/>
        </main>
        <aside className={"boxed"}>
          <ProductList/>
        </aside>
        <footer className={"boxed"}>
          <PlayerReputation />
        </footer>
      </div>
  );
}
