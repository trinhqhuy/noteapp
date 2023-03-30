import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      message: "",
    },
    register: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.currentUser = action.payload;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    signOutStart: (state) => {
      state.login.isFetching = true;
    },
    signOutSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.message = action.payload;
    },
    signOutFailed: (state) => {
      state.login.error = true;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} = authSlice.actions;
export default authSlice.reducer;
