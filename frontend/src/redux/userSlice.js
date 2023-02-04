// import { createSlice } from "@reduxjs/toolkit";

// const userSlide = createSlice({
//   name: "user",
//   initialState: {
//     users: {
//       allUsers: null,
//       isFetching: false,
//       error: false,
//     },
//   },
//   reducers: {
//     getUsersStart: (state) => {
//       state.users.isFetching = true
//     },
//     getUsersSuccess: (state, action) => {
//         state.users.isFetching = false
//         state.users.allUsers = action.payload
//     },
//     getUsersFailed: (state) => {
//         state.users.isFetching = false
//         state.users.error = true
//     }
//   },
// });
// export const {
//     getUsersStart,
//     getUsersSuccess,
//     getUsersFailed,
// } = userSlide.actions

// export default userSlide.reducer