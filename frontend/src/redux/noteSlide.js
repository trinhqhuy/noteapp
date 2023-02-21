import { createSlice } from "@reduxjs/toolkit";

const noteSlide = createSlice({
  name: "note",
  initialState: {
    readAll: {
      listNote: null,
      isFetching: false,
      error: false,
    },
    notes: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    readAllNotesStart: (state) => {
      state.readAll.isFetching = true;
    },
    readAllNotesSuccess: (state, action) => {
      state.readAll.isFetching = false;
      state.readAll.listNote = action.payload;
    },
    readAllNotesFailed: (state) => {
      state.readAll.isFetching = false;
      state.readAll.error = true;
    },
    addNoteStart: (state) => {
      state.notes.isFetching = true;
    },
    addNoteSuccess: (state) => {
      state.notes.isFetching = false;
      state.notes.success = true;
    },
    addNoteFailed: (state) => {
      state.notes.isFetching = false;
      state.notes.error = true;
    },
    updateNoteStart: (state) => {
      state.notes.isFetching = true;
    },
    updateNoteSuccess: (state) => {
      state.notes.isFetching = false;
      state.notes.success = true;
      state.notes.error = false;
    },
    updateNoteFailed: (state) => {
      state.notes.success = false;
      state.notes.error = true;
    },
    deleteNoteStart: (state) => {
      state.notes.isFetching = true;
    },
    deleteNoteSuccess: (state) => {
      state.notes.isFetching = false;
      state.notes.success = true;
    },
    deleteNoteFailed: (state) => {
      state.notes.success = false;
      state.notes.error = true;
    },
  },
});

export const {
  readAllNotesStart,
  readAllNotesSuccess,
  readAllNotesFailed,
  addNoteStart,
  addNoteSuccess,
  addNoteFailed,
  updateNoteStart,
  updateNoteSuccess,
  updateNoteFailed,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailed,
} = noteSlide.actions;

export default noteSlide.reducer;
