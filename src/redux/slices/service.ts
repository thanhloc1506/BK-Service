import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../apis/axios";
import { hideWaiting, showWaiting } from "./loading";
import moment from "moment";
import { Service } from "../../apis/common/Service";
import { PInSchedule } from "../../apis/package/in/PInSchedule";

export interface State {
  services: Service[];
  serviceId?: string | number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  serviceLoading: boolean;
  totalService: number;
  singleService?: Service;
  isFollow: boolean;
  followService: any;
  followLoading: boolean;
  comments: any;
  commentLoading: boolean;
  schedules: any[];
  scheduleLoading: boolean;
  currentServiceSchedules: any;
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
  schedules: [],
  scheduleLoading: false,
  currentServiceSchedules: [],
};

export const resetState = createAsyncThunk("reset/state", () => {
  return true;
});

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
  async (serviceId: string | number, api) => {
    const dispatch = api.dispatch;
    try {
      // dispatch(showWaiting());
      const response = await axiosClient.post(`/user/add-favorite`, {
        serviceId: serviceId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      // dispatch(hideWaiting());
    }
  }
);

export const getFollowService = createAsyncThunk(
  "/get/follow/service",
  async (_, api) => {
    const dispatch = api.dispatch;
    try {
      // dispatch(showWaiting());
      const response = await axiosClient.get(`/user/followed-service`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      // dispatch(hideWaiting());
    }
  }
);

export const getServiceById = createAsyncThunk(
  "get/service/by/id",
  async (serviceId: string, api) => {
    const dispatch = api.dispatch;
    try {
      dispatch(showWaiting());
      const response = await axiosClient.get(`/service/${serviceId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(hideWaiting());
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
      // dispatch(showWaiting());
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
      // dispatch(hideWaiting());
    }
  }
);

export const getComments = createAsyncThunk(
  "user/get/comments",
  async (paramId: any, api) => {
    const dispatch = api.dispatch;
    try {
      // dispatch(showWaiting());
      const response = await axiosClient.get(
        `service/${paramId.serviceId}/comments`
      );
      const comments = response.data.comments;
      let commentResponses = [];
      let idx = 0;
      console.log(paramId);

      for (const comment of comments) {
        const userInfoResponse = await axiosClient.get(
          `/user-info/${comment.user._id}`
        );

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
      // dispatch(hideWaiting());
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

export const getAllSchedules = createAsyncThunk(
  "get/all/schedule",
  async (serviceId: string, api) => {
    const dispatch = api.dispatch;
    try {
      // dispatch(showWaiting());
      let currentServiceSchedules: any = [];
      let idx = 0;
      const response = await axiosClient.get<PInSchedule>("/user/schedules");
      for (const schedule of response.data.schedules) {
        // if (schedule.service === serviceId) {
        const timeServe = moment(
          schedule.timeServe as Date,
          "YYYY/MM/DD HH:mm"
        ).zone("+0700");
        var month = timeServe.format("MM");
        var day = timeServe.format("DD");
        var year = timeServe.format("YYYY");
        var hour = timeServe.format("HH");
        var min = timeServe.format("mm");
        currentServiceSchedules[idx] = {
          ...schedule,
          timeServe: {
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
            hour,
            min,
            sec: "00",
          },
          service: schedule.service.name,
        };
        idx++;
        // }
      }
      return currentServiceSchedules;
    } catch (error) {
      throw error;
    } finally {
      // dispatch(hideWaiting());
    }
  }
);

export const addSchedule = createAsyncThunk(
  "add/schedule",
  async (scheduleForm: any, api) => {
    const dispatch = api.dispatch;
    const { dateFormat, hour, min, AMPM, serviceId } = scheduleForm;
    let dateArr = dateFormat.split("/");
    let date = "";

    date += dateArr[2] + "-";

    if (parseInt(dateArr[0]) < 10) {
      date += "0" + dateArr[0] + "-";
    } else {
      date += dateArr[0] + "-";
    }

    if (parseInt(dateArr[1]) < 10) {
      date += "0" + dateArr[1];
    } else {
      date += dateArr[1];
    }

    date += ` ${AMPM === "AM" ? hour : parseInt(hour) + 12}:${min}:00`;

    const formData = { timeServe: date, serviceId };

    try {
      dispatch(showWaiting());
      const response = await axiosClient.post("/user/add-schedule", formData);

      const serviceResponse = await axiosClient.get(`/service/${serviceId}`);

      const timeServe = moment(
        response.data.schedule.timeServe,
        "YYYY/MM/DD HH:mm"
      ).zone("+0700");
      var month = timeServe.format("MM");
      var day = timeServe.format("DD");
      var year = timeServe.format("YYYY");
      var hourFormat = timeServe.format("HH");
      var minFormat = timeServe.format("mm");
      let currentServiceSchedule = {
        ...response.data.schedule,
        timeServe: {
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
          hour: hourFormat,
          min: minFormat,
          sec: "00",
        },
        service: serviceResponse.data.service.name,
      };

      return currentServiceSchedule;
    } catch (error) {
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
    [resetState.fulfilled.toString()]: (state, payload) => {
      state.comments = [];
      state.schedules = [];
    },
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
      const currentFollowService = action.payload.services.filter(
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
    [getAllSchedules.pending.toString()]: (state, _action) => {
      state.scheduleLoading = true;
    },
    [getAllSchedules.fulfilled.toString()]: (state, action) => {
      state.schedules = action.payload;
      state.scheduleLoading = false;
    },
    [addSchedule.pending.toString()]: (state, _action) => {
      state.scheduleLoading = true;
    },
    [addSchedule.fulfilled.toString()]: (state, action) => {
      state.schedules = [
        action.payload,
        ...state.schedules,
        // ...state.schedules.filter(
        //   (schedule: any) => schedule.service !== action.payload.service
        // ),
      ];
      state.scheduleLoading = false;
    },
  },
});

export default serviceSlice.reducer;
export const {} = serviceSlice.actions;
