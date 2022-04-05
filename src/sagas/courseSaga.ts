import { takeEvery, put } from "redux-saga/effects";
import {
  fetchCourses,
  fetchCoursesError,
  fetchCoursesPending,
  fetchCoursesSuccess,
} from "@/reducers/courseSlice";
import { currencyApi, CurrencyQuery } from "@/api/currencyApi";
import { toast } from "react-toastify";

function* fetch({ payload }: { payload: CurrencyQuery }) {
  const { to, from, view, t } = payload;
  yield put(fetchCoursesPending());
  try {
    const results = yield currencyApi.getCurrencyFromTo({
      to,
      from,
      view,
    });
    yield put(fetchCoursesSuccess(results));
  } catch (e: any) {
    yield put(fetchCoursesError(e));
    toast(t("ERROR"), { type: "error" });
  }
}

function* watchFetchCourses() {
  yield takeEvery(fetchCourses, fetch);
}

export function* courseSaga() {
  yield watchFetchCourses();
}
