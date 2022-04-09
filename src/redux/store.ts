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
import socketSlice from "./slices/socket";
import serviceSlice from "./slices/service";
import { persistStore, persistReducer } from "redux-persist";
import { State as SearchState } from "./slices/search";
import { State as AuthState } from "./slices/auth";
import { State as UserState } from "./slices/user";
import { State as LoadingState } from "./slices/loading";
import { State as SocketState } from "./slices/socket";
import { State as ServiceState } from "./slices/service";
//@ts-ignore
import localStorage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist/es/types";
interface MyReducer {
  search: SearchState;
  user: AuthState;
  userProfile: UserState;
  loading: LoadingState;
  socket: SocketState;
  service: ServiceState;
}
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: localStorage,
  blacklist: ["search", "loading", "socket", "auth", "service"],
};

const reducer = combineReducers<MyReducer>({
  user: authSlice,
  userProfile: userProfileSlice,
  search: searchSlice,
  loading: loadingSlice,
  socket: socketSlice,
  service: serviceSlice,
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
