import { createSlice } from "@reduxjs/toolkit";

const memberSlide = createSlice({
  name: "members",
  initialState: {
    members: {
      all: null,
      isFetching: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    getAllMemberStart: (state) => {
      state.members.isFetching = true;
    },
    getAllMemberSuccess: (state, action) => {
      state.members.isFetching = false;
      state.members.all = action.payload;
    },
    getAllMemberFailed: (state) => {
      state.members.error = true;
    },
    deleteMemberStart: (state) => {
      state.members.isFetching = true;
    },
    deleteMemberSuccess: (state, action) => {
      state.members.isFetching = false;
      state.members.message = action.payload;
    },
    deleteMemberFailed: (state) => {
      state.members.error = true;
    },
    leaveGroupStart: (state) => {
      state.members.isFetching = true;
    },
    leaveGroupSuccess: (state, action) => {
      state.members.isFetching = false;
      state.members.message = action.payload;
    },
    leaveGroupFailed: (state) => {
      state.members.error = true;
    },
  },
});
export const {
  getAllMemberStart,
  getAllMemberSuccess,
  getAllMemberFailed,
  deleteMemberStart,
  deleteMemberSuccess,
  deleteMemberFailed,
  leaveGroupStart,
  leaveGroupSuccess,
  leaveGroupFailed,
} = memberSlide.actions;
export default memberSlide.reducer;
