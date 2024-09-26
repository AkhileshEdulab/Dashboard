import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
    name:"application",
    initialState:{
        softwareApplication:[],
        loading:false,
        error:null,
        message:null,
    },
    reducers:{
        getAllSoftwareApplicationRequest(state) {
            state.softwareApplication = [];
            state.loading = true;
            state.error = null;
          },
          getAllSoftwareApplicationSuccess(state, action) {
            state.softwareApplication = action.payload;
            state.loading = false;
            state.error = null;
          },
          getAllSoftwareApplicationFailed(state, action) {
            state.softwareApplication = state.softwareApplication;
            state.loading = false;
            state.error = action.payload;
          },
      
          
          addNewSoftwareRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          addNewSoftwareSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
          },
          addNewSoftwareFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
          },

          deleteSoftwareRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          deleteSoftwareSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
          },
          deleteSoftwareFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
          },
      
      
          resetSoftwareSlice(state) {
            state.loading = false;
            state.error = null;
            state.message = null;
            state.softwareApplication = state.softwareApplication;
          },
      
          clearAllErrors(state) {
            state.error = null;
            
          },
      
    }
});

export const getAllSoftwareApplication = () => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationRequest());
    try {
      const {data} = await axios.get("http://localhost:4000/api/v1/softwareapplication/getall", {
        withCredentials: true,
      });
      
      
      dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationSuccess(data.softwareApplications));
    } catch (error) {
      dispatch(
        skillSlice.actions.getAllSoftwareApplicationFailed(
          error.response?.data?.message || "Failed to fetch skills"
        )
      );
    }
  };
  
  export const addNewSoftwareApplication = (ApplicationData) => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.addNewSoftwareRequest()); 
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/softwareapplication/add`,
        ApplicationData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response && response.data) {
        dispatch(softwareApplicationSlice.actions.addNewSoftwareSuccess(response.data.message));
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to add skill";
      dispatch(softwareApplicationSlice.actions.addNewSoftwareFailed(errorMessage));
    }
  };
  
  
  export const deleteSoftwareApplication = (id) => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.deleteSoftwareRequest());
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/softwareapplication/delete/${id}`, {
            withCredentials: true,
        });
        dispatch(softwareApplicationSlice.actions.deleteSoftwareSuccess(data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        console.error("Error during deletion:", error);
        dispatch(softwareApplicationSlice.actions.deleteSoftwareFailed(
            error.response?.data?.message || "Failed to delete message"
        ));
    }
  };
  
  
  export const clearAllApplicationSliceErrors = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  };
  
  export const resetApplicationSlice = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.resetSoftwareSlice());
  };

  export default softwareApplicationSlice.reducer;