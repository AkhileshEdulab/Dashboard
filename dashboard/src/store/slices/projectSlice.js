import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name:"project",
    initialState:{
        projects:[],
        loading:false,
        error:null,
        message:null,
        singleProject:{},
    },
    reducers:{
        getAllProjectRequest(state,action){
            state.projects = [];
            state.error=null;
            state.loading=true;
        },

        getAllSuccess(state,action){
            state.projects = action.payload;
            state.error=null;
            state.loading=false;
        },

        getAllProjectFailed(state,action){
            state.projects = state.projects ;
            state.error=action.payload;
            state.loading=false;
        },

        
        addNewProjectRequest(state,action){
            state.message=null;
            state.error= null;
            state.loading=true;
        },
        addNewProjectSuccess(state,action){
            state.message=action.payload;
            state.error=null;
            state.loading=false;
        },
        addNewProjectFailed(state,action){
            state.error= action.payload;
            state.loading=false;
            state.message=null;
        },

        deleteProjectRequest(state,action){
            state.message=null;
            state.error= null;
            state.loading=true;
        },
        deleteProjectSuccess(state,action){
            state.message=action.payload;
            state.error=null;
            state.loading=false;
        },
        deleteProjectFailed(state,action){
            state.error= action.payload;
            state.loading=false;
            state.message=null;
        },

        updateProjectRequest(state,action){
            state.message=null;
            state.error= null;
            state.loading=true;
        },
        updateProjectSuccess(state,action){
            state.message=action.payload;
            state.error=null;
            state.loading=false;
        },
        updateProjectFailed(state,action){
            state.error= action.payload;
            state.loading=false;
            state.message=null;
        },
        resetProjectSlice(state,action){
            state.error=null;
            state.loading=false;
            state.message=null;
            state.projects=state.projects;

        },

        clearAllErrors(state,action){
            state.error=null;
            state.projects= state.projects;
        }
        
    }
});


export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectRequest());
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/project/getall", {
        withCredentials: true,
      });
      dispatch(projectSlice.actions.getAllSuccess(data.projects)); 
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message));
    }
  };

   export const addNewProject = (data)=>async(dispatch)=>{
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const response = await axios.post("http://localhost:4000/api/v1/project/add",data,{
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"}
        });
        dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.addNewProjectFailed(error.response.data.message))
    };
   }

   export const deleteProject = (id) => async (dispatch)=>{
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const {data} = await axios.delete(`http://localhost:4000/api/v1/project/delete/${id}`,{
            withCredentials:true,
        });
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message))
    }
   }

   export const updateProject = (id,newData) =>async(dispatch)=>{
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const {data} = await axios.put(`http://localhost:4000/api/v1/project/update/${id}`,newData,{
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"}
        });
        dispatch(projectSlice.actions.updateProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message))
    }
   }



   export const clearAllProjectSliceErrors = ()=>async(dispatch)=>{
        dispatch(projectSlice.actions.clearAllErrors());
   }

   export const resetProjectSlice = () =>async (dispatch) =>{
    dispatch(projectSlice.actions.resetProjectSlice());
   }
   export default projectSlice.reducer;