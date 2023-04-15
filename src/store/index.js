import { configureStore } from "@reduxjs/toolkit";
import auth from "../slice/auth"
import post from "../slice/post";

export default configureStore({
    reducer: { auth, post },
    devTools: false
})