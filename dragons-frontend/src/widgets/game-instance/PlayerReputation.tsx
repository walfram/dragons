import {useEffect, useState} from "react";
import {useAppSelector} from "../../store/store.ts";
import {Reputation} from "../../etc/types.ts";

export default function PlayerReputation() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  const turn = useAppSelector(state => state.gameInstance.gameState.turn);

  const [reputation, setReputation] = useState<Reputation>({people: 0, underworld: 0, state: 0});

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId!}/investigate/reputation`, {method: "post"})
    .then(response => response.json())
    .then(data => setReputation(data as Reputation));
  }, [gameId, turn]);

  return (
      <section className={"reputation"}>
        <h5>Reputation</h5>
        <div>people: {reputation.people}</div>
        <div>state: {reputation.state}</div>
        <div>underworld: {reputation.underworld}</div>
      </section>
  )
}
