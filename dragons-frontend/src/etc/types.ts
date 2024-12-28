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

export type QuestResponse = {
  success: boolean;
  lives: number;
  gold: number;
  score: number;
  highScore: number;
  turn: number;
  message: string;
}

export type QuestId = {
  gameId: GameId;
  adId: string;
}

export type Product = {
  id: string;
  name: string;
  cost: string;
}

export type ProductId = {
  gameId: GameId;
  itemId: string;
}

export type PurchaseResponse = {
  // TODO this is string in docs, should report to docs team
  shoppingSuccess: boolean; 
  gold: number;
  lives: number;
  level: number;
  turn: number;
};

export type Reputation = {
  people: number;
  state: number;
  underworld: number;
}
