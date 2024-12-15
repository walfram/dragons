import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useEffect} from "react";
import {Quest} from "../etc/types.ts";

import {fetchQuests} from "../store/questSlice.ts";

export function QuestList() {
  console.log("QuestList rendered");

  const gameId = useAppSelector(state => state.gameSlice.gameId);
  const quests: Quest[] = useAppSelector(state => state.questSlice.quests);
  const loading = useAppSelector(state => state.questSlice.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuests(gameId));
  }, []);

  return (
      <>
        {loading && <section>loading...</section>}
        {!loading && <section>
          <div>quest list <button onClick={() => dispatch(fetchQuests(gameId))}>refresh</button></div>
          <div className={"quest-cards"}>
            {quests.map(quest => <QuestCard key={quest.adId} quest={quest}/>)}
          </div>
        </section>}
      </>
  );
}

function QuestCard({quest}: { quest: Quest }) {
  return (
      <div className={"quest-card"}>
        <div>{quest.message}</div>
        <div>{quest.probability}</div>
      </div>
  );
}
