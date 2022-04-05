import { createAction, createSlice } from "@reduxjs/toolkit";
import { Course, CurrencyQuery } from "@/api/currencyApi";
import { toast } from "react-toastify";

type State = {
  data: Course[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: State = {
  data: [],
  isLoading: false,
  isError: false,
};

export const fetchCourses = createAction<CurrencyQuery>("fetchCourses");
export const fetchCoursesPending = createAction("fetchCoursesPending");
export const fetchCoursesSuccess = createAction<Course[]>("fetchCoursesSucess");
export const fetchCoursesError = createAction<Error>("fetchCoursesError");

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesPending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCoursesSuccess, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(fetchCoursesError, (state, { payload }) => {
        state.isLoading = false;
        state.data = [];
        state.isError = true;
      });
  },
});

export const { reducer: courseReducer } = courseSlice;
