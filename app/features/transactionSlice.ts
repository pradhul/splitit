import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITransaction {
  created: string;
  modified: string;
  amount: number;
  category: string;
  from: string;
  to: string;
  status: string;
}

const initialState: ITransaction[] = [
  {
    created: "",
    modified: "",
    amount: 20,
    category: "Fuel",
    from: "Me",
    to: "You",
    status: "settled",
  },
];

const transactionsSlice = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      console.dir("=======================================", action.payload);
      return action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
