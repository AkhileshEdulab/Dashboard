

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.skills = [];
      state.loading = true;
      state.error = null;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    
    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // delete skill here

    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
     
    //Update skills

    updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetSkillSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});




export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
  const  {data}  = await axios.get("http://localhost:4000/api/v1/skill/getall", {
      withCredentials: true,
    });
    
    dispatch(skillSlice.actions.getAllSkillsSuccess(data.skill));
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillsFailed(error.response.data.message));
  }
};




export const addNewSkill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest()); 
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/skill/add`,
      skillData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response && response.data) {
      dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to add skill";
    dispatch(skillSlice.actions.addNewSkillFailed(errorMessage));
  }
};


export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/skill/delete/${id}`, {
          withCredentials: true,
      });
      dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
      dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
      console.error("Error during deletion:", error);
      dispatch(skillSlice.actions.deleteSkillFailed(
          error.response?.data?.message || "Failed to delete message"
      ));
  }
};

export const updateSkill = (id, proficiency) =>async (dispatch)=>{
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const{data} = await axios.put(`http://localhost:4000/api/v1/skill/update/${id}`,{proficiency},{
      withCredentials:true,
      headers:{"Content-Type":"Application/json"}
    });
    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error,response.data.message))
  }
}

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
