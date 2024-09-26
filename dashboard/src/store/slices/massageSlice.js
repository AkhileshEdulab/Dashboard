

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        loading: false,
        messages: [], 
        error: null,
        message: null, 
    },
    reducers: {
        getAllMessagesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getAllMessagesSuccess(state, action) {
            state.messages = action.payload; 
            state.loading = false;
            state.error = null;
        },
        getAllMessagesFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        deleteMessagesRequest(state) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteMessagesSuccess(state, action) {
            state.messages = action.payload; 
            state.error = null;
            state.loading = false;
            
        },
        deleteMessagesFailed(state, action) {
            state.messages = null; 
            state.error = action.payload;
            state.loading = false;
        },
        resetMessageSlice(state) {
            state.error = null;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state) {
            state.error = null;
        },
    },
});

// Thunk to fetch all messages
export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessagesRequest());
    try {
        const { data } = await axios.get("http://localhost:4000/api/v1/message/getall", {
            withCredentials: true,
        });
        console.log("API Response:", data);
        dispatch(messageSlice.actions.getAllMessagesSuccess(data.message));
    } catch (error) {
        console.error("API Error:", error);
        dispatch(messageSlice.actions.getAllMessagesFailed(
            error.response?.data?.message || "Failed to fetch messages"
        ));
    }
};

// Thunk to delete a message by ID
export const deleteMessages = (id) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessagesRequest());
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}`, {
            withCredentials: true,
        });
        dispatch(messageSlice.actions.deleteMessagesSuccess(data.message));
        dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
        console.error("Error during deletion:", error);
        dispatch(messageSlice.actions.deleteMessagesFailed(
            error.response?.data?.message || "Failed to delete message"
        ));
    }
};

// Thunk to reset the message slice
export const resetMessageSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice());
};

// Thunk to clear all errors
export const clearAllMessageErrors = () => (dispatch) => {
    dispatch(messageSlice.actions.clearAllErrors());
};

export default messageSlice.reducer;


