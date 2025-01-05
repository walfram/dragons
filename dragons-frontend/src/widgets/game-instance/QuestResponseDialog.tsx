import {QuestResponse} from "../../etc/types.ts";
import ModalDialog from "../common/ModalDialog.tsx";

type QuestResponseDialogProps = {
  questResponse: QuestResponse;
  onClose: () => void;
}

export default function QuestResponseDialog({questResponse, onClose}: QuestResponseDialogProps) {
  return (
      <ModalDialog closeCallback={onClose}>
        <h3>quest success: {questResponse.success.toString()}</h3>
        <div>{questResponse.message}</div>
        
        <div className={"dialog-buttons"}>
          <button onClick={() => onClose()} className={"close"}>close</button>
        </div>
      </ModalDialog>
)
}
