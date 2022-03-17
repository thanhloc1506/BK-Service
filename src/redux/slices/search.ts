import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {stat} from "fs";


export interface State {
    status: "loading" | "complete",
    isShowResult: boolean,
    cacheResult: Map<string, object>
}

const initialState: State = {
    status: "complete",
    isShowResult: false,
    cacheResult: new Map<string, object>()
};

export const search = createAsyncThunk(
    "/search",
    async (text: string) => {
            return new Promise((resolve: any, reject) => {
                setTimeout(()=>{
                    resolve({
                        searchText: text,
                        data: "hello"
                    });
                }, 1000)
            })
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        showResult(state: State){
            state.isShowResult= true;
        },
        hideResult(state: State){
            state.isShowResult = false;
        }
    },
    extraReducers: {
        [search.fulfilled.toString()]: (state, action) => {
            const data =action.payload;
            state.status = "complete";
            state.cacheResult.set(data.searchText, data.data);
        },
        [search.pending.toString()]: (state, action) => {
            state.status="loading";
        },
        [search.rejected.toString()]: (state, action)=>{
            state.status = "complete";
        }
    },
});

export default searchSlice.reducer;
export const {showResult, hideResult} = searchSlice.actions;
