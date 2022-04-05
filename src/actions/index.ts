import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reducers";

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
