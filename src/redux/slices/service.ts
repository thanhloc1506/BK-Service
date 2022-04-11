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

export const comment = createAsyncThunk(
  "user/comment",
  async (formComment: any, api) => {
    const dispatch = api.dispatch;
    try {
      dispatch(showWaiting());
      const response = await axiosClient.post(
        "/user/rating-service",
        formComment
      );
      let commentResponses: any;

      const userInfoResponse = await axiosClient.get(
        `/user-info/${response.data.comment.user}`
      );
      const time = moment(response.data.comment.createdAt, "YYYY/MM/DD");
      var month = time.format("MM");
      var day = time.format("DD");
      var year = time.format("YYYY");
      commentResponses = {
        ...response.data.comment,
        user: userInfoResponse.data.user,
        userLiked: false,
        time: `${day}/${month}/${year}`,
      };

      return commentResponses;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(hideWaiting());
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
        for (const userId of comment.userLiked) {
          if (paramId.userId === userId) {
            isLiked = true;
          }
        }
        const time = moment(comment.createdAt, "YYYY/MM/DD");
        var month = time.format("MM");
        var day = time.format("DD");
        var year = time.format("YYYY");
        commentResponses[idx] = {
          ...comment,
          user: userInfoResponse.data.user,
          userLiked: isLiked,
          time: `${day}/${month}/${year}`,
        };
        idx++;
      }
      console.log(commentResponses);
      return commentResponses;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(hideWaiting());
    }
  }
);

export const toggleLikeComment = createAsyncThunk(
  "like/comment",
  async (commentId: string) => {
    try {
      const response = await axiosClient.post("/user/like-comment", {
        commentId,
      });
      return commentId;
    } catch (error) {
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
    [getComments.pending.toString()]: (state, _action) => {
      state.commentLoading = true;
    },
    [getComments.fulfilled.toString()]: (state, action) => {
      state.comments = action.payload.reverse();
      state.commentLoading = false;
    },
    [comment.pending.toString()]: (state, _action) => {
      state.commentLoading = true;
    },
    [comment.fulfilled.toString()]: (state, action) => {
      state.comments = [action.payload, ...state.comments];
      state.commentLoading = false;
    },
    [toggleLikeComment.fulfilled.toString()]: (state, action) => {},
  },
});

export default serviceSlice.reducer;
export const {} = serviceSlice.actions;
