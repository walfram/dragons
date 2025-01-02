import {Product} from "../../etc/types.ts";

type ProductCardProps = {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  return (
      <div>
        <div>{product.name}</div>
        <div>{product.cost}</div>
      </div>
  );
}
