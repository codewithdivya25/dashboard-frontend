import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },

  reducers: {
    // Get All Projects
    getAllProjectsRequest(state) {
      state.loading = true;
      state.projects = [];
      state.error = null;
    },
    getAllProjectsSuccess(state, action) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Project
    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addNewProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Project
    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Project
    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset Slice
    resetProjectSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    // Clear Errors
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// ================= GET ALL =================
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/project/getall",
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(
        error.response?.data?.message || "Failed to fetch projects"
      )
    );
  }
};

// ================= ADD =================
export const addNewProject = (formData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/project/add",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(
        error.response?.data?.message || "Failed to add project"
      )
    );
  }
};

// ================= DELETE =================
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(
        error.response?.data?.message || "Failed to delete project"
      )
    );
  }
};

// ================= UPDATE =================
export const updateProject = (id, formData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());

  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/project/update/${id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(
        error.response?.data?.message || "Failed to update project"
      )
    );
  }
};

// ================= EXTRA ACTIONS =================
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;