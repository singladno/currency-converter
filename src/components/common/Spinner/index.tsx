import React from "react";
import { Spinner as BSpinner, SpinnerProps } from "react-bootstrap";

type Props = Partial<SpinnerProps>;

export const Spinner: React.FC<Props> = (props) => (
  <BSpinner animation="border" variant="primary" {...props} />
);
