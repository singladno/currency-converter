import { useSelector } from "react-redux";
import { RootState } from "@/reducers";

export const currencySelector = () =>
  useSelector((state: RootState) => state.currency);
export const currenciesSelector = () =>
  useSelector((state: RootState) => state.currency.list);
export const currenciesLoadingSelector = () =>
  useSelector((state: RootState) => state.currency.isLoading);
export const currenciesLoadedSelector = () =>
  useSelector((state: RootState) => state.currency.listLoaded);
export const coursesSelector = () =>
  useSelector((state: RootState) => state.course.data);
export const coursesLoadingSelector = () =>
  useSelector((state: RootState) => state.course.isLoading);
export const viewSelector = () =>
  useSelector((state: RootState) => state.view.type);
