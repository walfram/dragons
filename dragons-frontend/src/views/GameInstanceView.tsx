import GameState from "../widgets/game/GameState.tsx";
import QuestList from "../widgets/game/quest/QuestList.tsx";
import ProductList from "../widgets/game/product/ProductList.tsx";
import PlayerReputation from "../widgets/game/PlayerReputation.tsx";
import {useAppSelector} from "../store/store.ts";
import GameOverView from "./GameOverView.tsx";

export default function GameInstanceView() {
  const gameOver = useAppSelector(state => state.gameInstance.gameOver);

  return (
      <div className={"content-wrap"}>
        <header className={"boxed"}>
          <GameState/>
          <PlayerReputation/>
        </header>

        {gameOver && <GameOverView/>}

        {!gameOver && <main className={"boxed"}>
          <QuestList/>
        </main>}
        
        {!gameOver && <aside className={"boxed"}>
          <ProductList/>
        </aside>}

        <footer className={"boxed"}>
          Scripting Adventure: Dragons of Mugloar
        </footer>
      </div>
  );
}
