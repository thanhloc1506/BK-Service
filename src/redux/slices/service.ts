import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../apis/axios";
import { hideWaiting, showWaiting } from "./loading";
import moment from "moment";
import { Service } from "../../apis/common/Service";

export interface State {
  services: Service[];
  serviceId?: string | number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  serviceLoading: boolean;
  totalService: number;
  singleService: Service | undefined;
  isFollow: boolean;
  followService: any;
  followLoading: boolean;
  comments: any;
  commentLoading: boolean;
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
  comments: [],
  commentLoading: false,
};

export const selectService = createAsyncThunk(
  "/select/single/service",
  async (serviceId: string) => {
    return serviceId;
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

export const getComments = createAsyncThunk(
  "user/get/comments",
  async (paramId: any, api) => {
    const dispatch = api.dispatch;
    try {
      dispatch(showWaiting());
      const response = await axiosClient.get(
        `service/${paramId.serviceId}/comments`
      );
      const comments = response.data.comments;
      let commentResponses = [];
      let idx = 0;

      for (const comment of comments) {
        const userInfoResponse = await axiosClient.get(
          `/user-info/${comment.user._id}`
        );
        let isLiked = false;
        const time = moment(comment.createdAt, "YYYY/MM/DD");
        var month = time.format("MM");
        var day = time.format("DD");
        var year = time.format("YYYY");
        commentResponses[idx] = {
          ...comment,
          user: userInfoResponse.data.user,
          time: `${day}/${month}/${year}`,
          numOfUserLiked: comment.userLiked.length,
        };
        idx++;
      }

      return commentResponses;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(hideWaiting());
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
    [getServiceById.pending.toString()]: (state, _action) => {
      state.serviceLoading = true;
    },
    [getServiceById.fulfilled.toString()]: (state, action) => {
      state.singleService = action.payload.service;
      state.serviceLoading = false;
    },
    [getComments.pending.toString()]: (state, _action) => {
      state.commentLoading = true;
    },
    [getComments.fulfilled.toString()]: (state, action) => {
      state.comments = action.payload.reverse();
      state.commentLoading = false;
    },
  },
});

export default serviceSlice.reducer;
export const {} = serviceSlice.actions;
