import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import userProfileSlice from "./slices/user";
import enterpriseSlice from "./slices/enterprise";

const store = configureStore({
  reducer: {
    user: authSlice,
    userProfile: userProfileSlice,
    enterprise: enterpriseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
