import {useAppSelector} from "../store/store.ts";
import {GameEndButton} from "./GameEndButton.tsx";

export function PlayerStatus() {
  const game = useAppSelector(state => state.gameSlice);

  return (
      <section className={"player-status"}>
        <div>game id: {game.gameId}</div>
        <div>lives: {game.lives}</div>
        <div>gold: {game.gold}</div>
        <div>level: {game.level}</div>
        <div>score: {game.score}</div>
        <div>high score: {game.highScore}</div>
        <div>turn: {game.turn}</div>
        <GameEndButton />
      </section>
  )
}
