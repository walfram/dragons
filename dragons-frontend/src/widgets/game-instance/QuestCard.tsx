import {Quest, QuestResponse} from "../../etc/types.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {acceptQuest, fetchQuests} from "../../store/gameInstanceSlice.ts";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";
import {useState} from "react";
import QuestResponseDialog from "./QuestResponseDialog.tsx";
import QuestDetailsDialog from "./QuestDetailsDialog.tsx";
import styles from "./QuestList.module.css";

type QuestCardProps = {
  quest: Quest;
}

export default function QuestCard({quest}: QuestCardProps) {
  const dispatch = useAppDispatch();
  const gameId = useAppSelector(state => state.gameInstance.gameId);

  const [questResponse, setQuestResponse] = useState<QuestResponse | null>(null);
  const [questDetailsDialog, setQuestDetailsDialog] = useState<boolean>(false);

  function onAcceptQuestClick(quest: Quest) {
    console.log("accepting quest", quest);

    dispatch(showSpinner());

    dispatch(acceptQuest({gameId: gameId!, adId: quest.adId}))
    .unwrap()
    .then(questResponse => {
      console.log("quest response", questResponse);
      setQuestResponse(questResponse);
      setQuestDetailsDialog(false);
    })
    .finally(() => dispatch(hideSpinner()));
  }

  function onQuestResponseClose() {
    setQuestResponse(null);
    dispatch(fetchQuests(gameId!));
  }
  
  const probability = questProbability(quest);
  const message = questMessage(quest);

  return (
      <div className={styles["quest-card"]}>
        <button onClick={() => setQuestDetailsDialog(true)} className={`${styles["task-button"]} ${quest.encrypted ? styles["encrypted"] : ""}`}>
          <span className={styles[probabilityToClassName(probability)]}>{probability}</span>: {message}
        </button>
        {questDetailsDialog && <QuestDetailsDialog
            quest={quest}
            onCancelQuest={() => setQuestDetailsDialog(false)}
            onAcceptQuest={() => onAcceptQuestClick(quest)}/>
        }
        {questResponse && <QuestResponseDialog
            questResponse={questResponse}
            onClose={() => onQuestResponseClose()}/>
        }
      </div>
  );
}

function questMessage(quest: Quest) {
  switch(quest.encrypted) {
    case 1: return atob(quest.message);
    case 2: return rot13(quest.message);
    default: return quest.message;
  }
}

function questProbability(quest: Quest) {
  switch (quest.encrypted) {
    case 1 : return atob(quest.probability);
    case 2 : return rot13(quest.probability);
    default: return quest.probability;
  }
}

function rot13(str: string) {
  return str.split("")
  .map(char => String.fromCharCode(char.charCodeAt(0) + (char.toLowerCase() < "n" ? 13 : -13)))
  .join("");
}

function probabilityToClassName(probability: string) {
  return probability.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
}
