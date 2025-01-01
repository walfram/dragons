import {QuestResponse} from "../../etc/types.ts";
import {useEffect, useRef} from "react";

type QuestResponseDialogProps = {
  questResponse: QuestResponse;
  onClose: () => void;
}

export default function QuestResponseDialog({questResponse, onClose}: QuestResponseDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function onCloseDialog() {
    dialogRef.current?.close();
    onClose();
  }

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
      <dialog aria-modal={true} ref={dialogRef}>
        <h5>quest success: {questResponse.success.toString()}</h5>
        <div>{questResponse.message}</div>
        <button onClick={() => onCloseDialog()}>close</button>
      </dialog>
  )
}
