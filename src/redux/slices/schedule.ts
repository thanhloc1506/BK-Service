import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Schedule} from "../../apis/common/Schedule";
import axiosClient from "../../apis/axios";
import {PInSchedule} from "../../apis/package/in/PInSchedule";
import {hideWaiting, showWaiting} from "./loading";
import {toastSuccess} from "../../utils/toast";

export interface State{
    schedules: Schedule[];
}
const initialState: State = {
    schedules: []
};

export const fetchSchedule = createAsyncThunk<Schedule[]>("fetchSchedule", (action, api)=>{
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient.get<PInSchedule>("user/schedules")
        .then(res=>res.data.schedules)
        .catch(err=>{throw  err;})
        .finally(()=>dispatch(hideWaiting()))
});

export const deleteSchedule = createAsyncThunk("deleteSchedule", (id: string, api)=>{
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient.post<any>("user/unschedule",{id})
        .then(_=>id)
        .catch(err=>{throw  err;})
        .finally(()=>dispatch(hideWaiting()))
});


const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSchedule.fulfilled.toString()]: (state: State, action: PayloadAction<Schedule[]>) => {
            state.schedules = action.payload;
        },
        [deleteSchedule.fulfilled.toString()]: (state: State, action:PayloadAction<string>)=>{
            toastSuccess("Xóa lịch hẹn thành công!");
            state.schedules = state.schedules.filter((s)=>(s._id!==action.payload));
        }
    }
});

export default scheduleSlice.reducer;
export const {} = scheduleSlice.actions;