import {useAppSelector} from "../store/store.ts";
import {useEffect, useState} from "react";
import {Quest} from "../etc/types.ts";

export function QuestList() {
  
  const gameId = useAppSelector(state => state.gameState.game.gameId);
  
  const [quests, setQuests] = useState<Quest[]>([]);
  
  function fetchQuests() {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    .then(response => response.json())
    .then(data => setQuests(data as Quest[]));
  }
  
  useEffect(() => {
    fetchQuests();
  }, []);
  
  return (
      <section>
        <div>quest list <button onClick={fetchQuests}>refresh</button></div>
        {quests.map(quest => <QuestItem key={quest.adId} quest={quest} />)}
      </section>
  );
}

function QuestItem({quest} : {quest: Quest}) {
  return (
    <details>
      <summary>quest: {quest.message}</summary>
      <div>reward: {quest.reward}</div>
      <div>expires: {quest.expiresIn}</div>
      <div><button>accept</button></div>
    </details>  
  );
}
