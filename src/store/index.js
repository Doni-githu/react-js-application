import { configureStore } from "@reduxjs/toolkit";
import auth from "../slice/auth"

export default configureStore({
    reducer: { auth },
    devTools: process.env.NODE_ENV !== 'production'
})