import React from "react";
import classes from "./CoursesSection.module.scss";

import Section from "@/components/Elements/Section/Section";

const CoursesSection = () => {
  return (
    <Section className={classes.CourseSection}>
      <div className={classes.Courses}></div>
    </Section>
  );
};

export default CoursesSection;
