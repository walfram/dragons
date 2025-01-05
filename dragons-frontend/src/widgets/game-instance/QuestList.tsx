import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import QuestCard from "./QuestCard.tsx";
import {fetchQuests} from "../../store/gameInstanceSlice.ts";
import styles from "./QuestList.module.css";
import {hideSpinner, showSpinner} from "../../store/spinnerSlice.ts";

export default function QuestList() {
  const gameId = useAppSelector(state => state.gameInstance.gameId);
  const quests = [...useAppSelector(state => state.gameInstance.quests)];
  
  console.log("quests", quests);
  const dispatch = useAppDispatch();

  function onRefreshQuestsClick() {
    dispatch(showSpinner());
    
    dispatch(fetchQuests(gameId!))
    .unwrap()
    .finally(() => dispatch(hideSpinner()));
  }

  return (
      <section className={styles["quest-list"]}>
        <h5>quests <button onClick={() => onRefreshQuestsClick()}>refresh</button></h5>
        {quests.sort((l, r) => Number(l.reward) - Number(r.reward))
        .map(quest => <QuestCard key={`quest-card-${quest.adId}`} quest={quest}/>)}
      </section>
  )
}
