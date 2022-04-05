import { Option } from "react-bootstrap-typeahead/types/types";
import axios from "axios";
import { getDatesPeriod, isDateToday } from "@/common/utils";
import { ViewType } from "@/reducers/view";
import { TFunction } from "react-i18next";
export const LATEST = "latest";
export const DAY_MS = 24 * 60 * 60 * 1000;
export const REQUEST_PERIOD = 5;
const API_VERSION = 1;
const API_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${API_VERSION}`;

export type Currency = {
  key: string;
  label: string;
};

export type Course = {
  date: string;
} & Record<string, number>;

export type CurrencyOption = Partial<Currency> & Option;

export type CurrencyQuery = {
  from: string;
  to: string;
  date?: string;
  view?: ViewType;
  t: TFunction;
};

export const currencyApi = {
  getCurrencies: () =>
    axios
      .get<Currency>(`${API_URL}/latest/currencies.json`)
      .then(({ data: response }) =>
        Object.keys(response).reduce((acc: Currency[], key) => {
          acc.push({ key, label: response[key] });
          return acc;
        }, [])
      ),
  getCurrencyFromTo: async ({ from, to, view = ViewType.WEEK }) => {
    const todayDataAvailable = await axios
      .get<Course>(`${API_URL}/latest/currencies/${from}/${to}.json`)
      .then((res) => isDateToday(res.data.date));
    const dates = getDatesPeriod(todayDataAvailable, view);
    try {
      const results = await Promise.all(
        dates.map((date) =>
          axios.get<Course>(`${API_URL}/${date}/currencies/${from}/${to}.json`)
        )
      );
      const data = results.map((res, i) => {
        const date = res.data?.date || dates[i];
        return { ...res.data, date };
      });
      return data;
    } catch (e: any) {
      throw e;
    }
  },
};
