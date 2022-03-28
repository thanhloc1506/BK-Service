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
}

const initialState: State = {
  services: [],
  status: "idle",
  error: null,
  serviceLoading: false,
  totalService: 0,
  serviceId: undefined,
  singleService: undefined,
};

export const getAllServices = createAsyncThunk("/search", async () => {
  try {
    const response = await axiosClient.get(`/search`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const selectService = createAsyncThunk(
  "/select/service",
  (serviceId: string | number) => {
    return serviceId;
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
        (service: any) => service.id === action.payload
      );
    },
  },
});

export default serviceSlice.reducer;
export const {} = serviceSlice.actions;
