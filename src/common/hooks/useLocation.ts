import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppTranslate } from "@/common/hooks/useTranslate";
import { useAppDispatch } from "@/actions";
import { setFromCurrency, setToCurrency } from "@/reducers/currencySlice";
import { currenciesSelector } from "@/selectors";
import { getCookie } from "@/common/helpers/cokiies";
import { Cookies } from "@/common/contants";

type GeoInfo = {
  currency: {
    code: string;
  };
};

export const useLocation = () => {
  const [geo, setGeo] = useState<GeoInfo>();
  const { t } = useAppTranslate();
  const dispatch = useAppDispatch();
  const currencies = currenciesSelector();
  const fetchLocation = async () => {
    const isCurrencySaved = getCookie(Cookies.CURRENCY_SAVED);
    let from, to;
    if (isCurrencySaved) {
      from = getCookie(Cookies.CURRENCY_FROM);
      to = getCookie(Cookies.CURRENCY_TO);
      to && dispatch(setToCurrency(to));
      from && dispatch(setFromCurrency(from));
    } else {
      const res = await fetch(
        "https://api.ipregistry.co/?key=i8h2yvoeci0c4dqa"
      );
      if (!res.ok) {
        toast(t("LOCATION.ERROR"), { type: "error" });
      } else {
        const data: GeoInfo = await res.json();
        from =
          currencies.find(
            (currency) => currency.key === data.currency.code.toLowerCase()
          ) || currencies.find((currency) => currency.key === "rub");

        from && dispatch(setFromCurrency(from));
        return data;
      }
    }
  };
  useEffect(() => {
    if (!!currencies.length) {
      fetchLocation().then(setGeo);
    }
  }, [currencies]);

  return { currency: geo?.currency?.code };
};
