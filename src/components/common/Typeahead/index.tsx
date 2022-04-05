import React, { useEffect, useRef, useState } from "react";

import {
  Highlighter,
  Typeahead as BTypeahead,
} from "react-bootstrap-typeahead";
import { Option } from "react-bootstrap-typeahead/types/types";
import { TypeaheadComponentProps } from "react-bootstrap-typeahead/types/components/Typeahead";
import styles from "./index.module.scss";
import "./index.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { CurrencyOption } from "@/api/currencyApi";
import cx from "classnames";

interface Props extends Partial<TypeaheadComponentProps> {
  isLoading?: boolean;
  className?: string;
}

const TYPEAHEAD_PLACEHOLDER = "USD, EUR, IDR...";

export const Typeahead: React.FC<Props> = ({
  options = [],
  onChange: onOuterChange = () => {
    /**/
  },
  isLoading = false,
  className,
  selected: outerSelected,
  ...rest
}) => {
  useEffect(() => {
    outerSelected && setSelected(outerSelected);
  }, [outerSelected]);
  const [selected, setSelected] = useState<Option[]>([]);
  const ref = useRef<HTMLDivElement>();
  const [input, setInput] = useState("");

  const menuItem = (option: CurrencyOption) => (
    <div>
      <Highlighter search={input}>
        {option?.key?.toUpperCase() || ""}
      </Highlighter>
      <div className={cx(styles.optionSmall, "mx-2")}>
        <small>
          <Highlighter search={input}>{option.label || ""}</Highlighter>
        </small>
      </div>
    </div>
  );

  const onChange = (v) => {
    setSelected(v);
    if (!!v.length) {
      onOuterChange(v);
      ref.current?.blur();
    }
  };
  return (
    <BTypeahead
      disabled={isLoading}
      renderMenuItemChildren={menuItem}
      filterBy={["key", "label"]}
      isLoading={isLoading}
      placeholder={!isLoading ? TYPEAHEAD_PLACEHOLDER : ""}
      labelKey={(option: CurrencyOption) => `${option.key?.toUpperCase()}`}
      minLength={1}
      ref={ref as any}
      onInputChange={setInput}
      onChange={(v) => onChange(v)}
      options={options}
      selected={selected}
      className={className}
      {...rest}
    />
  );
};
