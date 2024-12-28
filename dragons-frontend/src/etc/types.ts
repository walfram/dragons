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

export type ShopItem = {
  id: string;
  name: string;
  cost: string;
}

export type ItemId = {
  gameId: GameId;
  itemId: string;
}

export type PurchaseResponse = {
  // TODO check if this is actually boolean - checked, it is boolean, error in docs
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
