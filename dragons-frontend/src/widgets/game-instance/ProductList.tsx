import {useAppSelector} from "../../store/store.ts";
import {Product} from "../../etc/types.ts";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const gameId = useAppSelector(state => state.gameInstance.gameId);

  const [loading, setLoading] = useState<boolean>(true);
  
  function onRefreshShopClick() {
    setLoading(true);
    fetchProducts(gameId!);
  }

  function fetchProducts(gameId: string) {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/shop`)
    .then(response => response.json())
    .then(data => setProducts(data as Product[]))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    fetchProducts(gameId!)
  }, [gameId]);

  return (
      <section>
        <h5>Shop <button onClick={() => onRefreshShopClick()}>refresh</button></h5>
        {loading && <div>loading</div>}
        {!loading && products.map(product => <ProductCard key={`product-${product.id}`} product={product}/>)}
      </section>
  );
}
