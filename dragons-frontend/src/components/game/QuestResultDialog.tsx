import {QuestResponse} from "../../etc/types.ts";
import {useEffect, useRef} from "react";

type QuestResultDialogProps = {
  questResponse: QuestResponse;
  onClose: () => void;
}

export default function QuestResultDialog({questResponse, onClose}: QuestResultDialogProps) {

  const ref = useRef<HTMLDialogElement>(null);

  function closeDialog() {
    ref.current?.close();
    onClose();
  }

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
      <dialog aria-modal={true} ref={ref}>
        <div>quest result {questResponse.success.toString()}</div>
        <button onClick={() => closeDialog()}>close</button>
      </dialog>
  )
}
