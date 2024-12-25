import {useAppSelector} from "../store/store.ts";
import PlayerReputation from "./PlayerReputation.tsx";
import QuestList from "./QuestList.tsx";
import Shop from "./Shop.tsx";

export default function GameMainView() {
  const gameId = useAppSelector(state => state.gameSlice.gameId);

  return (
      <section>
        <div>GameMainView {gameId?.gameId}</div>
        <PlayerReputation />
        <QuestList />
        <Shop />
      </section>
  );
}
