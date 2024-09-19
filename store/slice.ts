import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItem } from "../types/mainTypes";
import { TESTDATA } from "../helpers/dataMock";

type noteSlice = {
  noteArray: ListItem[];
};
type updateAction = {
  noteArray: ListItem;
  index: number;
};

const initialState: noteSlice = {
  noteArray: TESTDATA,
};

const counterSlice = createSlice({
  name: "noteState",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ListItem>) => {
      state.noteArray = [action.payload, ...state.noteArray];
    },
    edit: (state, action: PayloadAction<updateAction>) => {
      state.noteArray[action.payload.index] = action.payload.noteArray;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.noteArray.splice(action.payload, 1);
    },
  },
});

// Export the actions generated from the slice
export const { add, edit, remove } = counterSlice.actions;

// Export the reducer to use in the store
export default counterSlice.reducer;
