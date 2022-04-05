import React, { ChangeEventHandler, ComponentProps, useRef } from "react";
import Form from "react-bootstrap/Form";

type Props = ComponentProps<typeof Form.Control> & {
  value: string;
};

String.prototype.trimSpace = function () {
  return this.replace(/\s/g, "");
};

export const Input: React.FC<Props> = ({ onChange, value, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null);
  const applyMask = (str: string) =>
    str.replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, " ").replace(/\,/, "");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    onChange?.({
      ...e,
      target: { ...e.target, value: applyMask(value.trimSpace()), name },
    });
  };

  return (
    <Form.Control
      {...rest}
      onChange={handleChange}
      ref={ref}
      value={applyMask(value)}
    />
  );
};
