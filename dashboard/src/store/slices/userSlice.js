
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdate: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    updatePasswordRequest(state,action){
      state.loading = true;
      state.isUpdate= false;
      state.message = null;
      state.error = null;

    },
    updatePasswordSuccess(state,action){
      state.loading = false;
      state.isUpdate= true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state,action){
      state.loading = false;
      state.isUpdate= false;
      state.message = null;
      state.error = action.payload;
    },

    updateProfileRequest(state,action){
      state.loading = true;
      state.isUpdate= false;
      state.message = null;
      state.error = null;

    },
    updateProfileSuccess(state,action){
      state.loading = false;
      state.isUpdate= true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state,action){
      state.loading = false;
      state.isUpdate= false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state,action){
      state.error= null;
      state.isUpdate = false;
      state.message = null;
    },
    clearAllErrors(state,action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailed, clearAllErrors } = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-type": "application/json" } }
    );
    dispatch(loginSuccess(data.user));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};

export const { loadUserRequest, loadUserSuccess, loadUserFailed, clearAllUserErrors } = userSlice.actions;
export const getUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/me",
       {withCredentials:true}
    );
    dispatch(loadUserSuccess(data.user));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(loadUserFailed(error.response.data.message));
  }
};

export const {  logoutUserSuccess, logoutUserFailed, clearAllError } = userSlice.actions;
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/logout",
       {withCredentials:true}
    );
    dispatch(logoutUserSuccess(data.user));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(logoutUserFailed(error.response.data.message));
  }
};

export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
  dispatch(userSlice.actions.updatePasswordRequest());

  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/user/update/password",
      { currentPassword, newPassword, confirmNewPassword },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.updatePasswordSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Error:", error.response?.data || error);
    const errorMessage = error.response?.data?.message || 'Password update failed';
    dispatch(userSlice.actions.updatePasswordFailed(errorMessage));
  }
};



// export const updateProfile =(newData) => async (dispatch) =>{
//   dispatch(userSlice.actions.updateProfileRequest());
//   try {
//     const {data} = await axios.put(
//       "http://localhost:4000/api/v1/user/update/me",
//       newData,
//       {
//         withCredentials:true,
//         headers:{"Content-Type":"multipart/form-data"}
//       }
//     );
//     dispatch(userSlice.actions.updateProfileSuccess(data.message));
//     dispatch(userSlice.actions.clearAllErrors())
//   } catch (error) {
//     dispatch(
//       userSlice.actions.updateProfileFailed(error.response.data.message)
//     )
//   }
// }



export const updateProfile = (newData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());  // Corrected line
  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/user/update/me",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Error:", error.response?.data || error);  // Log the error details
    const errorMessage = error.response?.data?.message || "Profile update failed";
    dispatch(userSlice.actions.updateProfileFailed(errorMessage));
  }
};


export const resetProfile = () =>(dispatch) =>{
dispatch(userSlice.actions.updateProfileResetAfterUpdate());
}
export default userSlice.reducer;





