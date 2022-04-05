import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "@/api/currencyApi";
import { fetchCoursesPending } from "@/reducers/courseSlice";

export type State = {
  fromCurrency: Currency;
  fromValue: string;
  toCurrency: Currency;
  toValue: string;
  list: Currency[];
  isLoading: boolean;
};

const initialState = {
  toCurrency: { key: "", label: "" },
  fromValue: "1",
  fromCurrency: { key: "", label: "" },
  toValue: "",
  list: [] as Currency[],
  isLoading: false,
  listLoaded: false,
};

export const fetchAllCurrencies = createAction("fetchAllCurrencies");
export const fetchCurrenciesPending = createAction("fetchCurrenciesPending");
export const fetchCurrenciesSuccess = createAction<Currency[]>(
  "fetchCurrenciesSuccess"
);
export const fetchCurrenciesError = createAction<Error>("fetchCurrenciesError");

const slice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setFromCurrency(state, action: PayloadAction<Currency>) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state, action: PayloadAction<Currency>) {
      state.toCurrency = action.payload;
    },
    setFromValue(state, action: PayloadAction<string>) {
      state.fromValue = action.payload;
    },
    setToValue(state, action: PayloadAction<string>) {
      state.toValue = action.payload;
    },
    setList(state, action: PayloadAction<Currency[]>) {
      state.list = action.payload;
    },
    swapValues(state) {
      const tmp = state.fromCurrency;
      state.fromCurrency = state.toCurrency;
      state.toCurrency = tmp;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrenciesPending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrenciesSuccess, (state, { payload }) => {
        state.isLoading = false;
        state.list = payload;
        state.listLoaded = true;
      })
      .addCase(fetchCurrenciesError, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const {
  setFromCurrency,
  setToCurrency,
  setToValue,
  setFromValue,
  swapValues,
} = slice.actions;
export const currencyReducer = slice.reducer;
