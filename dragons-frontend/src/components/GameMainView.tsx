import {useAppSelector} from "../store/store.ts";
import Reputation from "./Reputation.tsx";
import QuestList from "./QuestList.tsx";
import Shop from "./Shop.tsx";

export default function GameMainView() {
  const gameId = useAppSelector(state => state.gameSlice.gameId);

  return (
      <section>
        <div>GameMainView {gameId?.gameId}</div>
        <Reputation />
        <QuestList />
        <Shop />
      </section>
  );
}
