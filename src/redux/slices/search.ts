import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "../../apis/axios";
import { PInSearch } from "../../apis/package/in/PInSearch";
import { hideWaiting, showWaiting } from "./loading";
import { Category } from "../../apis/common/Category";
import { Phuong, Quan } from "../../apis/common/Address";
import { PInCategory } from "../../apis/package/in/PInCategory";
import { ADDRESS_API_URL } from "../../constants/common";
import { PInQuan } from "../../apis/package/in/PInQuan";
import { PInPhuong } from "../../apis/package/in/PInPhuong";
import { PInScore } from "../../apis/package/in/PInScore";
import { Service } from "../../apis/common/Service";

export interface Filter {
  category?: Category;
  quan?: Quan;
  phuong?: Phuong;
  rating?: any;
}

export interface State {
  status: "loading" | "complete";
  quickSearchStatus: "loading" | "complete";
  isShowResult: boolean;
  currentSearchText: string;
  currentQuickSearchText: string;
  dataSearch: PInSearch.Data | undefined;
  dataQuickSeacrh: PInSearch.Data | undefined;
  filter: Filter;
  //data
  quan: Quan[];
  phuong: Phuong[];
  categories: Category[] | undefined;
  page: number;
  totalPage: number;
}

const initialState: State = {
  status: "complete",
  quickSearchStatus: "complete",
  isShowResult: false,
  currentSearchText: "",
  dataSearch: undefined,
  filter: {},
  quan: [],
  phuong: [],
  categories: undefined,
  dataQuickSeacrh: undefined,
  currentQuickSearchText: "",
  page: 1,
  totalPage: 1,
};
export const getAllCategory = createAsyncThunk(
  "/getCategories",
  async (_, api) => {
    const dispatch = api.dispatch;
    dispatch(showWaiting());
    return axiosClient
      .get<PInCategory>("/categories")
      .then((res) => res.data.categories)
      .finally(() => dispatch(hideWaiting()));
  }
);

export const fetchQuan = createAsyncThunk("/getQuan", async (_, api) => {
  const dispatch = api.dispatch;
  dispatch(showWaiting());
  return axiosClient
    .get<PInQuan>(ADDRESS_API_URL + "/province/district/79")
    .then((res) => res.data.results)
    .finally(() => dispatch(hideWaiting()));
});

export const fetchPhuong = createAsyncThunk(
  "/getPhuong",
  async (quanId: string, api) => {
    const dispatch = api.dispatch;
    dispatch(hideWaiting());
    return axiosClient
      .get<PInPhuong>(ADDRESS_API_URL + "/province/ward/" + quanId)
      .then((res) => res.data.results)
      .finally(() => dispatch(hideWaiting()));
  }
);

export const deepSearch = createAsyncThunk(
  "/deepSearch",
  async (data: any | undefined, api: any) => {
    const filter: Filter = api.getState().search.filter;
    const dispatch = api.dispatch;
    let text = "";
    let page = 1;
    if (!data || !data.text) {
      text = api.getState().search.currentSearchText;
    } else {
      text = data.text;
    }
    if (!data || !data.page) {
      page = api.getState().search.page;
    } else {
      page = data.page;
    }
    let params: any = {
      category: filter.category?._id,
      quan: filter.quan?.district_id,
      huyen: filter.phuong?.ward_id,
      rating: filter.rating,
      text: text,
      page,
    };
    Object.keys(params).forEach((k) => {
      if (!params[k]) {
        delete params[k];
      }
    });

    dispatch(showWaiting());

    try {
      const response = await axiosClient.get<PInSearch.Data>("search", {
        params,
      });
      let services: any = [];
      for (const service of response.data.services) {
        const enterpriseInfo = await axiosClient.get(
          `/enterprise/${service.enterprise}`
        );

        const scoresResponse = await axiosClient.get<PInScore>(
          `service/${service._id}/scores`
        );

        const scores = scoresResponse.data?.score;

        const ratingScore =
          (32 * scores[0] +
            22 * scores[1] +
            19 * scores[2] +
            11 * scores[3] +
            16 * scores[4]) /
          100;

        const rankingScore =
          (service.blogScore + (2.5 * (service.cmtScore + ratingScore)) / 2) /
          3.5;

        const sortScore =
          (service.blogScore + (2.5 * (service.cmtScore + ratingScore)) / 2) /
            3.5 +
          parseInt(enterpriseInfo.data.enterprise.premium ?? "0");

        services.push({
          ...service,
          enterprise: enterpriseInfo.data.enterprise,
          ratingScore: ratingScore.toFixed(1),
          sortScore: sortScore.toFixed(1),
          rankingScore: rankingScore.toFixed(1),
        });
      }
      return { ...response.data, services };
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideWaiting());
    }
  }
);

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

export const quickSearch = createAsyncThunk(
  "/quickSearch",
  async (text: string, api: any) => {
    const filter: Filter = api.getState().search.filter;
    const dispatch = api.dispatch;
    if (!text) text = api.getState().search.currentQuickSearchText;
    let params: any = {
      text: text,
    };
    Object.keys(params).forEach((k) => {
      if (!params[k]) {
        delete params[k];
      }
    });
    try {
      const response = await axiosClient.get<PInSearch.Data>("search", {
        params,
      });
      let services: any = [];
      for (const service of response.data.services) {
        const enterpriseInfo = await axiosClient.get(
          `/enterprise/${service.enterprise}`
        );

        const scoresResponse = await axiosClient.get<PInScore>(
          `service/${service._id}/scores`
        );

        const scores = scoresResponse.data?.score;

        const ratingScore =
          (32 * scores[0] +
            22 * scores[1] +
            19 * scores[2] +
            11 * scores[3] +
            16 * scores[4]) /
          100;

        const rankingScore =
          (service.blogScore + (2.5 * (service.cmtScore + ratingScore)) / 2) /
          3.5;

        const sortScore =
          (service.blogScore + (2.5 * (service.cmtScore + ratingScore)) / 2) /
            3.5 +
          parseInt(enterpriseInfo.data.enterprise.premium ?? "0");

        services.push({
          ...service,
          enterprise: enterpriseInfo.data.enterprise,
          ratingScore: ratingScore.toFixed(1),
          sortScore: sortScore.toFixed(1),
          rankingScore: rankingScore.toFixed(1),
        });
      }
      return { ...response.data, services };
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideWaiting());
    }
  }
);

export const selectRating = createAsyncThunk(
  "/search/rating",
  (rating: any) => {
    return rating;
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
    },
    setCurrentQuickSearchText(state: State, action: PayloadAction<string>) {
      state.currentQuickSearchText = action.payload;
    },
    applyCategory(state: State, action: PayloadAction<Category>) {
      action.payload && (state.filter.category = action.payload);
    },
    applyQuan(state: State, action: PayloadAction<Quan>) {
      action.payload && (state.filter.quan = action.payload);
    },
    applyPhuong(state: State, action: PayloadAction<Phuong>) {
      action.payload && (state.filter.phuong = action.payload);
    },
    resetPhuong(state: State) {
      state.filter.phuong = undefined;
    },
    resetQuan(state: State) {
      state.filter.quan = undefined;
    },
    resetCategory(state: State) {
      state.filter.category = undefined;
    },
    clearQuickSearch(state: State) {
      state.dataQuickSeacrh = undefined;
    },
    resetFilter(state: State) {
      state.filter = {};
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
          console.log(data);
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
    [getAllCategory.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<Category[]>
    ) => {
      state.categories = action.payload;
    },
    [getAllCategory.rejected.toString()]: (
      state: State,
      action: PayloadAction<any>
    ) => {
      state.categories = [];
    },
    [fetchQuan.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<Quan[]>
    ) => {
      state.quan = action.payload;
    },
    [fetchQuan.rejected.toString()]: (state: State, action: any) => {
      state.quan = [];
    },
    [fetchPhuong.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<Phuong[]>
    ) => {
      state.phuong = action.payload;
    },
    [fetchPhuong.rejected.toString()]: (
      state: State,
      action: PayloadAction<any>
    ) => {
      state.phuong = [];
    },
    [deepSearch.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<PInSearch.Data>
    ) => {
      let data = action.payload;
      if (
        data.searchText === state.currentSearchText ||
        (data.searchText === undefined && state.currentSearchText === "")
      ) {
        if (data.services.length > 0) {
          let sortServices: Service[] = data.services;

          sortServices = sortServices.sort((a, b) => {
            return b.sortScore - a.sortScore;
          });

          state.dataSearch = { ...data, services: sortServices };

          state.totalPage = data.totalPage;
          state.page = data.page;
        } else {
          state.dataSearch = undefined;
          state.page = 1;
          state.totalPage = 1;
        }
      }
    },
    [quickSearch.fulfilled.toString()]: (
      state: State,
      action: PayloadAction<PInSearch.Data>
    ) => {
      let data = action.payload;
      state.quickSearchStatus = "complete";
      if (data.searchText === state.currentQuickSearchText) {
        console.log(data);
        if (data.services.length > 0) {
          let sortServices: Service[] = data.services;

          sortServices = sortServices.sort((a, b) => {
            return b.sortScore - a.sortScore;
          });

          state.dataQuickSeacrh = { ...data, services: sortServices };
        } else {
          state.dataQuickSeacrh = data;
        }
      }
    },
    [quickSearch.rejected.toString()]: (state: State, _) => {
      state.quickSearchStatus = "complete";
    },
    [quickSearch.pending.toString()]: (state: State, _) => {
      state.quickSearchStatus = "loading";
    },
    [selectRating.fulfilled.toString()]: (state, action) => {
      state.filter.rating = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const {
  showResult,
  hideResult,
  setCurrentSearchText,
  applyCategory,
  applyQuan,
  applyPhuong,
  resetPhuong,
  resetCategory,
  resetQuan,
  setCurrentQuickSearchText,
  clearQuickSearch,
  resetFilter,
} = searchSlice.actions;
