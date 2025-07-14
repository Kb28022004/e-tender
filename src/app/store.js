import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { tenderApi } from "../features/tenderApi";


export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tenderApi.middleware),
});
