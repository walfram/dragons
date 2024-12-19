export default function StartNewGameButton() {
  function onClick() {
    console.log("starting new game");
  }
  
  return (
      <button onClick={() => onClick()}>start new game</button>
  )
}
