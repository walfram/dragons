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

  // TODO handle quest.encrypted
  return (
      <div className={styles["quest-card"]}>
        <button onClick={() => setQuestDetailsDialog(true)} className={styles["task-button"]}>
          <span className={styles[probabilityToClassName(quest.probability)]}>{quest.probability}</span>: {quest.message}
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

function probabilityToClassName(probability: string) {
  return probability.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
}
