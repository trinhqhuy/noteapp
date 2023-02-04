import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// import userReducer from "./userSlice"
import folderReducer from "./folderSlide";
import noteReducer from "./noteSlide";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  auth: authReducer,
  // users: userReducer,
  folders: folderReducer,
  notes: noteReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
