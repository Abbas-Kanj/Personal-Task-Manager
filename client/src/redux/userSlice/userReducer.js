import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    boards: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
});

export const { setUser, setBoards } = userSlice.actions;

export default userSlice.reducer;
