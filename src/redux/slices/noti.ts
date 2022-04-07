import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosClient from "../../apis/axios";
import {AxiosError, AxiosResponse} from "axios";
import {PInSearch} from "../../apis/package/in/PInSearch";
import {PInNotification} from "../../apis/package/in/PInNoti";


export interface State {
    hasNewNoti: boolean;
    notiData: Array<PInNotification.Notification>;
}

const initialState: State = {
    hasNewNoti: false,
    notiData: []
};

export const getNoti = createAsyncThunk(
    "/noti",
    async () => {
        return axiosClient.get('/enterprise/notifications')
            .then((res:AxiosResponse<PInNotification.Data>) => {
                return res.data;
            // return res.data;
        }).catch((error: AxiosError) => {
            throw error
        })

    }
);

const notiSlice = createSlice({
    name: "noti",
    initialState,
    reducers: {},
    extraReducers: {
        [getNoti.fulfilled.toString()]: (state: State, action: PayloadAction<PInNotification.Data>) => {
            state.notiData = action.payload.noti;
            state.hasNewNoti = state.notiData.filter((s)=>!s.hadRead).length>0;
        },
        [getNoti.rejected.toString()]: (state: State, action)=>{

        }
    },
});

export default notiSlice.reducer;
export const {} = notiSlice.actions;
