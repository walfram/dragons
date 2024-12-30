import {useEffect, useRef} from "react";

type GameStartErrorModalProps = {
  error: string;
}

export default function GameStartErrorModal({error}: GameStartErrorModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  function onCloseClick() {
    dialogRef.current?.close();
  }
  
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  
  return (
      <dialog aria-modal={true} ref={dialogRef}>
        <div>{error}</div>
        <button onClick={() => onCloseClick()}>close</button>
      </dialog>
  );
}
