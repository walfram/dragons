import {ShopItem} from "../etc/types.ts";

type ShopListItemProps = {
  shopItem: ShopItem;
}

export default function ShopListItem({shopItem}: ShopListItemProps) {
  return (
      <div>
        <div>{shopItem.name}</div>
        <div>{shopItem.cost}</div>
      </div>
  )
}
