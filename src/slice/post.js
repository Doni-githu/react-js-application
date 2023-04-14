import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null,
    error: null,
    isLoading: false,
    detail: false,
    comments: null,
    message: null
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
            state.detail = null
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
        StartCommented: (state) => {
            state.isLoading = true
        },
        SuccessCommented: (state, { payload }) => {
            state.isLoading = false
            state.comments = payload
        },
        FailurCommented: (state) => {
            state.isLoading = false
        },
        StartEdit: (state) => {
            state.isLoading = true
        },
        SuccessEdit: (state, { payload }) => {
            state.isLoading = false
            state.message = payload
        },
        FailurEdit: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        }
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
    SuccessDelete,
    StartCommented,
    SuccessCommented,
    FailurCommented,
    StartEdit,
    SuccessEdit,
    FailurEdit
} = postSlice.actions
export default postSlice.reducer