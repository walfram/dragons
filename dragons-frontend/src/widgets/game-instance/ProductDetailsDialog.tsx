import {Product} from "../../etc/types.ts";
import ModalDialog from "../common/ModalDialog.tsx";

type ProductDetailsDialogProps = {
  product: Product;
  onAccept: () => void;
  onCancel: () => void;
}

export default function ProductDetailsDialog({product, onAccept, onCancel}: ProductDetailsDialogProps) {
  return (
      <ModalDialog closeCallback={onCancel}>
        <h5>Buy item</h5>
        <div>{product.name}</div>
        <div>{product.cost}</div>
        
        <div className={"dialog-buttons"}>
          <button className={"cancel"} onClick={() => onCancel()}>cancel</button>
          <button className={"accept"} onClick={() => onAccept()}>buy</button>
        </div>
      </ModalDialog>
  );
}
