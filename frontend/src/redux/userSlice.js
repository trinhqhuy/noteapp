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
    updateUserStart: (state) => {
      state.users.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.user = null;
      state.users.message = action.payload;
    },
    updateUserFailed: (state) => {
      state.users.error = false;
    },
  },
});
export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = userSlide.actions;

export default userSlide.reducer;
