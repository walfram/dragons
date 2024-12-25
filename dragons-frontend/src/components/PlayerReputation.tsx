import {useAppSelector} from "../store/store.ts";
import {useEffect, useState} from "react";
import {Reputation} from "../etc/types.ts";

export default function PlayerReputation() {
  const gameId = useAppSelector(state => state.gameSlice.gameId);

  const [reputation, setReputation] = useState<Reputation>({people: 0, state: 0, underworld: 0});

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/investigate/reputation`)
    .then(response => response.json())
    .then(data => setReputation(data as Reputation));
  }, [gameId]);

  return (
      <section>
        <h5>Reputation</h5>
        <div>people: {reputation.people}</div>
        <div>state: {reputation.state}</div>
        <div>underworld: {reputation.underworld}</div>
      </section>
  );
}