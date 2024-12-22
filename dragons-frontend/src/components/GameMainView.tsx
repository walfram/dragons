import {useAppSelector} from "../store/store.ts";

export default function GameMainView() {
  const gameId = useAppSelector(state => state.gameSlice.gameId);
  
  return (
    <div>GameMainView {gameId?.gameId}</div>  
  );
}
