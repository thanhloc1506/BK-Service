import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {setAuthToken} from "../../utils/setAuthToken";
import {LoginForm, RegisterForm} from "../types";
import cookies from "js-cookie";
import axiosClient from "../../apis/axios";
import {toast} from "react-toastify";
import {User} from "../../apis/common/User";
import {PInLogin} from "../../apis/package/in/PInLogin";
import {socketConnect, socketDisconnect} from "./socket";
import {PInProfile} from "../../apis/package/in/PInProfile";
import {hideWaiting, showWaiting} from "./loading";

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
        console.log("long ne");
        const response: AxiosResponse<PInLogin> =
            await axiosClient.post<PInLogin>(`/auth/login`, loginForm);
        console.log(response);
        cookies.set("token", response.data.accessToken);
        const dispatch = thunkAPI.dispatch;
        dispatch(socketConnect());
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
      console.log(dataRegister);
      const response = await axiosClient.post(`/user/register`, dataRegister);
      cookies.set("token", response.data.accessToken);
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
    dispatch(socketDisconnect());
  } catch (error) {
    throw error;
  }
});

export const loadUser = createAsyncThunk("/user/loadUser", async (_, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  dispatch(showWaiting());
  try {
    const response: AxiosResponse<PInProfile> = await axiosClient.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideWaiting());
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

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [login.fulfilled.toString()]: (
        state,
        action: PayloadAction<AxiosResponse<PInLogin>>
    ) => {
      toast.success(
        `Đăng nhập thành công, Xin chào ${action.payload.data.user.username} !`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      state.authLoading = false;
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      console.log("log ne", state.user);
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
      state.isAuthenticated = false;
      state.user = undefined;
    },
    [register.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [register.fulfilled.toString()]: (state, action) => {
      toast.success("Đăng ky thành công !", {
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
    [register.rejected.toString()]: (state, action) => {
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
    [toggleModalLogin.fulfilled.toString()]: (state, action) => {
      state.showLoginForm = !action.payload;
    },
    [toggleModalRegister.fulfilled.toString()]: (state, action) => {
      state.showRegisterForm = !action.payload;
    },
    [loadUser.fulfilled.toString()]: (state: State, action: PayloadAction<PInProfile>) => {
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
export const {} = authSlice.actions;
