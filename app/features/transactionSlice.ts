import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITransaction {
  _created: string;
  _modified: string;
  amount: number;
  category: string;
  from: string;
  to: string;
  status: string;
}

const initialState: ITransaction[] = [
  {
    _created: "",
    _modified: "",
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
      return action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
