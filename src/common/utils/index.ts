import {
  Currency,
  Course,
  LATEST,
  REQUEST_PERIOD,
  DAY_MS,
} from "@/api/currencyApi";
import { ViewType } from "@/reducers/view";

// add 0 to integers with one digit and returns a string e.g. 1 -> "01", 2 -> "02"
const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

// takes Date and returns a string of type "YYYY-MM-DD"
export const formatDate = (date: Date) =>
  [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");

// takes a string of type "YYYY-MM-DD" and returns a Date
export const parseDateString = (str) => {
  const [year, month, date] = str.split("-");
  return new Date(year, month - 1, date);
};

// create an array containing integers from 1 to N e.g. createArray(3) => [1, 2, 3]
export const createArray = (n: number) =>
  Array.from(Array(n).keys()).map((i) => ++i);

// takes a string of type "YYYY-MM-DD" and returns array of dates
export const getDatesPeriod = (todayDataAvailable: boolean, view: ViewType) => {
  const baseDate = todayDataAvailable
    ? new Date()
    : new Date(new Date().getTime() - DAY_MS);
  switch (view) {
    case ViewType.MONTH: {
      return createArray(30)
        .map((i) => new Date(baseDate.getTime() - DAY_MS * i))
        .reverse()
        .map(formatDate)
        .concat("latest");
    }
    case ViewType.YEAR: {
      return createArray(11)
        .map(
          (i) => new Date(new Date(baseDate).setMonth(baseDate.getMonth() - i))
        )
        .reverse()
        .map(formatDate)
        .concat("latest");
    }
    default: {
      return createArray(6)
        .map((i) => new Date(baseDate.getTime() - DAY_MS * i))
        .reverse()
        .map(formatDate)
        .concat("latest");
    }
  }
};

export const formatDateString = (date: string) =>
  parseDateString(date).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// helper for chart.js data
export const makeCurrencyData = (
  data: Course[] = [],
  from: Currency = {} as Currency,
  to: Currency = {} as Currency
) => {
  const labels = data.map((it) => formatDateString(it.date));
  const values = data.map((it) => it[to.key]);
  return {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
};

// round number to fixed signs after dot
export const normalize = (v: string | number) =>
  (typeof v === "string" ? Number(v) : v).toFixed(2);

export const isDateToday = (date: string) => formatDate(new Date()) === date;
