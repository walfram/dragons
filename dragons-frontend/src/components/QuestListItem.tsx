import {Quest} from "../etc/types.ts";

type QuestListItemProps = {
  quest: Quest;
}

export default function QuestListItem({quest}: QuestListItemProps) {
  return (
      <div>
        <div>{quest.message}</div>
        <div>probability: {quest.probability}</div>
        <div>reward: {quest.reward}</div>
        <div>expires: {quest.expiresIn}</div>
      </div>
  )
}
