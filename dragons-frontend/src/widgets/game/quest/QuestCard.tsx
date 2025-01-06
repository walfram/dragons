import {Quest, QuestResponse} from "../../../etc/types.ts";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {acceptQuest, fetchQuests} from "../../../store/gameInstanceSlice.ts";
import {hideSpinner, showSpinner} from "../../../store/spinnerSlice.ts";
import {useState} from "react";
import QuestResponseDialog from "./QuestResponseDialog.tsx";
import QuestDetailsDialog from "./QuestDetailsDialog.tsx";
import styles from "./QuestList.module.css";
import {decodeMessage, decodeProbability, decodeQuestId} from "../../../etc/decode.ts";

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

    dispatch(acceptQuest({gameId: gameId!, adId: decodeQuestId(quest)}))
    .unwrap()
    .then(questResponse => {
      console.log("quest response", questResponse);
      setQuestResponse(questResponse);
      setQuestDetailsDialog(false);
    })
    .catch(error => { 
      console.log(error);
      setQuestDetailsDialog(false);
      // TODO network error dialog
    })
    .finally(() => dispatch(hideSpinner()));
  }

  function onQuestResponseClose() {
    setQuestResponse(null);
    dispatch(fetchQuests(gameId!));
  }

  const probability = decodeProbability(quest);
  const message = decodeMessage(quest);

  return (
      <>
        <div className={styles["quest-card"]}>
          <button onClick={() => setQuestDetailsDialog(true)}
                  className={`${styles["task-button"]} ${quest.encrypted ? styles["encrypted"] : ""}`}>
            <span className={styles[probabilityToClassName(probability)]}>{probability}</span>: {message}
          </button>
        </div>
        
        {questDetailsDialog && <QuestDetailsDialog
            quest={quest}
            onCancelQuest={() => setQuestDetailsDialog(false)}
            onAcceptQuest={() => onAcceptQuestClick(quest)}/>
        }
        
        {questResponse && <QuestResponseDialog
            questResponse={questResponse}
            onClose={() => onQuestResponseClose()}/>
        }
      </>
  );
}

function probabilityToClassName(probability: string) {
  return probability.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
}
