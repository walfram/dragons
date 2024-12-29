import {QuestResponse} from "../../etc/types.ts";
import {useEffect, useRef} from "react";

type QuestResultDialogProps = {
  questResponse: QuestResponse;
}

export default function QuestResultDialog({questResponse}: QuestResultDialogProps) {

  const ref = useRef<HTMLDialogElement>(null);

  function closeDialog() {
    ref.current?.close();
  }

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
      <dialog aria-modal={true} ref={ref}>
        <div>quest result {questResponse.success}</div>
        <button onClick={() => closeDialog()}>close</button>
      </dialog>
  )
}
