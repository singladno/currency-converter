import React from "react";
import styles from "./index.module.scss";
import { useAppTranslate } from "@/common/hooks/useTranslate";

export const Footer: React.FC = () => {
  const { t } = useAppTranslate();
  return <div className={styles.footer} />;
};
