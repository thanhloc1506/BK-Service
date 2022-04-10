import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosClient from "../../apis/axios";
import {AxiosError, AxiosResponse} from "axios";
import {PInSearch} from "../../apis/package/in/PInSearch";
import {PInNotification} from "../../apis/package/in/PInNoti";
import cookies from "js-cookie";


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
        return axiosClient.get('/user/notifications')
            .then((res:AxiosResponse<PInNotification.Data>) => {
                return res.data;
            // return res.data;
        }).catch((error: AxiosError) => {
            throw error
        })

    }
);

export const readAllNoti = createAsyncThunk(
    "/read-all-noti",
    async ()=>{
        return axiosClient.post('/user/readAllNoti');
    }
)

const notiSlice = createSlice({
    name: "noti",
    initialState,
    reducers: {
        addNewNoti: function (state: State, action: PayloadAction<PInNotification.Notification>){
            state.notiData.unshift(action.payload);
            state.hasNewNoti = true;
        }
    },
    extraReducers: {
        [getNoti.fulfilled.toString()]: (state: State, action: PayloadAction<PInNotification.Data>) => {
            state.notiData = action.payload.noti.sort((a, b)=> (b.date - a.date));
            state.hasNewNoti = state.notiData.filter((s)=>!s.hadRead).length>0;
        },
        [getNoti.rejected.toString()]: (state: State, action)=>{

        },
        [readAllNoti.fulfilled.toString()]: (state: State, action) => {
            state.notiData.forEach(e=>e.hadRead=true);
            state.hasNewNoti = false;
        }
    },
});

export default notiSlice.reducer;
export const {addNewNoti} = notiSlice.actions;
