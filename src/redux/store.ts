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
import { persistStore, persistReducer } from "redux-persist";
import { State as SearchState } from "./slices/search";
import { State as AuthState } from "./slices/auth";
import { State as UserState } from "./slices/user";
import { State as LoadingState } from "./slices/loading";
import { State as ServiceState } from "./slices/service";
import {State as NotiState} from "./slices/noti";
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
}
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: localStorage,
  blacklist: ["loading", "socket", "auth", "service"],
};

const reducer = combineReducers<MyReducer>({
  user: authSlice,
  userProfile: userProfileSlice,
  search: searchSlice,
  loading: loadingSlice,
  service: serviceSlice,
  noti: notiSlice
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
