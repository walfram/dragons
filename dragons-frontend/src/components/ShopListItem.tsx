import {ShopItem} from "../etc/types.ts";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";
import {purchaseItem} from "../store/gameInstanceSlice.ts";

type ShopListItemProps = {
  shopItem: ShopItem;
}

export default function ShopListItem({shopItem}: ShopListItemProps) {
  const dispatch = useAppDispatch();
  const gameId = useAppSelector(state => state.gameStatusSlice.gameId);

  function onPurchaseItem() {
    dispatch(showSpinner());

    dispatch(purchaseItem({gameId: gameId!, itemId: shopItem.id}))
    .unwrap()
    .then(purchaseResponse => {
      console.log("purchase response", purchaseResponse);
      // TODO show purchase result as dialog/modal
      if (purchaseResponse.shoppingSuccess) {
        // 
      } else {
        
      }
    })
    .finally(() => dispatch(hideSpinner()));
  }

  return (
      <div>
        <div>{shopItem.name}</div>
        <div>{shopItem.cost}</div>
        <button onClick={() => onPurchaseItem()}>buy</button>
      </div>
  )
}
