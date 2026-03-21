import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { data: [], page: 1 },
  reducers: {
    addFeed: (state, action) => {
      state.data.push(...action.payload.data);
    },
    removeFeed: (state) => {
      state.data = [];
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { addFeed, removeFeed, incrementPage } = feedSlice.actions;

export default feedSlice.reducer;
