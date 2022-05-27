import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "../../apis/common/Schedule";
import axiosClient from "../../apis/axios";
import { PInSchedule } from "../../apis/package/in/PInSchedule";
import { hideWaiting, showWaiting } from "./loading";
import { toastSuccess } from "../../utils/toast";
import moment from "moment";

export interface State {
  schedules: Schedule[];
  schedulesLoading: boolean;
}
const initialState: State = {
  schedules: [],
  schedulesLoading: false,
};

export const fetchSchedule = createAsyncThunk<Schedule[]>(
  "fetchSchedule",
  (action, api) => {
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient
      .get<PInSchedule>("user/schedules")
      .then((res) => res.data.schedules)
      .catch((err) => {
        throw err;
      })
      .finally(() => dispatch(hideWaiting()));
  }
);

const deleteSchedule = createAsyncThunk("deleteSchedule", (id: string, api) => {
  const dispatch = api.dispatch;
  dispatch(showWaiting());
  return axiosClient
    .post<any>("user/unschedule", { id })
    .then((_) => id)
    .catch((err) => {
      throw err;
    })
    .finally(() => dispatch(hideWaiting()));
});

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSchedule.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<Schedule[]>
    ) => {
      let schedules: Schedule[] = [];
      let idx = 0;
      for (const schedule of action.payload) {
        const timeServe = moment(schedule.timeServe as Date)
          .utcOffset("+0700")
          .format("YYYY/MM/DD HH:mm");
        var month = timeServe.split(" ")[0].split("/")[1];
        var day = timeServe.split(" ")[0].split("/")[2];
        var year = timeServe.split(" ")[0].split("/")[0];
        var hour = timeServe.split(" ")[1].split(":")[0];
        var min = timeServe.split(" ")[1].split(":")[1];
        schedules[idx] = {
          ...schedule,
          timeServe: {
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
            hour,
            min,
            sec: "00",
          },
        };
        idx++;
      }
      state.schedules = schedules;
      state.schedulesLoading = false;
    },
    [fetchSchedule.pending.toString()]: (state, _action) => {
      state.schedulesLoading = true;
    },
    [deleteSchedule.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<string>
    ) => {
      toastSuccess("Xóa lịch hẹn thành công!");
      state.schedules = state.schedules.filter((s) => s._id !== action.payload);
    },
  },
});

export default scheduleSlice.reducer;
export const {} = scheduleSlice.actions;
