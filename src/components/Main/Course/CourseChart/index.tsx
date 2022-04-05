import React, { useEffect, useRef } from "react";
import {
  coursesLoadingSelector,
  coursesSelector,
  currencySelector,
} from "@/selectors";
import { Chart, ChartItem, registerables } from "chart.js";
import { makeCurrencyData, normalize } from "@/common/utils";

Chart.register(...registerables);

export const CourseChart: React.FC = () => {
  const { fromCurrency, toCurrency } = currencySelector();
  const ref = useRef<HTMLCanvasElement>(null);
  const courses = coursesSelector();
  const isLoading = coursesLoadingSelector();

  useEffect(() => {
    const ctx = ref?.current?.getContext("2d");
    const chart = new Chart(ctx as ChartItem, {
      type: "line",
      data: makeCurrencyData(courses, fromCurrency, toCurrency),
      options: {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              label: function (context) {
                const { dataIndex } = context;
                return normalize(courses[dataIndex][toCurrency.key]);
              },
              title: function () {
                return "";
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
    return () => chart.destroy();
  }, [courses]);
  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 overflow-hidden">
      {!isLoading && !!courses.length && <canvas ref={ref} id="myChart" />}
    </div>
  );
};
