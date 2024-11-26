export type GameState = {
  lives: number;
  gold: number;
  level: number;
  score: number;
  highScore: number;
  turn: number;
};

export type GameId = {
  gameId: string;
}

export type StartGameResponse = GameId & GameState;

export type Quest = {
  adId: string;
  message: string;
  reward: string;
  expiresIn: number;
  encrypted: string;
  probability: string;
}

export type QuestResult = {
  // success: boolean;
  lives: number;
  gold: number;
  score: number;
  highScore: number;
  turn: number;
  message: String;
}

export type ShopItem = {
  id: string;
  name: string;
  cost: string;
}

export type Reputation = {
  people: number;
  state: number;
  underworld: number;
}
