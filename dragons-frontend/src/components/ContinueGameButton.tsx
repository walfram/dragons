import {GameId} from "../etc/types.ts";
import {useAppDispatch} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";
import {delay} from "../etc/debug.ts";

export default function ContinueGameButton({gameId} : {gameId: GameId}) {
  const dispatch = useAppDispatch();
  
  async function onClick() {
    console.log("continue game", gameId);
    dispatch(showSpinner());

    await delay(3000);

    dispatch(hideSpinner());
  }
  
  return (
      <button onClick={() => onClick()}>continue game {gameId.gameId}</button>
  );
}
