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
  followLoading: boolean;
}

const initialState: State = {
  services: [],
  status: "idle",
  error: null,
  serviceLoading: true,
  totalService: 0,
  serviceId: undefined,
  singleService: undefined,
  isFollow: false,
  followService: [],
  followLoading: false,
};

export const selectService = createAsyncThunk(
  "/select/single/service",
  async (serviceId: string) => {
    return serviceId;
  }
);

export const setIsFollow = createAsyncThunk(
  "/set/follow/service",
  async (isFollow: boolean) => {
    return isFollow;
  }
);

export const getIsFollow = createAsyncThunk(
  "get/follow/service",
  (serviceId: string) => {
    return serviceId;
  }
);

export const followService = createAsyncThunk(
  "/follow/service",
  async (serviceId: string | number) => {
    try {
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

export const getServiceById = createAsyncThunk(
  "get/service/by/id",
  async (serviceId: string) => {
    try {
      const response = await axiosClient.get(`/service/${serviceId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const unFollow = createAsyncThunk(
  "unFollow/Service",
  async (serviceId: string) => {
    try {
      const response = axiosClient.post("user/remove-favorite", { serviceId });
      if ((await response).status === 200) {
        return serviceId;
      }
      return false;
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
    [selectService.pending.toString()]: (state, _action) => {
      state.serviceLoading = true;
    },
    [selectService.fulfilled.toString()]: (state, action) => {
      state.serviceId = action.payload;
    },
    [followService.fulfilled.toString()]: (state, _action) => {
      state.isFollow = true;
    },
    [getFollowService.pending.toString()]: (state, _action) => {
      state.followLoading = true;
    },
    [getFollowService.fulfilled.toString()]: (state, action) => {
      state.followService = action.payload.services;
      const currentFollowService = state.followService?.filter(
        (service: any) => service._id === state.serviceId
      );
      state.isFollow = currentFollowService.length === 1;
      state.followLoading = false;
    },
    [getServiceById.pending.toString()]: (state, _action) => {
      state.serviceLoading = true;
    },
    [getServiceById.fulfilled.toString()]: (state, action) => {
      state.singleService = action.payload.service;
      state.serviceLoading = false;
    },
    [unFollow.pending.toString()]: (state, _action) => {
      state.followLoading = true;
    },
    [unFollow.fulfilled.toString()]: (state, action) => {
      if (action.payload) {
        state.followService = state.followService.filter(
          (service: any) => service._id !== action.payload
        );
      }
      state.isFollow = false;
      state.followLoading = false;
    },
  },
});

export default serviceSlice.reducer;
export const {} = serviceSlice.actions;
