import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messagesSlice = createSlice({
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
      state.messages = [];
      state.error = null;
    },

    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
      state.error = null;
    },

    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },

    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },

    resetMessageSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});


// GET ALL
export const getAllMessages = () => async (dispatch) => {
  dispatch(messagesSlice.actions.getAllMessagesRequest());

  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/message/getall",
      { withCredentials: true }
    );

    dispatch(
      messagesSlice.actions.getAllMessagesSuccess(response.data.messages)
    );
  } catch (error) {
    dispatch(
      messagesSlice.actions.getAllMessagesFailed(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};


// DELETE
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messagesSlice.actions.deleteMessageRequest());

  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(
      messagesSlice.actions.deleteMessageSuccess(response.data.message)
    );
  } catch (error) {
    dispatch(
      messagesSlice.actions.deleteMessageFailed(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messagesSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messagesSlice.actions.resetMessageSlice());
};

export default messagesSlice.reducer;