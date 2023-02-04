import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        }, 
        register: {
            currentUser: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false
            state.register.currentUser = action.payload
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
        }
    }
})
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed
} = authSlice.actions
export default authSlice.reducer