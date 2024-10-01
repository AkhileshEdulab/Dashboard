

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        loading: false,
        timelines: [], 
        error: null,
        message: null, 
    },
    reducers: {
        getAllTimelineRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getAllTimelineSuccess(state, action) {
            state.timelines = action.payload; // Set timeline data
            state.loading = false;
            state.error = null;
        },
        getAllTimelineFailed(state, action) {
            state.loading = false;
            state.error = action.payload; // Set error message
        },
        deleteTimelineRequest(state) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteTimelineSuccess(state, action) {
           
            state.error = null;
            state.loading = false;
            state.message = action.payload[0];
        },
        deleteTimelineFailed(state, action) {
            state.message = null; 
            state.error = action.payload;
            state.loading = false;
        },

        addTimelineRequest(state) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addTimelineSuccess(state, action) {
            state.message = action.payload; 
            state.error = null;
            state.loading = false;
            
        },
        addTimelineFailed(state, action) {
            state.message = null; 
            state.error = action.payload;
            state.loading = false;
        },
        resetTimelineSlice(state) {
            state.error = null;
            state.timeline=state.timeline
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state) {
            state.error = null;
            state.timeline=state.timeline
        },
    },
});
export const getAllTimeline = () => async (dispatch) => {
    dispatch(getAllTimelineRequest()); 
    try {
        const { data } = await axios.get("http://localhost:4000/api/v1/timeline/getall", {
            withCredentials: true,
        });
        console.log("Fetched timeline data:", data); 
        dispatch(getAllTimelineSuccess(data.timelines)); 
    } catch (error) {
        console.error("API Error:", error);
        dispatch(getAllTimelineFailed(
            error.response?.data?.message || "Failed to fetch timeline"
        ));
    }
};

export const deleteTimeline = (id) => async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/timeline/delete/${id}`, {
            withCredentials: true,
        });
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.timelines));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        console.error("Error during deletion:", error);
        dispatch(timelineSlice.actions.deleteTimelineFailed(
            error.response?.data?.message || "Failed to delete message"
        ));
    }
};

export const addNewTimeline = (timelineData) => async (dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest());
    try {
        const { data } = await axios.post(`http://localhost:4000/api/v1/timeline/add`, timelineData,{
            withCredentials: true,
            headers:{"Content-Type":"application/json"}
        });
        dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelineFailed(
            error.response?.data?.message || "Failed to delete message"
        ));
    }
};


export const resetTimelineSlice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice());
};


export const clearAllTimelineErrors = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());
};

export const {
    getAllTimelineRequest,
    getAllTimelineSuccess,
    getAllTimelineFailed,
} = timelineSlice.actions;

export default timelineSlice.reducer;





