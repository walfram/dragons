import {QuestList} from "./QuestList.tsx";
import {Shop} from "./Shop.tsx";
import {PlayerStatus} from "./PlayerStatus.tsx";
import './PlayGamePage.css';
import {DebugInfo} from "./DebugInfo.tsx";

export function PlayGamePage() {
  console.log("PlayGamePage rendered");

  return (
      <>
        <header>
          <PlayerStatus/>
        </header>

        <div className={"content-wrapper"}>
          <aside>
            <Shop/>
          </aside>

          <main>
            <QuestList/>
          </main>
        </div>

        <footer>
          <DebugInfo/>
        </footer>
      </>
  );
}
