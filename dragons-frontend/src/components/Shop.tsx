import {ShopItem} from "../etc/types.ts";
import {useEffect, useState} from "react";
import {useAppSelector} from "../store/store.ts";

export function Shop() {

  const gameId = useAppSelector(state => state.gameSlice.gameId);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  function fetchShopItems() {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/shop`)
    .then(response => response.json())
    .then(data => setShopItems(data as ShopItem[]))
  }

  useEffect(() => {
    fetchShopItems();
  }, []);

  return (
      <section>
        <div>shop <button onClick={fetchShopItems}>refresh</button></div>
        {shopItems.map(shopItem => <ShopProduct key={shopItem.id} shopItem={shopItem}/>)}
      </section>
  );
}

function ShopProduct({shopItem}: { shopItem: ShopItem }) {
  return (
      <details>
        <summary>{shopItem.name}</summary>
        <div>price: {shopItem.cost}</div>
        <div>
          <button>buy</button>
        </div>
      </details>
  );
}
