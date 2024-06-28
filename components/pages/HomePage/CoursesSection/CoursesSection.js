import React from "react";
import classes from "./CoursesSection.module.scss";

import Section from "@/components/Elements/Section/Section";

import Courses from "./Courses";

const CoursesSection = () => {
  return (
    <Section className={classes.CoursesSection} limit={null}>
      <h2 className="header header-title text-center color-orange">Courses</h2>
      <Courses />
    </Section>
  );
};

export default CoursesSection;
