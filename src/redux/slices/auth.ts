import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import { apiUrl, LoginForm, RegisterForm } from "../types";
import cookies from "js-cookie";
import axiosClient from "../../apis/axios";
import { toast } from "react-toastify";

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
      const response = await axiosClient.post(`/auth/login`, loginForm);
      cookies.set("token", response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  "/user/register",
  async (registerForm: RegisterForm) => {
    try {
      const response = await axiosClient.post(`/auth/register`, registerForm);
      cookies.set("token", response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    // await axios.get(`${apiUrl}/logout`);
    setAuthToken(null);
    cookies.remove("token");
  } catch (error) {
    throw error;
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
      toast.success("Đăng nhập thành công !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      state.authLoading = false;
      state.status = "succeeded";
      state.isAuthenticated = true;
    },
    [login.rejected.toString()]: (state, action) => {
      toast.error("Lỗi xác thực !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
