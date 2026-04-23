import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    // LOGIN
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // LOAD USER
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // LOGOUT
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE PROFILE / PASSWORD (COMMON)
    updateRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.user = action.payload.user;
    },
    updateFailed: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },

    // CLEAR ERRORS
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

export default userSlice.reducer;

//
// ================== ASYNC ACTIONS ==================
//

// LOGIN
export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password },
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.loginSuccess(data.user));
  } catch (error) {
    dispatch(
      userSlice.actions.loginFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

// LOAD USER
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/me",
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      userSlice.actions.loadUserFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  dispatch(userSlice.actions.logoutRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.logoutSuccess(data.message));
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

// UPDATE PROFILE
export const updateProfile = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.updateRequest());
  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/user/update/me",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(userSlice.actions.updateSuccess(data.message));
  } catch (error) {
    dispatch(
      userSlice.actions.updateFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

// UPDATE PASSWORD
export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) =>
  async (dispatch) => {
    dispatch(userSlice.actions.updateRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(userSlice.actions.updateSuccess(data.message));
    } catch (error) {
      dispatch(
        userSlice.actions.updateFailed(
          error.response?.data?.message || error.message
        )
      );
    }
  };

// RESET UPDATE STATE
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.resetUpdate());
};

// CLEAR ERRORS
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};