import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "../../apis/common/Schedule";
import axiosClient from "../../apis/axios";
import { PInSchedules } from "../../apis/package/in/PInSchedules";
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
      .get<PInSchedules>("enterprise/allSchedule")
      .then((res) => res.data.schedules)
      .catch((err) => {
        throw err;
      })
      .finally(() => dispatch(hideWaiting()));
  }
);

export const deleteSchedule = createAsyncThunk(
  "deleteSchedule",
  (idSchedule: string, api) => {
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient
      .post("enterprise/deleteSchedule", { id: idSchedule })
      .then((res) => {
        return idSchedule;
      })
      .finally(() => dispatch(hideWaiting()));
  }
);

export const doneSchedule = createAsyncThunk(
  "doneSchedule",
  (idSchedule: string, api) => {
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient
      .post("enterprise/doneschedule", { id: idSchedule })
      .then((res) => {
        return idSchedule;
      })
      .finally(() => dispatch(hideWaiting()));
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSchedule.pending.toString()]: (state, _action) => {
      state.schedulesLoading = true;
    },
    [fetchSchedule.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<Schedule[]>
    ) => {
      // state.schedules = action.payload;

      let schedules: Schedule[] = [];
      let idx = 0;
      for (const schedule of action.payload) {
        const timeServe = moment(
          schedule.timeServe as Date,
          "YYYY/MM/DD HH:mm"
        ).zone("+0700");
        var month = timeServe.format("MM");
        var day = timeServe.format("DD");
        var year = timeServe.format("YYYY");
        var hour = timeServe.format("HH");
        var min = timeServe.format("mm");
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
    [deleteSchedule.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<string>
    ) => {
      toastSuccess("Xóa lịch hẹn thành công!");
      state.schedules = state.schedules.filter((s) => s._id != action.payload);
    },
    [doneSchedule.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<string>
    ) => {
      toastSuccess("Đã hoàn thành đơn hàng!");
      state.schedules = state.schedules.filter((s) => s._id != action.payload);
    },
  },
});

export default scheduleSlice.reducer;
export const {} = scheduleSlice.actions;
