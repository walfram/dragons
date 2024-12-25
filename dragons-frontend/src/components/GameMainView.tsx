import PlayerReputation from "./PlayerReputation.tsx";
import QuestList from "./QuestList.tsx";
import Shop from "./Shop.tsx";
import {useGameId} from "../etc/hooks.ts";

export default function GameMainView() {
  const gameId = useGameId();

  return (
      <section>
        <div>GameMainView {gameId?.gameId}</div>
        <PlayerReputation />
        <QuestList />
        <Shop />
      </section>
  );
}
