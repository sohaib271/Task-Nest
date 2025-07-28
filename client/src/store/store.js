import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  todoSlice  from "../slices/todoslice";
import userSlice from "../slices/userSlice";

const persisitconfig=({
  key:"root",
  storage,
  whitelist:["user","todo"],
});

const rootReducer=combineReducers({
  todo:todoSlice,
  user:userSlice
});

const persistedReducer=persistReducer(persisitconfig,rootReducer);

export const store=configureStore({
 reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);