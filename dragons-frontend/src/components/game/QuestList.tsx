import {GameId, Quest} from "../../etc/types.ts";
import QuestCard from "./QuestCard.tsx";
import {useEffect, useState} from "react";
import {useGameId} from "../../etc/hooks.ts";

function useQuests(gameId: GameId | null): Quest[] {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId?.gameId}/messages`)
    .then(response => response.json())
    .then(data => setQuests(data as Quest[]));
  });

  return quests;
}

export default function QuestList() {
  const gameId = useGameId();

  // const dispatch = useAppDispatch();
  // const [quests, setQuests] = useState<Quest[]>([]);

  // useEffect(() => {
  //   fetch(`https://dragonsofmugloar.com/api/v2/${gameId?.gameId}/messages`)
  //   .then(response => response.json())
  //   .then(data => setQuests(data as Quest[]));
  // }, [gameId]);

  const quests = useQuests(gameId);

  return (
      <section>
        <h5>QuestList</h5>
        {quests.map(quest => <QuestCard key={quest.adId} quest={quest}/>)}
      </section>
  )
}
