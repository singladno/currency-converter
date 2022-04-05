import { currencyApi } from "@/api/currencyApi";
import { put, takeEvery } from "redux-saga/effects";
import {
  fetchAllCurrencies,
  fetchCurrenciesError,
  fetchCurrenciesPending,
  fetchCurrenciesSuccess,
} from "@/reducers/currencySlice";

function* fetch() {
  yield put(fetchCurrenciesPending());
  try {
    const currencies = yield currencyApi.getCurrencies();
    yield put(fetchCurrenciesSuccess(currencies));
  } catch (e: any) {
    yield put(fetchCurrenciesError(e));
  }
}

function* watchFetchAllCurrencies() {
  yield takeEvery(fetchAllCurrencies, fetch);
}

export function* currenciesSaga() {
  yield watchFetchAllCurrencies();
}
