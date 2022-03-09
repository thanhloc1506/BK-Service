import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PageEnterprise = "manage" | "all" | "add" | "premium";

interface State {
  page: PageEnterprise;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  page: "manage",
  status: "idle",
  error: null,
};

export const selectPageEnterprise = createAsyncThunk(
  "/enterprise/setPage",
  async (page: PageEnterprise) => {
    try {
      return page;
    } catch (error) {
      console.log(error);
    }
  }
);

const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {},
  extraReducers: {
    [selectPageEnterprise.fulfilled.toString()]: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default enterpriseSlice.reducer;
export const {} = enterpriseSlice.actions;
