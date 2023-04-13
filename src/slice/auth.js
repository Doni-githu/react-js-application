import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    error: null,
    isLoading: false,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        StartLogin: (state) => {
            state.isLoading = true
            state.error = null
        },
        SuccessLogin: (state, action) => {
            state.isLoading = false
            state.user = action.payload
            localStorage.setItem("token", action.payload.token)
            state.isLoggedIn = true
        },
        FailurLogin: (state, action) => {
            state.error = action.payload
        },
        StartRegister: (state) => {
            state.isLoading = true
            state.error = null
            state.user = null
        },
        SuccessRegister: (state, action) => {
            state.isLoading = false
            state.user = action.payload
            localStorage.setItem("token", action.payload.token)
            state.isLoggedIn = true
        },
        FailurRegister: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        getUserStart: (state) => {
            state.isLoading = true
            state.user = null
        },
        getUserSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.isLoggedIn = true
        },
        getUserFailur: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        getUserRemove: (state) => {
            state.isLoggedIn = false
            localStorage.removeItem("token")
        }
    }
})


export const { StartLogin, StartRegister, SuccessRegister, FailurLogin, FailurRegister, SuccessLogin, getUserStart, getUserSuccess, getUserFailur, getUserRemove } = authSlice.actions
export default authSlice.reducer