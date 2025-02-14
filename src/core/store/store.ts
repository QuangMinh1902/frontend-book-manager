import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../api/book";
import searchReducer from "../reducer/search";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
