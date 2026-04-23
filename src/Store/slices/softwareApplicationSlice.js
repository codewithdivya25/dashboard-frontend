import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",

  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },

  reducers: {
    // GET ALL
    getAllSoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getAllSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.softwareApplications = action.payload;
    },

    getAllSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ADD NEW
    addNewSoftwareApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    addNewSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    addNewSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE
    deleteSoftwareApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    deleteSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    deleteSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET
    resetSoftwareApplicationSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});


// =======================
// GET ALL
// =======================
export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest()
  );

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );

    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(
        data.applications   // ✅ FIXED
      )
    );
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};


// =======================
// ADD NEW
// =======================
export const addNewSoftwareApplication = (formData) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.addNewSoftwareApplicationRequest()
  );

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/softwareapplication/add",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationSuccess(
        data.message
      )
    );
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};


// =======================
// DELETE
// =======================
export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deleteSoftwareApplicationRequest()
  );

  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/softwareapplication/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(
        data.message
      )
    );
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};


// =======================
// HELPERS
// =======================
export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;