import thunk from "redux-thunk";
import {
  combineReducers,
  configureStore,
  createStore,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import userProfileSlice from "./slices/user";
import searchSlice from "./slices/search";
import loadingSlice from "./slices/loading";
import serviceSlice from "./slices/service";
import notiSlice from "./slices/noti";
import scheduleSlice from "./slices/schedule";
import scheduleHistorySlice from "./slices/schedule-history";
import { persistStore, persistReducer } from "redux-persist";
import { State as SearchState } from "./slices/search";
import { State as AuthState } from "./slices/auth";
import { State as UserState } from "./slices/user";
import { State as LoadingState } from "./slices/loading";
import { State as ServiceState } from "./slices/service";
import { State as NotiState } from "./slices/noti";
import { State as ScheduleState } from "./slices/schedule";
import { State as ScheduleHistoryState } from "./slices/schedule-history";
//@ts-ignore
import localStorage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist/es/types";
interface MyReducer {
  search: SearchState;
  user: AuthState;
  userProfile: UserState;
  loading: LoadingState;
  service: ServiceState;
  noti: NotiState;
  schedule: ScheduleState;
  scheduleHistory: ScheduleHistoryState;
}
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: localStorage,
  blacklist: [
    "loading",
    "socket",
    "auth",
    "service",
    "schedule",
    "scheduleHistory",
  ],
};

const reducer = combineReducers<MyReducer>({
  user: authSlice,
  userProfile: userProfileSlice,
  search: searchSlice,
  loading: loadingSlice,
  service: serviceSlice,
  noti: notiSlice,
  schedule: scheduleSlice,
  scheduleHistory: scheduleHistorySlice,
} as ReducersMapObject<any>);
// const store = createStore({
//   reducer: {
//
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
export const store = configureStore<MyReducer, any, any>({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// const persistedReducer = persistReducer(persistConfig, reducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
