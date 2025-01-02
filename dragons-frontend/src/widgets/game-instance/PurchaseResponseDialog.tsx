import {PurchaseResponse} from "../../etc/types.ts";
import {useEffect, useRef} from "react";

type PurchaseResponseDialogProps = {
  purchaseResponse: PurchaseResponse;
  onClose: () => void;
}

export default function PurchaseResponseDialog({purchaseResponse, onClose}: PurchaseResponseDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  function onCloseClick() {
    dialogRef.current?.close();
    onClose();
  }
  
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  
  return (
      <dialog aria-modal={true} ref={dialogRef}>
        <h5>buy item success: {purchaseResponse.shoppingSuccess.toString()}</h5>
        <button onClick={() => onCloseClick()}>close</button>
      </dialog>
  );
}
