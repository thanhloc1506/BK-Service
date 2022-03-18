import thunk from "redux-thunk";
import {combineReducers, configureStore, createStore, ReducersMapObject} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import userProfileSlice from "./slices/user";
import enterpriseSlice from "./slices/enterprise";
import searchSlice from "./slices/search";
import loadingSlice from "./slices/loading"
import { persistStore, persistReducer } from 'redux-persist'
import {State as SearchState} from './slices/search'
import {State as AuthState} from './slices/auth'
import {State as EnterpriseState} from './slices/enterprise';
import {State as UserState} from './slices/enterprise';
import {State as LoadingState} from './slices/loading';
//@ts-ignore
import localStorage from 'redux-persist/lib/storage';
import {PersistConfig} from "redux-persist/es/types";
interface MyReducer{
  search: SearchState,
  user: AuthState,
  enterprise: EnterpriseState,
  userProfile: UserState,
  loading: LoadingState
}
const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: localStorage,
  blacklist: ["search", "loading"]
};

const reducer = combineReducers<MyReducer>({
  user: authSlice,
  userProfile: userProfileSlice,
  enterprise: enterpriseSlice,
  search: searchSlice,
  loading: loadingSlice
} as ReducersMapObject<any>);
// const store = createStore({
//   reducer: {
//
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
export const store = configureStore<MyReducer,any, any>({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
// const persistedReducer = persistReducer(persistConfig, reducer);
export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
