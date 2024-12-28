import {useEffect, useState} from "react";
import {Product} from "../etc/types.ts";
import ProductCard from "./ProductCard.tsx";
import {useGameId} from "../etc/hooks.ts";

export default function Shop() {
  const gameId = useGameId();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId?.gameId}/shop`)
    .then(response => response.json())
    .then(data => setProducts(data as Product[]));
  }, [gameId]);

  return (
      <section>
        <h5>Shop</h5>
        {products.map(shopItem => <ProductCard key={shopItem.id} shopItem={shopItem}/>)}
      </section>
  )
}
