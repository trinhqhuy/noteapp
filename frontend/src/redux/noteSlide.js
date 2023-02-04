import { createSlice } from "@reduxjs/toolkit";

const noteSlide = createSlice({
  name: "notes",
  initialState: {
    readAll: {
      listNote: null,
      isFetching: false,
      error: false,
    },
    add: {
      isFetching: false,
      success: false,
      error: false,
    },
    
  },
  reducers: {
    readAllNotesStart: (state) => {
      state.readAll.isFetching = true
    },
    readAllNotesSuccess: (state, action) => {
      state.readAll.isFetching = false
      state.readAll.listNote = action.payload

    },
    readAllNotesFailed: (state) => {
      state.readAll.isFetching = false
      state.readAll.error = true
    },
    addNoteStart: (state) => {
      state.add.isFetching = true
    },
    addNoteSuccess: (state) => {
      state.add.isFetching = false
      state.add.success = true
    },
    addNoteFailed: (state) => {
      state.add.isFetching = false
      state.add.error = true
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
} = noteSlide.actions;

export default noteSlide.reducer;
