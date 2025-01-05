import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {Reputation} from "../../etc/types.ts";
import styles from "./PlayerReputation.module.css";
import {gameOver} from "../../store/gameInstanceSlice.ts";

export default function PlayerReputation() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  const turn = useAppSelector(state => state.gameInstance.gameState.turn);

  const [reputation, setReputation] = useState<Reputation>({people: 0, underworld: 0, state: 0});
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId!}/investigate/reputation`, {method: "post"})
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        return Promise.reject(response.status);
      }
    })
    .then(data => setReputation(data as Reputation))
    .catch(error => {
      console.log("error", error);
      if (error === 410) {
        dispatch(gameOver());
      }
    });
  }, [dispatch, gameId, turn]);

  return (
      <section className={styles["reputation"]}>
        <h4>Reputation</h4>
        <div>people: {reputation.people.toFixed(1)}</div>
        <div>state: {reputation.state.toFixed(1)}</div>
        <div>underworld: {reputation.underworld.toFixed(1)}</div>
      </section>
  )
}
