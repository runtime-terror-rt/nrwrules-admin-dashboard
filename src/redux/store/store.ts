import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slice/authSlice";
import uiReducer from "../features/slice/uiSlice";
import { baseApi } from "../features/api/baseApi";
import babyCareModalReducer from "../features/slice/babyCareModalSlice";

// Create store function
export const makeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      babyCareModal: babyCareModalReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState,
  });
};

// Initialize store
let store: ReturnType<typeof makeStore>;

export const getStore = () => {
  if (typeof window === "undefined") {
    // Server side - create a new store for each request
    return makeStore();
  } else {
    // Client side - create store once
    if (!store) {
      store = makeStore();
    }
    return store;
  }
};

// Types
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
