import React, { Suspense } from "react";
import classes from "./CoursesSection.module.scss";

import Section from "@/components/Elements/Section/Section";

import Courses from "./Courses";
import CourseSkeleton from "./CourseSkeleton";

const CoursesSection = () => {
  return (
    <Section className={classes.CoursesSection} limit={null}>
      <h2 className="header header-title text-center color-orange">Courses</h2>
      <Suspense fallback={<CourseSkeleton />}>
        <Courses />
      </Suspense>
    </Section>
  );
};

export default CoursesSection;
