import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../apis/axios";

export interface State {
  services: any;
  serviceId?: string | number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  serviceLoading: boolean;
  totalService: number;
  singleService: any;
  isFollow: boolean;
  followService: any;
}

const initialState: State = {
  services: [],
  status: "idle",
  error: null,
  serviceLoading: false,
  totalService: 0,
  serviceId: undefined,
  singleService: undefined,
  isFollow: false,
  followService: [],
};

export const getAllServices = createAsyncThunk("/get/services", async () => {
  try {
    const response = await axiosClient.get(`/search`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const selectService = createAsyncThunk(
  "/select/single/service",
  async (serviceId: string | number) => {
    return serviceId;
  }
);

export const setIsFollow = createAsyncThunk(
  "/select/service",
  async (isFollow: boolean) => {
    return isFollow;
  }
);

export const followService = createAsyncThunk(
  "/follow/service",
  async (serviceId: string | number) => {
    try {
      console.log(serviceId);
      const response = await axiosClient.post(`/user/add-favorite`, {
        serviceId: serviceId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getFollowService = createAsyncThunk(
  "/get/follow/service",
  async () => {
    try {
      const response = await axiosClient.get(`/user/followed-service`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const serviceSlice = createSlice({
  name: "serviceProfile",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllServices.fulfilled.toString()]: (state, action) => {
      state.serviceLoading = false;
      state.services = action.payload.services;
    },
    [getAllServices.pending.toString()]: (state, _action) => {
      state.serviceLoading = true;
    },
    [selectService.fulfilled.toString()]: (state, action) => {
      state.serviceId = action.payload;
      state.singleService = state.services?.filter(
        (service: any) => service._id === action.payload
      );
      console.log(state.singleService);
    },
    [followService.fulfilled.toString()]: (state, _action) => {
      state.isFollow = true;
      console.log(1);
    },
    [getFollowService.fulfilled.toString()]: (state, action) => {
      state.followService = action.payload.services;
    },
    [setIsFollow.fulfilled.toString()]: (state, action) => {
      state.isFollow = action.payload;
    },
  },
});

export default serviceSlice.reducer;
export const {} = serviceSlice.actions;
