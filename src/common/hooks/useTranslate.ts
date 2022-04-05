import { useTranslation } from "react-i18next";

export const useAppTranslate = () => {
  const { t } = useTranslation("app");
  return { t };
};
