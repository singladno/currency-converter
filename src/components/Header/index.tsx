import React from "react";
import { useAppTranslate } from "@/common/hooks/useTranslate";
import styles from "./index.module.scss";

export const Header: React.FC = () => {
  const { t } = useAppTranslate();
  return <header className={styles.header}>{t("HEADER.TITLE")}</header>;
};
