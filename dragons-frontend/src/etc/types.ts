export type GameState = {
  lives: number;
  gold: number;
  level: number;
  score: number;
  highScore: number;
  turn: number;
};

export type GameStartResponse = GameState & {
  gameId: string;
}

export type GameInstance = {
  gameId: string | null;
  gameState: GameState;
  quests: Quest[];
  gameOver: boolean;
}

export type Quest = {
  adId: string;
  message: string;
  reward: string;
  expiresIn: number;
  encrypted: number;
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
  gameId: string;
  adId: string;
}

export type Product = {
  id: string;
  name: string;
  cost: string;
}

export type ProductId = {
  gameId: string;
  itemId: string;
}

export type PurchaseResponse = {
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
