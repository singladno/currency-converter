import React from "react";
import { Course } from "@/components/Main/Course";
import { CourseChart } from "@/components/Main/Course/CourseChart";
import { Spinner } from "@/components/common/Spinner";
import { coursesLoadingSelector } from "@/selectors";

export const ContentBlock: React.FC = () => {
  const isLoading = coursesLoadingSelector();
  return (
    <>
      {isLoading ? (
        <Spinner className="position-absolute top-0 start-0 end-0 bottom-0 m-auto" />
      ) : (
        <>
          <Course />
          <CourseChart />
        </>
      )}
    </>
  );
};
