import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0 };

const counterSlice = createSlice({
  name: "counterSlc",
  initialState,
  reducers: {
    increment(state, action) {
      console.log(state.count);
      console.log(action);
      state.count++;
    },
    decrement(state, action) {
      console.log(action);
      state.count--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
