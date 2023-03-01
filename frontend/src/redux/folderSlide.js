import { createSlice } from "@reduxjs/toolkit";

const folderSlide = createSlice({
  name: "folder",
  initialState: {
    getAll: {
      allFolder: null,
      isFetching: false,
      error: false,
    },
    folders: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    getFolderStart: (state) => {
      state.getAll.isFetching = true;
    },
    getFolderSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.allFolder = action.payload;
    },
    getFolderFailed: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    addFolderStart: (state) => {
      state.folders.isFetching = true;
      state.folders.success = false;
      state.folders.error = false;
    },
    addFolderSuccess: (state) => {
      state.folders.isFetching = false;
      state.folders.success = true;
      // state.add.error = false
    },
    addFolderFailed: (state) => {
      state.folders.isFetching = false;
      state.folders.error = true;
    },
    updateFolderStart: (state) => {
      state.folders.isFetching = true;
    },
    updateFolderSuccess: (state) => {
      state.folders.isFetching = false;
      state.folders.success = true;
    },
    updateFolderFailed: (state) => {
      state.folders.success = false;
      state.folders.error = true;
    },
    deleteFolderStart: (state) => {
      state.folders.isFetching = true;
    },
    deleteFolderSuccess: (state) => {
      state.folders.isFetching = false;
      state.folders.success = true;
    },
    deleteFolderFailed: (state) => {
      state.folders.success = false;
      state.folders.error = true;
    },
    addMemberStart: (state) => {
      state.folders.isFetching = true;
    },
    addMemberSuccess: (state) => {
      state.folders.isFetching = false;
      state.folders.success = true;
    },
    addMemnberFailed: (state) => {
      state.folders.success = false;
      state.folders.error = true;
    },
  },
});
export const {
  getFolderStart,
  getFolderSuccess,
  getFolderFailed,
  addFolderStart,
  addFolderSuccess,
  addFolderFailed,
  updateFolderStart,
  updateFolderSuccess,
  updateFolderFailed,
  deleteFolderStart,
  deleteFolderSuccess,
  deleteFolderFailed,
  addMemberStart,
  addMemberSuccess,
  addMemnberFailed,
} = folderSlide.actions;
export default folderSlide.reducer;
