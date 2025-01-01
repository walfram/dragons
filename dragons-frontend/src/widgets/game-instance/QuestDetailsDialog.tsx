import {Quest} from "../../etc/types.ts";
import {useEffect, useRef} from "react";

type QuestDetailsDialogProps = {
  quest: Quest;
  onCancelQuest: () => void;
  onAcceptQuest: () => void;
}

export default function QuestDetailsDialog({quest, onCancelQuest, onAcceptQuest}: QuestDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  
  function onCancelClick() {
    dialogRef.current?.close();
    onCancelQuest();
  }
  
  return (
      <dialog aria-modal={true} ref={dialogRef}>
        <h5>{quest.message}</h5>
        <div>reward: {quest.reward}</div>
        <div>probability: {quest.probability}</div>
        <button onClick={() => onCancelClick()}>cancel</button>
        <button onClick={() => onAcceptQuest()}>accept</button>
      </dialog>
  )
}
