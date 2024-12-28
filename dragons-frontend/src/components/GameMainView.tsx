import PlayerStats from "./PlayerStats.tsx";
import QuestList from "./QuestList.tsx";
import Shop from "./Shop.tsx";
import {useGameId} from "../etc/hooks.ts";
import PlayerStatus from "./PlayerStatus.tsx";

export default function GameMainView() {
  const gameId = useGameId();

  return (
      <section>
        <div>GameMainView {gameId?.gameId}</div>
        <PlayerStatus />
        <PlayerStats />
        <QuestList />
        <Shop />
      </section>
  );
}
