import { createSlice } from "@reduxjs/toolkit";

const notificationSlide = createSlice({
  name: "notifications",
  initialState: {
    notifications: {
      all: null,
      isFetching: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    getAllNotifiStart: (state) => {
      state.notifications.isFetching = true;
    },
    getAllNotifiSuccess: (state, action) => {
      state.notifications.isFetching = false;
      state.notifications.all = action.payload;
    },
    getAllNotifiFailed: (state) => {
      state.notifications.error = true;
    },
    updateNotificationStart: (state) => {
      state.notifications.isFetching = true;
    },
    updateNotificationSuccess: (state, action) => {
      state.notifications.isFetching = false;
      state.notifications.message = action.payload;
    },
    updateNotificationFailed: (state) => {
      state.notifications.error = true;
    },
  },
});
export const {
  getAllNotifiStart,
  getAllNotifiSuccess,
  getAllNotifiFailed,
  updateNotificationStart,
  updateNotificationSuccess,
  updateNotificationFailed,
} = notificationSlide.actions;
export default notificationSlide.reducer;
