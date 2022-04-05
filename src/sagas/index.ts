import { all } from "redux-saga/effects";
import { currenciesSaga } from "@/sagas/currenciesSaga";
import { courseSaga } from "@/sagas/courseSaga";

export function* rootSaga() {
  yield all([currenciesSaga(), courseSaga()]);
}
