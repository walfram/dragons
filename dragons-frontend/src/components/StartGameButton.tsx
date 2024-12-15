type StartGameButtonProps = {
  onStartGame: (gameStarted: boolean) => void;
}

export function StartGameButton({onStartGame}: StartGameButtonProps) {
  return (
      <button onClick={() => onStartGame(true)}>start new game</button>
  );
}
