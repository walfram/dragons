import {GameId} from "../etc/types.ts";
import ContinueGameButton from "./ContinueGameButton.tsx";
import StartNewGameButton from "./StartNewGameButton.tsx";
import {useAppSelector} from "../store/store.ts";

export default function SelectGameView() {
  const gameIds: GameId[] = useAppSelector(state => state.savedGameSlice.gameIds);

  return (
      <section>
        <div>SelectGameView</div>
        <div>

          <div>
            <StartNewGameButton/>
          </div>
          
          {gameIds.map(gameId =>
              <div key={`continue-${gameId.gameId}`}>
                <ContinueGameButton gameId={gameId}/>
              </div>)}

        </div>

      </section>
  );
}
