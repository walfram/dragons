import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameInstance, Quest, QuestId, QuestResponse} from "../etc/types.ts";

const initialGameInstance: GameInstance = {
  gameId: gameIdFromUrl(),
  gameState: {
    gold: 0,
    highScore: 0,
    level: 0,
    lives: 0,
    score: 0,
    turn: 0
  },
  quests: []
}

export const gameInstanceSlice = createSlice({
  name: "gameInstanceSlice",
  initialState: initialGameInstance,
  reducers: {
    startGame: (_state, action: PayloadAction<GameInstance>) => {
      return {...action.payload}
    }
  },
  extraReducers: builder => {
    builder.addCase(acceptQuest.fulfilled, (state, action: PayloadAction<QuestResponse>) => {
      if (action.payload.success) {
        state.gameState = {
          ...state.gameState,
          ...action.payload
        }
      }
    });

    builder.addCase(fetchQuests.fulfilled, (state, action: PayloadAction<Quest[]>) => {
      state.quests = action.payload;
    });
  }
});

export const {
  startGame
} = gameInstanceSlice.actions;

function gameIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const gameId = searchParams.get("gameId");
  console.log("### gameId", gameId);
  return gameId;
}

export const fetchQuests = createAsyncThunk(
    "fetchQuests",
    async (gameId: string) => fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    .then(response => response.json())
    .then(data => data as Quest[])
);

export const acceptQuest = createAsyncThunk(
    "acceptQuest",
    async (questId: QuestId) => fetch(`https://dragonsofmugloar.com/api/v2/${questId.gameId}/solve/${questId.adId}`)
    .then(response => response.json())
    .then(data => data as QuestResponse)
)
