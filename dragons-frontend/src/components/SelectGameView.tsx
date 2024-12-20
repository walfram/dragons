import {GameId} from "../etc/types.ts";
import {savedGameIds} from "../etc/saveGame.ts";
import ContinueGameButton from "./ContinueGameButton.tsx";
import StartNewGameButton from "./StartNewGameButton.tsx";

export default function SelectGameView() {
  const gameIds: GameId[] = savedGameIds();

  return (
      <section>
        <div>SelectGameView</div>
        <div>

          <div><StartNewGameButton/></div>
          {gameIds.map(gameId =>
              <div key={`continue-${gameId.gameId}`}>
                <ContinueGameButton gameId={gameId}/>
              </div>)}

        </div>

      </section>
  );
}
