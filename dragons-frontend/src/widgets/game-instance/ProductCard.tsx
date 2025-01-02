import {Product} from "../../etc/types.ts";
import {useState} from "react";
import ProductDetailsDialog from "./ProductDetailsDialog.tsx";

type ProductCardProps = {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  const [productPopup, setProductPopup] = useState<boolean>(false);

  function onBuyClick() {
    setProductPopup(true);
  }

  return (
      <div>
        <div>{product.name}</div>
        <div>{product.cost}</div>
        <button onClick={() => onBuyClick()}>view</button>
        {productPopup && <ProductDetailsDialog product={product} onClose={() => setProductPopup(false)}/>}
      </div>
  );
}
