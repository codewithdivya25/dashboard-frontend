import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   SLICE
========================= */
const timelineSlice = createSlice({
  name: "timeline",

  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },

  reducers: {
    // GET ALL
    getAllTimelineRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.timeline = action.payload;
    },

    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ADD
    addNewTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    addNewTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    addNewTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE
    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET
    resetTimelineSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export default timelineSlice.reducer;

/* =========================
   ACTION EXPORTS
========================= */
export const timelineActions = timelineSlice.actions;

/* =========================
   API BASE URL
========================= */
const BASE_URL = "http://localhost:4000/api/v1/timeline";

/* =========================
   GET ALL TIMELINE
========================= */
export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineActions.getAllTimelineRequest());

  try {
    const { data } = await axios.get(`${BASE_URL}/getall`, {
      withCredentials: true,
    });

    dispatch(
      timelineActions.getAllTimelineSuccess(data.timelines)
    );
  } catch (error) {
    dispatch(
      timelineActions.getAllTimelineFailed(
        error.response?.data?.message || "Failed to fetch timeline"
      )
    );
  }
};

/* =========================
   ADD TIMELINE
========================= */
export const addNewTimeline = (formData) => async (dispatch) => {
  dispatch(timelineActions.addNewTimelineRequest());

  try {
    const { data } = await axios.post(`${BASE_URL}/add`, formData, {
      withCredentials: true,
    });

    dispatch(
      timelineActions.addNewTimelineSuccess(data.message)
    );

    // 🔥 AUTO REFRESH
    dispatch(getAllTimeline());
  } catch (error) {
    dispatch(
      timelineActions.addNewTimelineFailed(
        error.response?.data?.message || "Failed to add timeline"
      )
    );
  }
};

/* =========================
   DELETE TIMELINE
========================= */
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineActions.deleteTimelineRequest());

  try {
    const { data } = await axios.delete(
      `${BASE_URL}/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(
      timelineActions.deleteTimelineSuccess(data.message)
    );

    // 🔥 AUTO REFRESH
    dispatch(getAllTimeline());
  } catch (error) {
    dispatch(
      timelineActions.deleteTimelineFailed(
        error.response?.data?.message || "Failed to delete timeline"
      )
    );
  }
};

/* =========================
   HELPERS
========================= */
export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineActions.clearAllErrors());
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineActions.resetTimelineSlice());
};