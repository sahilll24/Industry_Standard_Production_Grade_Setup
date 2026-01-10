import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../src/api/client";

const persistState = (state) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    "auth",
    JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    })
  );
};

const loadState = () => {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem("auth");
    if (!saved) return {};
    return JSON.parse(saved);
  } catch {
    return {};
  }
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiRequest("/auth/register", {
        method: "POST",
        body: payload,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiRequest("/auth/login", {
        method: "POST",
        body: payload,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    if (!token) return rejectWithValue("Missing token");

    try {
      return await apiRequest("/auth/me", {
        token,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
  ...loadState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        persistState(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        persistState(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        persistState(state);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

