import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SearchDataResult {
    searchText: string;
    data: string
}

export interface State {
    status: "loading" | "complete",
    isShowResult: boolean,
    currentSearchText: string,
    dataSearch: SearchDataResult
}

const initialState: State = {
    status: "complete",
    isShowResult: false,
    currentSearchText: "",
    dataSearch: {
        searchText: "",
        data: ""
    }
};

export const search = createAsyncThunk(
    "/search",
    async (text: string) => {
        console.log("Search....: ", text);
            return new Promise((resolve: any, reject) => {
                setTimeout(()=>{
                    resolve({
                        searchText: text,
                        data: text
                    } as SearchDataResult);
                }, 1000)
            })
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        showResult(state: State) {
            state.isShowResult = true;
        },
        hideResult(state: State) {
            state.isShowResult = false;
        },
        setCurrentSearchText(state: State, action: PayloadAction<string>) {
            state.currentSearchText = action.payload;
        }
    },
    extraReducers: {
        [search.fulfilled.toString()]: (state, action) => {
            const data = action.payload;
            state.status = "complete";
            console.log("fullfiled ", data)
            if (data.searchText === state.currentSearchText) {
                state.dataSearch = data
            }
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
export const {showResult, hideResult, setCurrentSearchText} = searchSlice.actions;
