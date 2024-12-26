import {GameState} from "../etc/types.ts";
import {useAppSelector} from "../store/store.ts";

export default function PlayerStatus() {
  const gameInstance : GameState = useAppSelector(state => state.gameInstanceSlice);
  
  return (
      <section>
        <h5>player status</h5>
        <div>turn: {gameInstance.turn}</div>
        <div>level: {gameInstance.level}</div>
        <div>gold: {gameInstance.gold}</div>
        <div>lives: {gameInstance.lives}</div>
        <div>score: {gameInstance.score}</div>
        <div>high score: {gameInstance.highScore}</div>
      </section>
  )
}
