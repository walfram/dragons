import {Quest} from "../../../etc/types.ts";
import {decodeMessage, decodeProbability} from "../../../etc/decode.ts";
import ModalDialog from "../../common/ModalDialog.tsx";

type QuestDetailsDialogProps = {
  quest: Quest;
  onCancelQuest: () => void;
  onAcceptQuest: () => void;
}

export default function QuestDetailsDialog({quest, onCancelQuest, onAcceptQuest}: QuestDetailsDialogProps) {
  return (
      <ModalDialog closeCallback={onCancelQuest}>
        <h3>{decodeMessage(quest)}</h3>

        <div>probability: {decodeProbability(quest)}</div>
        <div>reward: {quest.reward}</div>
        
        <div className={"dialog-buttons"}>
          <button onClick={() => onCancelQuest()} className={"cancel"}>cancel</button>
          <button onClick={() => onAcceptQuest()} className={"accept"}>accept</button>
        </div>
      </ModalDialog>
  )
}
