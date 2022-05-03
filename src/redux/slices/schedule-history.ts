import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule, ScheduleHistory } from "../../apis/common/Schedule";
import axiosClient from "../../apis/axios";
import { PInSchedule } from "../../apis/package/in/PInSchedule";
import { hideWaiting, showWaiting } from "./loading";
import { toastSuccess } from "../../utils/toast";
import { PInScheduleHistory } from "../../apis/package/in/PInScheduleHistory";
import moment from "moment";

export interface State {
  scheduleHistory: ScheduleHistory[];
  scheduleHistoryLoading: boolean;
}
const initialState: State = {
  scheduleHistory: [],
  scheduleHistoryLoading: false,
};

export const fetchScheduleHistory = createAsyncThunk<ScheduleHistory[]>(
  "fetchScheduleHistory",
  (action, api) => {
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient
      .get<PInScheduleHistory>("user/history-schedule")
      .then((res) => res.data.scheduleDone)
      .catch((err) => {
        throw err;
      })
      .finally(() => dispatch(hideWaiting()));
  }
);

const scheduleHistorySlice = createSlice({
  name: "scheduleHistory",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchScheduleHistory.pending.toString()]: (
      state: State,
      _action: PayloadAction<ScheduleHistory[]>
    ) => {
      state.scheduleHistoryLoading = true;
    },
    [fetchScheduleHistory.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<ScheduleHistory[]>
    ) => {
      let schedules: ScheduleHistory[] = [];
      let idx = 0;
      for (const schedule of action.payload) {
        const timeServe = moment(
          schedule.date as Date,
          "YYYY/MM/DD HH:mm"
        ).zone("+0700");
        var month = timeServe.format("MM");
        var day = timeServe.format("DD");
        var year = timeServe.format("YYYY");
        var hour = timeServe.format("HH");
        var min = timeServe.format("mm");
        schedules[idx] = {
          ...schedule,
          date: {
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
      state.scheduleHistory = schedules;
      state.scheduleHistoryLoading = false;
    },
  },
});

export default scheduleHistorySlice.reducer;
export const {} = scheduleHistorySlice.actions;
