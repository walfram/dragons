import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import styles from "./PlayerReputation.module.css";
import {investigateReputation} from "../../store/gameInstanceSlice.ts";

export default function PlayerReputation() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  const dispatch = useAppDispatch();
  
  const reputation = useAppSelector(state => state.gameInstance.reputation);

  function onInvestigationClick() {
    dispatch(investigateReputation(gameId!));
  }

  return (
      <section className={styles["reputation"]}>
        <h4>Reputation <button onClick={() => onInvestigationClick()}>investigate</button></h4>
        <div>people: {reputation.people.toFixed(1)}</div>
        <div>state: {reputation.state.toFixed(1)}</div>
        <div>underworld: {reputation.underworld.toFixed(1)}</div>
      </section>
  )
}
