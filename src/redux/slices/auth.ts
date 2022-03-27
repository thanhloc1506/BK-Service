import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {setAuthToken} from "../../utils/setAuthToken";
import {LoginForm, RegisterForm} from "../types";
import cookies from "js-cookie";
import axiosClient from "../../apis/axios";
import {Enterprise} from "../../apis/common/Enterprise";
import {PInLogin} from "../../apis/package/in/PInLogin";
import {socketConnect, socketDisconnect} from "./socket";
import {PInProfile} from "../../apis/package/in/PInProfile";
import {hideWaiting, showWaiting} from "./loading";
import {toastError, toastSuccess} from "../../utils/toast";

export interface State {
  enterprise: Enterprise | undefined;
  isAuthenticated: boolean;
  authLoading: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  enterprise: undefined,
  isAuthenticated: false,
  authLoading: false,
  showLoginForm: false,
  showRegisterForm: false,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
    "/enterprise/login",
    async (loginForm: LoginForm, thunkAPI) => {
      try {
        console.log("long ne");
        const response: AxiosResponse<PInLogin> =
            await axiosClient.post<PInLogin>(`/auth/login-enterprise`, loginForm);
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
  "/enterprise/register",
  async (registerForm: RegisterForm) => {
    try {
      const { confirmPassword, ...dataRegister } = registerForm;
      const response = await axiosClient.post(`/enterprise/register`, dataRegister);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk("/enterprise/logout", async (_, thunkAPI) => {
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

export const loadEnterprise = createAsyncThunk("/enterprise/loadEnterprise", async (_, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  dispatch(showWaiting());
  try {
    const response: AxiosResponse<PInProfile> = await axiosClient.get(`/enterprise/`);
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
  name: "enterprise",
  initialState,
  reducers: {
    updateAvatar(state: State, action: PayloadAction<string>) {
      state.enterprise = {...state.enterprise, avatar: action.payload} as Enterprise;
    },
    updateProfile(state: State, action: PayloadAction<any>){
      state.enterprise = {...state.enterprise, ...action.payload}
    }
  },
  extraReducers: {
    [login.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [login.fulfilled.toString()]: (
        state,
        action: PayloadAction<AxiosResponse<PInLogin>>
    ) => {
      toastSuccess(`Đăng nhập thành công, Xin chào ${action.payload.data.enterprise.username} !`);
      state.authLoading = false;
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.enterprise = action.payload.data.enterprise;
      console.log("log ne", state.enterprise);
    },
    [login.rejected.toString()]: (state:State, action) => {
      toastError("Lỗi xác thực !");
      state.authLoading = false;
      state.status = "failed";
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.enterprise = undefined;
    },
    [register.pending.toString()]: (state, action) => {
      state.authLoading = true;
    },
    [register.fulfilled.toString()]: (state, action) => {
      toastSuccess("Đăng ký thành công !")
      state.authLoading = false;
      state.status = "succeeded";
    },
    [register.rejected.toString()]: (state, action) => {
      toastError("Lỗi xác thực !");
      state.authLoading = false;
      state.status = "failed";
      state.error = action.error.message;
    },
    [toggleModalLogin.fulfilled.toString()]: (state:State, action) => {
      state.showLoginForm = !action.payload;
    },
    [toggleModalRegister.fulfilled.toString()]: (state:State, action) => {
      state.showRegisterForm = !action.payload;
    },
    [loadEnterprise.fulfilled.toString()]: (state: State, action: PayloadAction<PInProfile>) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.enterprise = action.payload.enterprise;
    },
    [loadEnterprise.rejected.toString()]: (state:State, action) => {
      state.status = "failed";
      state.isAuthenticated = false;
      state.enterprise = undefined;
    },
    [logout.fulfilled.toString()]: (state: State, action) => {
      state.status = "idle";
      state.enterprise = undefined;
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const {updateAvatar, updateProfile} = authSlice.actions;
