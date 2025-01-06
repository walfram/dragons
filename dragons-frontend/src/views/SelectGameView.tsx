import NewGameButton from "../widgets/menu/NewGameButton.tsx";

export default function SelectGameView() {
  return (
    <section className={"boxed mr ml"}>
      <h5>select game view</h5>
      
      <div>
        <NewGameButton />
      </div>
      
      <div>
        <p>TODO saved games...?</p>
        <p>there is no endpoint for "get current game state by game id". saved game can be only "fetched" after quest accept and item purchase</p>
        <p>at the moment only reasonable way to handle saved game is to persist (localStorage or smth) game state on quest/purchase</p>
      </div>
      
    </section>  
  );
}
