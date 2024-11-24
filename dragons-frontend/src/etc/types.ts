// returned by POST https://dragonsofmugloar.com/api/v2/game/start
export type StartGameResponse = {
  gameId: string;
  lives: number;
  gold: number;
  level: number;
  score: number;
  highScore: number;
  turn: number;
}

// returned by POST https://dragonsofmugloar.com/api/v2/:gameId/investigate/reputation
export type Reputation = {
  people: number;
  state: number;
  underworld: number;
}

// returned by GET https://dragonsofmugloar.com/api/v2/:gameId/messages
// Quest[]
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
  message: String;
}

export type ShopItem = {
  id: string;
  name: string;
  cost: string;
}
