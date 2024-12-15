import {GameStartButton} from "./GameStartButton.tsx";
import {GameContinueButton} from "./GameContinueButton.tsx";
import {savedGameIds} from "../etc/saved-games.ts";

export function SelectGamePage() {
  const gameIds = savedGameIds();

  return (
      <section className={"select-game-buttons-wrap"}>
        
        <GameStartButton />
        
        {
          gameIds.map((gameId) => <GameContinueButton gameId={gameId} key={`start-game-${gameId}`}/>)
        }

      </section>
  );
}
