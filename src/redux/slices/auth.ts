import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../utils/setAuthToken";
import { apiUrl, LoginForm } from "../types";
import cookies from "js-cookie";

interface State {
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
      // const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      // localStorage.setItem("Authorization", response.data.id);
      // setAuthToken(response.data.accessToken);

      // return response.data;
      return true;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
    setAuthToken(null);
  } catch (error) {
    console.log(error);
  }
});

export const loadUser = createAsyncThunk("/user/loaduser", async () => {
  try {
    // const response = await axios.get(`${apiUrl}/auth/loaduser`);
    // return response.data;
    console.log("load user");
    return true;
  } catch (error) {
    console.log(error);
  }
});

export const register = createAsyncThunk(
  "/user/register",
  async (registerForm: any) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
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
    [login.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
    },
    [login.rejected.toString()]: (state, action) => {
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
