import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null,
    error: null,
    isLoading: false,
    detail: false
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
        },
        StartGetDetailPost: (state) => {
            state.isLoading = true
        },
        SuccessGetDetailPost: (state, { payload }) => {
            state.isLoading = false
            state.detail = payload
        },
        StartDelete: (state) => {
            state.isLoading = true
        },
        SuccessDelete: (state) => {
            state.isLoading = false
        },
    }
})

export const {
    StartPost,
    SuccessPost,
    FailurPost,
    StartGetAllPost,
    SuccessGetAllPost,
    FailurGetAllPost,
    StartGetDetailPost,
    SuccessGetDetailPost,
    StartDelete,
    SuccessDelete
} = postSlice.actions
export default postSlice.reducer