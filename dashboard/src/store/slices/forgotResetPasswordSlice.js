
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ForgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
    
  },
  reducers: {
    forgotPasswordRequest(state,action) {
      state.loading = true;
      state.message = null
      state.error = null;
    },
    forgotPasswordSuccess(state, action) {
        state.loading = false;
        state.message = action.payload;
        state.error = null ;
    },
    forgotPasswordFailed(state, action) {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },

    resetPasswordRequest(state,action) {
        state.loading = true;
        state.message = null
        state.error = null;
      },
      resetPasswordSuccess(state, action) {
          state.loading = false;
          state.message = action.payload;
          state.error = null ;
      },
      resetPasswordFailed(state, action) {
          state.loading = false;
          state.message = action.payload;
          state.error = null;
      },
   
    clearAllErrors(state,action){
        state = state
        state.error = null;
    }
  },
});

export const forgotPassword = (email) => async(dispatch)=>{
    dispatch(ForgotResetPassSlice.actions.forgotPasswordRequest());
    try {
        const {data} = await axios.post(
            "http://localhost:4000/api/v1/user/password/forgot",
            {email},
            {withCredentials:true,headers:{"Content-Type":"application/json"}}
        );
        dispatch(ForgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
        dispatch(ForgotResetPassSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(ForgotResetPassSlice.actions.forgotPasswordFailed(
            error.responce.data.message
        ));
    }
}

export const resetPassword = (token,password,confirmPassword) => async(dispatch)=>{
    dispatch(ForgotResetPassSlice.actions.resetPasswordRequest());
    try {
        const {data} = await axios.put(
            `http://localhost:4000/api/v1/user/password/reset/${token}`,
            {password,confirmPassword},
            {withCredentials:true,headers:{"Content-Type":"application/json"}}
        );
        dispatch(ForgotResetPassSlice.actions.resetPasswordSuccess(data.message));
        dispatch(ForgotResetPassSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(ForgotResetPassSlice.actions.resetPasswordFailed(
            error.responce.data.message
        ));
    }
};

export const clearAllForgotPassworErrors = () =>(dispatch)=>{
    dispatch(ForgotResetPassSlice.actions.clearAllErrors());
}

export default ForgotResetPassSlice.reducer;