import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useEffect, useState} from "react";
import {Quest} from "../etc/types.ts";
import {acceptQuest} from "../store/gameSlice.ts";

export function QuestList() {
  
  const gameId = useAppSelector(state => state.gameSlice.gameId);
  
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
  const dispatch = useAppDispatch();
  
  function onAcceptQuest(adId: string) {
    dispatch(acceptQuest(adId));
  }
  
  return (
    <details>
      <summary>quest: {quest.message}</summary>
      <div>reward: {quest.reward}</div>
      <div>expires: {quest.expiresIn}</div>
      <div>
        <button onClick={() => onAcceptQuest(quest.adId)}>accept</button>
      </div>
    </details>  
  );
}
