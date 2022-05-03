import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Schedule, ScheduleHistory} from "../../apis/common/Schedule";
import axiosClient from "../../apis/axios";
import {PInSchedule} from "../../apis/package/in/PInSchedule";
import {hideWaiting, showWaiting} from "./loading";
import {toastSuccess} from "../../utils/toast";
import {PInScheduleHistory} from "../../apis/package/in/PInScheduleHistory";

export interface State{
    scheduleHistory: ScheduleHistory[];
}
const initialState: State = {
    scheduleHistory: []
};

export const fetchScheduleHistory = createAsyncThunk<ScheduleHistory[]>("fetchScheduleHistory", (action, api)=>{
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient.get<PInScheduleHistory>("user/history-schedule")
        .then(res=>res.data.scheduleDone)
        .catch(err=>{throw  err;})
        .finally(()=>dispatch(hideWaiting()))
});



const scheduleHistorySlice = createSlice({
    name: "scheduleHistory",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchScheduleHistory.fulfilled.toString()]: (state: State, action: PayloadAction<ScheduleHistory[]>)=>{
            state.scheduleHistory = action.payload;
        }
    }
});

export default scheduleHistorySlice.reducer;
export const {} = scheduleHistorySlice.actions;