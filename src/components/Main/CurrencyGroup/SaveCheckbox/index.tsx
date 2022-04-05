import React, { useEffect, useRef } from "react";
import { getCookie, setCookie } from "@/common/helpers/cokiies";
import { Cookies } from "@/common/contants";
import { Form } from "react-bootstrap";
import { useAppTranslate } from "@/common/hooks/useTranslate";
import { currenciesLoadedSelector, currencySelector } from "@/selectors";

export const SaveCheckbox: React.FC = () => {
  const { t } = useAppTranslate();
  const { fromCurrency, toCurrency } = currencySelector();
  const currenciesLoaded = currenciesLoadedSelector();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isCurrencySaved = getCookie(Cookies.CURRENCY_SAVED) === true;
  const firstRenderFlag = useRef(1);

  // save/delete currency values
  const handleCurrencyCookie = (e) => {
    if (!e.target.checked) {
      setCookie(Cookies.CURRENCY_FROM, "");
      setCookie(Cookies.CURRENCY_TO, "");
      setCookie(Cookies.CURRENCY_SAVED, false);
    } else {
      setCookie(Cookies.CURRENCY_TO, toCurrency);
      setCookie(Cookies.CURRENCY_FROM, fromCurrency);
      setCookie(Cookies.CURRENCY_SAVED, true);
    }
  };
  useEffect(() => {
    if (currenciesLoaded) {
      if (firstRenderFlag.current) {
        firstRenderFlag.current = 0;
        return;
      }
      setCookie(Cookies.CURRENCY_SAVED, false);
      checkboxRef?.current && (checkboxRef.current.checked = false);
    }
  }, [fromCurrency, toCurrency]);
  return (
    <Form.Group controlId="formBasicCheckbox" className="my-3">
      <Form.Check
        ref={checkboxRef}
        type="checkbox"
        label={t("SAVE_CURRENCY")}
        onChange={handleCurrencyCookie}
        defaultChecked={isCurrencySaved}
      />
    </Form.Group>
  );
};
