import {GameId} from "../etc/types.ts";
import {useEffect, useRef} from "react";
import {useAppDispatch} from "../store/store.ts";
import {removeGameId} from "../store/savedGameSlice.ts";

export function DeleteSavedGameDialog({gameId, show}: { gameId: GameId, show: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispatch();
  
  function onDeleteGame() {
    console.log("delete saved game", gameId);
    // TODO dispatch or invoke callback
    dispatch(removeGameId(gameId));
  }

  function onCancel() {
    dialogRef.current?.close();
  }
  
  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    }
  }, [show]);

  return (
      <dialog aria-modal={true} ref={dialogRef}>
        Remove saved game id={gameId.gameId}?
        <button onClick={() => onDeleteGame()}>delete</button>
        <button onClick={() => onCancel()}>cancel</button>
      </dialog>
  )
}
