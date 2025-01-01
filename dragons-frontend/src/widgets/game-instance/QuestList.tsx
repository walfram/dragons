import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import QuestCard from "./QuestCard.tsx";
import {fetchQuests} from "../../store/gameInstanceSlice.ts";

export default function QuestList() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  const quests = useAppSelector(state => state.gameInstance.quests);
  const dispatch = useAppDispatch();

  function onRefreshQuestsClick() {
    dispatch(fetchQuests(gameId!));
  }

  return (
      <section>
        <h5>quests <button onClick={() => onRefreshQuestsClick()}>refresh</button></h5>
        {quests.sort((l, r) => Number(l.reward) - Number(r.reward))
        .map(quest => <QuestCard key={`quest-card-${quest.adId}`} quest={quest}/>)}
      </section>
  )
}
