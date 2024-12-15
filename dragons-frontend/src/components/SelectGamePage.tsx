import {useSavedGameIds} from "../etc/hooks.ts";
import {GameStartButton} from "./GameStartButton.tsx";
import {GameContinueButton} from "./GameContinueButton.tsx";

export function SelectGamePage() {
  const {gameIds} = useSavedGameIds();

  return (
      <section>
        
        <GameStartButton />
        
        {
          gameIds.map((gameId) => <GameContinueButton gameId={gameId} key={`start-game-${gameId}`}/>)
        }

      </section>
  );
}
