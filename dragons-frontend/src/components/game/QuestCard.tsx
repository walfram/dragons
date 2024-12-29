import {Quest, QuestResponse} from "../../etc/types.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";
import {acceptQuest} from "../../store/gameInstanceSlice.ts";
import {useState} from "react";
import QuestResultDialog from "./QuestResultDialog.tsx";

type QuestListItemProps = {
  quest: Quest;
}

export default function QuestCard({quest}: QuestListItemProps) {
  const dispatch = useAppDispatch();
  const gameId = useAppSelector(state => state.gameStatusSlice.gameId);

  // TODO show result message using useRef and useEffect?
  const [questResponse, setQuestResponse] = useState<QuestResponse | null>(null);

  // TODO show modal with "accept" button?
  function onQuestAcceptClick() {
    dispatch(showSpinner());
    dispatch(acceptQuest({gameId: gameId!, adId: quest.adId}))
    .unwrap()
    .then(questResponse => {
      console.log("quest result", questResponse);
      setQuestResponse(questResponse);
    })
    .finally(() => dispatch(hideSpinner()));
  }

  return (
      <div>
        <div>{quest.message}</div>
        <div>probability: {quest.probability}</div>
        <div>reward: {quest.reward}</div>
        <div>expires: {quest.expiresIn}</div>
        <button onClick={() => onQuestAcceptClick()}>accept quest</button>
        {questResponse && <QuestResultDialog questResponse={questResponse}/>}
      </div>
  )
}
