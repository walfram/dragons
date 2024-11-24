import {useAppSelector} from "../store/store.ts";

export function DebugInfo() {
  const gameId = useAppSelector(state => state.gameState.game.gameId);
  
  return (
      <section>
        <div>gameId: {gameId}</div>
      </section>
  );
}
