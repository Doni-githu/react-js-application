import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null,
    error: null,
    isLoading: false,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        StartPost: (state) => {
            state.isLoading = true
        },
        SuccessPost: (state, { payload }) => {
            state.data = payload
            state.isLoading = false
        },
        FailurPost: (state, { payload }) => {
            state.error = payload
            state.isLoading = false
        },
        StartGetAllPost: (state) => {
            state.isLoading = true
        },
        SuccessGetAllPost: (state, { payload }) => {
            state.isLoading = false
            state.data = payload
        },
        FailurGetAllPost: (state) => {
            state.isLoading = false
        }
    }
})

export const { StartPost, SuccessPost, FailurPost, StartGetAllPost, SuccessGetAllPost, FailurGetAllPost} = postSlice.actions
export default postSlice.reducer