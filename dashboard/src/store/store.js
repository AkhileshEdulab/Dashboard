import {configureStore}  from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ForgotResetPassReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from './slices/massageSlice';
import timelineReducer from './slices/timelineSlice' 
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/projectSlice";

export  const store = configureStore({
   reducer:{
    user:userReducer,
    forgotPassword:ForgotResetPassReducer,
    Message: messageReducer,
    timeline: timelineReducer,
    skill :skillReducer,
    application:softwareApplicationReducer,
    project:projectReducer,
   
   } 
})