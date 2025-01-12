/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-20 14:56:14
 * @modify date 2024-12-20 14:56:14
 * @desc [description]
 */
import { ITransaction } from "@/types/transactions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITransaction[] | [] = [];

const transactionsSlice = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      return action.payload;
    },
    addTransaction: (state, action: PayloadAction<ITransaction>) => {
      return [...state, action.payload];
    },
  },
});

export const { setTransactions, addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
