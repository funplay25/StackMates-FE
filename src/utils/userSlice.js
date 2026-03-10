import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload.data;
    },
    removeuser: () => {
      return null;
    },
  },
});

export const { addUser, removeuser } = userSlice.actions;
export default userSlice.reducer;
