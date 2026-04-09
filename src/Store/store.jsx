import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
export const store  = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword: forgotResetPasswordReducer,
        
    }
})