/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-19 10:16:25
 * @modify date 2024-11-19 10:16:25
 * @desc [description]
 */
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "@/app/features/transactionSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

/**
 * AppStore and AppDispatch only needs typeof because they point to store directly,
 * but for AppState we would need ReturnType<> because we need typescript to infer
 * type from whatever the getState function returns
 */
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
