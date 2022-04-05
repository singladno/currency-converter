import React, { useEffect, useLayoutEffect } from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import { CurrencyGroup } from "@/components/Main/CurrencyGroup";
import {
  currenciesSelector,
  currencySelector,
  viewSelector,
} from "@/selectors";
import { fetchAllCurrencies } from "@/reducers/currencySlice";
import { useAppDispatch } from "@/actions";
import { fetchCourses } from "@/reducers/courseSlice";
import { ViewSwitcher } from "@/components/Main/ViewSwitcher";
import { ContentBlock } from "@/components/ContentBlock";
import { useLocation } from "@/common/hooks/useLocation";
import { useAppTranslate } from "@/common/hooks/useTranslate";

export const Main: React.FC = () => {
  const { fromCurrency, toCurrency } = currencySelector();
  const shouldRequest = !!(fromCurrency?.key && toCurrency?.key);
  const dispatch = useAppDispatch();
  const currencies = currenciesSelector();
  const view = viewSelector();
  const { t } = useAppTranslate();
  useLocation();
  useEffect(() => {
    shouldRequest &&
      dispatch(
        fetchCourses({
          from: fromCurrency.key,
          to: toCurrency.key,
          view,
          t,
        })
      );
  }, [fromCurrency, toCurrency, view]);

  useEffect(() => {
    dispatch(fetchAllCurrencies());
  }, []);

  return (
    <div className={cx(styles.main)}>
      <CurrencyGroup currencies={currencies} />
      <ViewSwitcher />
      <ContentBlock />
    </div>
  );
};
