import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload.data;
    },
    removeRequest: (state, action) => {
      const filterArr = state.filter(
        (req) => req._id !== action.payload.data._id,
      );
      return filterArr;
    },
    clearRequests: (state, action) => {
      return null;
    },
  },
});

export const { addRequests, removeRequest, clearRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
