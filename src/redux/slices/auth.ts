import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import { LoginForm, RegisterForm } from "../types";
import cookies from "js-cookie";
import axiosClient from "../../apis/axios";
import { User } from "../../apis/common/User";
import { PInLogin } from "../../apis/package/in/PInLogin";
import { PInProfile } from "../../apis/package/in/PInProfile";
import { hideWaiting, showWaiting } from "./loading";
import { toastError, toastSuccess } from "../../utils/toast";
import { FileUploaded } from "../../apis/common/FileUploaded";
import { addNewNoti, getNoti } from "./noti";
import { socket } from "../../apis/socket";
import { PInNotification } from "../../apis/package/in/PInNoti";

export interface State {
  user?: User;
  isAuthenticated: boolean;
  authLoading: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  user: undefined,
  isAuthenticated: false,
  authLoading: false,
  showLoginForm: false,
  showRegisterForm: false,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "/user/login",
  async (loginForm: LoginForm, thunkAPI) => {
    try {
      const response: AxiosResponse<PInLogin> =
        await axiosClient.post<PInLogin>(`/auth/login`, loginForm);
      cookies.set("token", response.data.accessToken);
      const dispatch = thunkAPI.dispatch;
      return response;
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
      const { confirmPassword, ...dataRegister } = registerForm;
      const response = await axiosClient.post(`/user/register`, dataRegister);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk("/user/logout", async (_, thunkAPI) => {
  try {
    // await axios.get(`${apiUrl}/logout`);
    setAuthToken(null);
    cookies.remove("token");
    const dispatch = thunkAPI.dispatch;
  } catch (error) {
    throw error;
  }
});

export const loadUser = createAsyncThunk(
  "/user/loadUser",
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(showWaiting());
    try {
      const response: AxiosResponse<PInProfile> = await axiosClient.get(
        `/user/profile`
      );
      dispatch(getNoti());
      socket.connect().then((res) => {
        socket.registerListener("noti", (e: PInNotification.Notification) => {
          console.log("Da nhan", e);
          dispatch(addNewNoti(e));
        });
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(hideWaiting());
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

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAvatar(state: State, action: PayloadAction<FileUploaded>) {
      state.user = { ...state.user, avatar: action.payload } as User;
    },
    updateProfile(state: State, action: PayloadAction<any>) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    [login.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [login.fulfilled.toString()]: (
      state,
      action: PayloadAction<AxiosResponse<PInLogin>>
    ) => {
      toastSuccess(
        `Đăng nhập thành công, Xin chào ${action.payload.data.user.username} !`
      );
      state.authLoading = false;
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      console.log("log ne", state.user);
    },
    [login.rejected.toString()]: (state, action) => {
      toastError("Lỗi xác thực !");
      state.authLoading = false;
      state.status = "failed";
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.user = undefined;
    },
    [register.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [register.fulfilled.toString()]: (state, action) => {
      toastSuccess("Đăng ký thành công !");
      state.authLoading = false;
      state.status = "succeeded";
    },
    [register.rejected.toString()]: (state, action) => {
      toastError("Lỗi xác thực !");
      state.authLoading = false;
      state.status = "failed";
      state.error = action.error.message;
    },
    [toggleModalLogin.fulfilled.toString()]: (state, action) => {
      state.showLoginForm = !action.payload;
    },
    [toggleModalRegister.fulfilled.toString()]: (state, action) => {
      state.showRegisterForm = !action.payload;
    },
    [loadUser.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<PInProfile>
    ) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [loadUser.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.isAuthenticated = false;
      state.user = undefined;
    },
    [logout.fulfilled.toString()]: (state, action) => {
      state.status = "idle";
      state.user = undefined;
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const { updateAvatar, updateProfile } = authSlice.actions;
