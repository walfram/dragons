import {delay} from "../etc/debug.ts";
import {useAppDispatch} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";

export default function StartNewGameButton() {
  const dispatch = useAppDispatch();
  
  async function onClick() {
    console.log("starting new game");
    dispatch(showSpinner());
    await delay(3000);
    dispatch(hideSpinner());
  }
  
  return (
      <button onClick={() => onClick()}>start new game</button>
  )
}
