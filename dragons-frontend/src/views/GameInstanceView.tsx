import GameState from "../widgets/game-instance/GameState.tsx";
import QuestList from "../widgets/game-instance/QuestList.tsx";
import ProductList from "../widgets/game-instance/ProductList.tsx";
import PlayerReputation from "../widgets/game-instance/PlayerReputation.tsx";

export default function GameInstanceView() {
  return (
      <div className={"content-wrap"}>
        <header className={"boxed"}>
          <GameState/>
          <PlayerReputation />
        </header>
        <main className={"boxed"}>
          <QuestList/>
        </main>
        <aside className={"boxed"}>
          <ProductList/>
        </aside>
        <footer className={"boxed"}>
          Scripting Adventure: Dragons of Mugloar
        </footer>
      </div>
  );
}
