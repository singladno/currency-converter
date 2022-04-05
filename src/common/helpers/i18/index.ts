import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from "./ru.json";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        app: en,
      },
      ru: {
        app: ru,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    debug: true,
  });
