import { createSlice } from "@reduxjs/toolkit"

const folderSlide = createSlice({
    name: "folders",
    initialState: {
        getAll: {
            allFolder: null,
            isFetching: false,
            error: false,
        },
        add: {
            isFetching: false,
            success: false,
            error: false,
        }
    },
    reducers: {
        getFolderStart: (state) =>  {
            state.getAll.isFetching = true
        },
        getFolderSuccess: (state, action) => {
            state.getAll.isFetching = false
            state.getAll.allFolder = action.payload
        },
        getFolderFailed: (state) => {
            state.getAll.isFetching = false
            state.getAll.error = true
        },
        addFolderStart: (state) => {
            state.add.isFetching = true
            state.add.success = false
            state.add.error = false
        },
        addFolderSuccess: (state) => {
            state.add.isFetching = false
            state.add.success = true
            // state.add.error = false
        },
        addFolderFailed: (state) => {
            state.add.isFetching = false
            state.add.error = true
        }
    }
})
export const {
    getFolderStart,
    getFolderSuccess,
    getFolderFailed,
    addFolderStart,
    addFolderSuccess,
    addFolderFailed
} = folderSlide.actions
export default folderSlide.reducer