import {Quest, QuestResponse} from "../../etc/types.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {acceptQuest, fetchQuests} from "../../store/gameInstanceSlice.ts";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";
import {useState} from "react";
import QuestResponseDialog from "./QuestResponseDialog.tsx";

type QuestCardProps = {
  quest: Quest;
}

export default function QuestCard({quest}: QuestCardProps) {
  const dispatch = useAppDispatch();
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  const [questResponse, setQuestResponse] = useState<QuestResponse | null>(null);

  function onAcceptQuestClick(quest: Quest) {
    console.log("accepting quest", quest);
    
    dispatch(showSpinner());
    
    dispatch(acceptQuest({gameId: gameId!, adId: quest.adId}))
    .unwrap()
    .then(questResponse => {
      console.log("quest response", questResponse);
      setQuestResponse(questResponse);
      // TODO dispatch refresh quests
      dispatch(fetchQuests(gameId!));
    })
    .finally(() => dispatch(hideSpinner()));
  }

  // TODO handle quest.encrypted
  return (
      <div>
        <div>{quest.message}</div>
        <div>{quest.probability}</div>
        <div>{quest.reward}</div>
        <button onClick={() => onAcceptQuestClick(quest)}>accept</button>
        {questResponse && <QuestResponseDialog questResponse={questResponse} onClose={() => setQuestResponse(null)}/>}
      </div>
  );
}
