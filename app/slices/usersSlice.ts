import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser[] | [] = [];

const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
