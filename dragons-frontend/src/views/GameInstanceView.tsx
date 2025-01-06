import GameState from "../widgets/game/GameState.tsx";
import QuestList from "../widgets/game/quest/QuestList.tsx";
import ProductList from "../widgets/game/product/ProductList.tsx";
import PlayerReputation from "../widgets/game/PlayerReputation.tsx";

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
