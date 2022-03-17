import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import { apiUrl, LoginForm } from "../types";
import cookies from "js-cookie";
import axiosClient from "../../apis/axios";

export interface State {
  user: any;
  isAuthenticated: boolean;
  authLoading: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
  showLoginForm: false,
  showRegisterForm: false,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "/user/login",
  async (loginForm: LoginForm) => {
    try {
      console.log("long ne");
      const response = await axios.post(
        `http://localhost:3007/auth/login`,
        loginForm
      );
      console.log(response);
      cookies.set("token", response.data.accessToken);
      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    await axios.get(`${apiUrl}/logout`);
    setAuthToken(null);
  } catch (error) {
    console.log(error);
  }
});

export const loadUser = createAsyncThunk("/user/loaduser", async () => {
  try {
    // const response = await axios.get(`${apiUrl}/auth/loaduser`);
    // return response.data;
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const register = createAsyncThunk(
  "/user/register",
  async (registerForm: any) => {
    try {
      const response = await axios.post(
        `${apiUrl}/user/register`,
        registerForm
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const toggleModalLogin = createAsyncThunk(
  "showLoginForm",
  (toggle: boolean) => {
    return toggle;
  }
);

export const toggleModalRegister = createAsyncThunk(
  "showRegisterForm",
  (toggle: boolean) => {
    return toggle;
  }
);

const atuhSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [login.fulfilled.toString()]: (state, action) => {
      state.authLoading = false;
      state.status = "succeeded";
      state.isAuthenticated = true;
    },
    [login.rejected.toString()]: (state, action) => {
      state.authLoading = false;
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadUser.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authLoading = false;
      }
    },
    [logout.fulfilled.toString()]: (state, action) => {
      state.status = "idle";
      state.user = null;
      state.isAuthenticated = false;
    },
    [register.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [toggleModalLogin.fulfilled.toString()]: (state, action) => {
      state.showLoginForm = !action.payload;
    },
    [toggleModalRegister.fulfilled.toString()]: (state, action) => {
      state.showRegisterForm = !action.payload;
    },
  },
});

export default atuhSlice.reducer;
export const {} = atuhSlice.actions;
