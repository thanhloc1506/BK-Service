import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "../../apis/axios";
import { PInSearch } from "../../apis/package/in/PInSearch";
import { hideWaiting, showWaiting } from "./loading";

export interface State {
  status: "loading" | "complete";
  isShowResult: boolean;
  currentSearchText: string;
  dataSearch: PInSearch.Data | undefined;
}

const initialState: State = {
  status: "complete",
  isShowResult: false,
  currentSearchText: "",
  dataSearch: undefined,
};

export const search = createAsyncThunk("/search", async (text: string, api) => {
  const dispatch = api.dispatch;
  dispatch(showWaiting());
  return axiosClient
    .get("search", {
      params: {
        text,
      },
    })
    .then((res: AxiosResponse<PInSearch.Data>) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    })
    .finally(() => {
      dispatch(hideWaiting());
    });
});

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
    },
  },
  extraReducers: {
    [search.fulfilled.toString()]: (
      state,
      action: PayloadAction<PInSearch.Data>
    ) => {
      const data = action.payload;
      state.status = "complete";
      if (data.searchText === state.currentSearchText) {
        if (data.services.length > 0) {
          state.dataSearch = data;
        } else {
          state.dataSearch = undefined;
        }
      }
    },
    [search.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [search.rejected.toString()]: (state, action) => {
      state.status = "complete";
    },
  },
});

export default searchSlice.reducer;
export const { showResult, hideResult, setCurrentSearchText } =
  searchSlice.actions;
