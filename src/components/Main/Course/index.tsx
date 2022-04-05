import React from "react";
import {
  formatDate,
  formatDateString,
  normalize,
  parseDateString,
} from "@/common/utils";
import { useAppTranslate } from "@/common/hooks/useTranslate";
import { coursesSelector, currencySelector } from "@/selectors";

export const Course: React.FC = () => {
  const { t } = useAppTranslate();
  const { toCurrency } = currencySelector();
  const courses = coursesSelector();
  const isError = false;

  const curCourse = courses && !!courses.length && courses[courses.length - 1];
  const course = curCourse[toCurrency.key] || null;
  const date = curCourse && curCourse.date;
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center my-4">
        <figcaption className="blockquote-footer my-0">
          {date && formatDateString(date)}
        </figcaption>
        <div className="display-6 flex">
          {isError && <div className="">{t("LOADING_ERROR")}</div>}
          {curCourse && normalize(course)}
        </div>
        <div></div>
      </div>
    </>
  );
};
