import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import Messages from "./slices/messegesSlice";
import timelineReducer from "./slices/timelineSlice"
import skillReducer from "./slices/addSkillSlice"
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/ProjectSlice"
export const store  = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword: forgotResetPasswordReducer,
    messages: Messages,
    timeline: timelineReducer,
    skill:skillReducer,
      softwareApplications: softwareApplicationReducer,
project: projectReducer,

        
    }
})