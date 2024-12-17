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
