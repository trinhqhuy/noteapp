import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice({
  name: "user",
  initialState: {
    users: {
      user: null,
      isFetching: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state) => {
      state.users.isFetching = false;
      // state.users.user = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
  },
});
export const { getUsersStart, getUsersSuccess, getUsersFailed } =
  userSlide.actions;

export default userSlide.reducer;
