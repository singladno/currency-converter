import { combineReducers } from "redux";
import { store } from "@/index";
import { currencyReducer } from "@/reducers/currencySlice";
import { courseReducer } from "@/reducers/courseSlice";
import { viewReducer } from "@/reducers/view";

export const rootReducer = combineReducers({
  currency: currencyReducer,
  course: courseReducer,
  view: viewReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
