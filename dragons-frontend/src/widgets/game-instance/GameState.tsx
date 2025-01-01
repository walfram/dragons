import {useAppSelector} from "../../store/store.ts";

export default function GameState() {
  const gameState = useAppSelector(state => state.gameInstance.gameState);

  return (
      <section>
        <h5>gam state</h5>
        <div>turn: {gameState.turn}</div>
        <div>lives: {gameState.lives}</div>
        <div>gold: {gameState.gold}</div>
        <div>score: {gameState.score}</div>
        <div>high score: {gameState.highScore}</div>
        <div>level: {gameState.level}</div>
      </section>
  )
}
