import thunk from "redux-thunk";
import {combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import userProfileSlice from "./slices/user";
import enterpriseSlice from "./slices/enterprise";
import { persistStore, persistReducer } from 'redux-persist'
//@ts-ignore
import localStorage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: localStorage,
};

const reducer = combineReducers({
  user: authSlice,
  userProfile: userProfileSlice,
  enterprise: enterpriseSlice,
});
// const store = createStore({
//   reducer: {
//
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
// const persistedReducer = persistReducer(persistConfig, reducer);
export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
