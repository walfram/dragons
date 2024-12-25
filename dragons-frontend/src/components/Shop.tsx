import {useEffect, useState} from "react";
import {ShopItem} from "../etc/types.ts";
import ShopListItem from "./ShopListItem.tsx";
import {useGameId} from "../etc/hooks.ts";

export default function Shop() {
  const gameId = useGameId();

  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameId?.gameId}/shop`)
    .then(response => response.json())
    .then(data => setShopItems(data as ShopItem[]));
  }, [gameId]);

  return (
      <section>
        <h5>Shop</h5>
        {shopItems.map(shopItem => <ShopListItem key={shopItem.id} shopItem={shopItem}/>)}
      </section>
  )
}
