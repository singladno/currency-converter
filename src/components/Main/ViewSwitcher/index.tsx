import React from "react";
import { Nav } from "react-bootstrap";
import { ViewType } from "@/reducers/view";
import { useAppTranslate } from "@/common/hooks/useTranslate";
import { setView } from "@/reducers/view";
import { useAppDispatch } from "@/actions";
import { coursesSelector, viewSelector } from "@/selectors";

export const ViewSwitcher: React.FC = () => {
  const { t } = useAppTranslate();
  const dispatch = useAppDispatch();
  const courses = coursesSelector();
  const view = viewSelector();
  return (
    (!!courses.length && (
      <Nav
        justify
        variant="tabs"
        className="w-75 align-self-center"
        onSelect={(v) => dispatch(setView(v as ViewType))}
        activeKey={view}
      >
        {Object.keys(ViewType).map((key) => {
          const eventKey = ViewType[key];
          return (
            <Nav.Item key={eventKey}>
              <Nav.Link eventKey={eventKey}>{t(eventKey)}</Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    )) || <></>
  );
};
