import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Quest} from "../etc/types.ts";

type QuestState = {
  quests: Quest[];
  loading: boolean;
}

const initialQuestState: QuestState = {
  quests: [],
  loading: false
}

export const questSlice = createSlice({
  name: "questSlice",
  initialState: initialQuestState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchQuests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuests.rejected, (state) => {
      state.loading = false;
      state.quests = [];
    });
    builder.addCase(fetchQuests.fulfilled, (state, action: PayloadAction<Quest[]>) => {
      state.loading = false;
      state.quests = action.payload;
    })
  }
});

export const fetchQuests = createAsyncThunk(
    "fetchQuests",
    async (gameId: string) => fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    .then(response => response.json())
    .then(data => data as Quest[])
);
