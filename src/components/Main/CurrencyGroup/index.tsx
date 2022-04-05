import React, { useEffect, useRef } from "react";
import { Typeahead } from "@/components/common/Typeahead";
import { Currency, CurrencyOption } from "@/api/currencyApi";
import { setFromCurrency, setToCurrency } from "@/reducers/currencySlice";
import { useAppDispatch } from "@/actions";
import Arrow from "@/images/arrow-left-right.svg";
import { Button, Form } from "react-bootstrap";
import styles from "./index.module.scss";
import {
  coursesSelector,
  currenciesLoadingSelector,
  currencySelector,
} from "@/selectors";
import { setFromValue, setToValue, swapValues } from "@/reducers/currencySlice";
import { normalize } from "@/common/utils";
import cx from "classnames";
import { Input } from "@/components/Input";
import { SaveCheckbox } from "@/components/Main/CurrencyGroup/SaveCheckbox";

type Props = {
  currencies?: Currency[];
};

export const CurrencyGroup: React.FC<Props> = ({ currencies }) => {
  const { fromCurrency, fromValue, toCurrency, toValue } = currencySelector();
  const isLoading = currenciesLoadingSelector();
  const dispatch = useAppDispatch();
  const courses = coursesSelector();
  const curCourse =
    (courses &&
      !!courses.length &&
      courses[courses.length - 1][toCurrency.key]) ||
    1;
  const onValueChange = (e) => {
    const { value, name } = e.target;
    name === "toValue"
      ? dispatch(setToValue(value)) &&
        dispatch(setFromValue(normalize(`${+value.trimSpace() / curCourse}`)))
      : dispatch(setFromValue(value)) &&
        dispatch(setToValue(normalize(`${+value.trimSpace() * curCourse}`)));
  };

  // recalculate toValue if course changed
  useEffect(() => {
    dispatch(setToValue(normalize(`${+fromValue.trimSpace() * curCourse}`)));
  }, [curCourse]);

  return (
    <div className="mt-5 mb-1">
      <div
        className={cx(
          styles.inputGroup,
          "d-flex align-items-center justify-content-center align-self-center"
        )}
      >
        <div className="d-flex flex-grow-1">
          <Input
            name="fromValue"
            placeholder="0"
            className={cx(styles.input, "me-2")}
            value={fromValue}
            onChange={onValueChange}
          />
          <Typeahead
            selected={[fromCurrency]}
            id="fromCurrency"
            className="flex-grow-1"
            options={currencies}
            onChange={(v: CurrencyOption) => {
              dispatch(setFromCurrency(v[0]));
            }}
            isLoading={isLoading}
          />
        </div>
        <div className="mx-2">
          <Button variant="primary" onClick={() => dispatch(swapValues())}>
            <Arrow className={styles.arrow} />
          </Button>
        </div>
        <div className="d-flex flex-grow-1">
          <Input
            name="toValue"
            placeholder="0"
            className={cx(styles.input, "me-2")}
            value={toValue}
            onChange={onValueChange}
          />
          <Typeahead
            id="toCurrency"
            className="flex-grow-1"
            selected={[toCurrency]}
            options={currencies}
            onChange={(v: CurrencyOption) => {
              dispatch(setToCurrency(v[0]));
            }}
            isLoading={isLoading}
          />
        </div>
      </div>

      <SaveCheckbox />
    </div>
  );
};
