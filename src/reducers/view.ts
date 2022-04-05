import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ViewType {
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

type State = {
  type: ViewType;
};

const initialState: State = {
  type: ViewType.WEEK,
};

const slice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, { payload }: PayloadAction<ViewType>) => {
      state.type = payload;
    },
  },
});

export const viewReducer = slice.reducer;
export const { setView } = slice.actions;
