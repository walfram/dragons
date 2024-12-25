import {useAppSelector} from "../store/store.ts";
import {useEffect, useState} from "react";
import {Quest} from "../etc/types.ts";
import QuestListItem from "./QuestListItem.tsx";

export default function QuestList() {
  const gameId = useAppSelector(state => state.gameSlice.gameId);

  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    .then(response => response.json())
    .then(data => setQuests(data as Quest[]));
  }, [gameId]);

  return (
      <section>
        <h5>QuestList</h5>
        {quests.map(quest => <QuestListItem key={quest.adId} quest={quest}/>)}
      </section>
  )
}
