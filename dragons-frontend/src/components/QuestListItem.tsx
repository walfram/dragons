import {Quest} from "../etc/types.ts";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {hideSpinner, showSpinner} from "../store/spinnerSlice.ts";
import {acceptQuest} from "../store/gameInstanceSlice.ts";

type QuestListItemProps = {
  quest: Quest;
}

export default function QuestListItem({quest}: QuestListItemProps) {
  const dispatch = useAppDispatch();
  const gameId = useAppSelector(state => state.gameStatusSlice.gameId);

  function onQuestAcceptClick() {
    dispatch(showSpinner());
    dispatch(acceptQuest({gameId: gameId!, adId: quest.adId}))
    .unwrap()
    .then(questResult => {
      console.log("quest result", questResult);
      // TODO add dialog with quest results?
      // show questResult.message
    })
    .finally(() => dispatch(hideSpinner()));
  }

  return (
      <div>
        <div>{quest.message}</div>
        <div>probability: {quest.probability}</div>
        <div>reward: {quest.reward}</div>
        <div>expires: {quest.expiresIn}</div>
        <button onClick={() => onQuestAcceptClick()}>accept quest</button>
      </div>
  )
}
