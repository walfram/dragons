import {Product} from "../../etc/types.ts";
import {useEffect, useRef} from "react";

type ProductDetailsDialogProps = {
  product: Product;
  onAccept: () => void;
  onCancel: () => void;
}

export default function ProductDetailsDialog({product, onAccept, onCancel}: ProductDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  function onCancelBuyClick() {
    dialogRef.current?.close();
    onCancel();
  }

  function onConfirmBuyClick() {
    dialogRef.current?.close();
    onAccept();
  }

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
      <dialog aria-modal={true} ref={dialogRef}>
        <h5>Buy item</h5>
        <div>{product.name}</div>
        <div>{product.cost}</div>
        <button onClick={() => onCancelBuyClick()}>cancel</button>
        <button onClick={() => onConfirmBuyClick()}>buy</button>
      </dialog>
  );
}
