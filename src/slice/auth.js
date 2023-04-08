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
        SuccessLogin: (state, paylaod) => {
            state.isLoading = false
            state.user = paylaod
            state.isLoggedIn = true
        },
        FailurLogin: (state, paylaod) => {
            state.error = paylaod
        },
        StartRegister: (state) => {
            state.isLoading = true
            state.error = null
            state.user = null
        },
        SuccessRegister: (state, paylaod) => {
            state.isLoading = false
            state.user = paylaod
            state.isLoggedIn = true
        },
        FailurRegister: (state, paylaod) => {
            state.error = paylaod
            state.isLoading = false
        },
    }
})


export const { StartLogin, StartRegister, SuccessRegister, FailurLogin, FailurRegister, SuccessLogin } = authSlice.actions
export default authSlice.reducer