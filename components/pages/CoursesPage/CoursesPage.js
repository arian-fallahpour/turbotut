import React from "react";

import classes from "./CoursesPage.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import { join } from "@/utils/helper";
import Course from "./Course/Course";

const CoursesPage = ({ courses }) => {
  return (
    <Page>
      <Section className={classes.CoursesSection} limit={null}>
        <h1 className={join("header", "header-title", "text-center")}>Courses</h1>
        <div className={classes.Courses}>
          {courses.map((course) => (
            <Course key={"course-" + course.name} data={course} />
          ))}
        </div>
      </Section>
    </Page>
  );
};

export default CoursesPage;
