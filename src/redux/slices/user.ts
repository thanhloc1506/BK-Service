import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Page = "info" | "schedule" | "love" | "noti" | "history";

export interface State {
  page: Page;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  page: "info",
  status: "idle",
  error: null,
};

export const selectPage = createAsyncThunk(
  "/user/setPage",
  async (page: Page) => {
    try {
      return page;
    } catch (error) {
      console.log(error);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: {
    [selectPage.fulfilled.toString()]: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default userProfileSlice.reducer;
export const {} = userProfileSlice.actions;
