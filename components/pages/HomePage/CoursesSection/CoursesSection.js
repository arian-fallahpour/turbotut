import React from "react";
import classes from "./CoursesSection.module.scss";
import { connectDB } from "@/utils/database";

import Section from "@/components/Elements/Section/Section";

import CourseModel from "@/models/courseModel";
import Courses from "./Courses";
import APIQuery from "@/utils/APIQuery";
import queryString from "query-string";

async function getData() {
  await connectDB();

  const query = new APIQuery(CourseModel.find(), queryString.parse({ isArchived: false })).sort().filter();
  const courses = await query.execute();

  return JSON.parse(JSON.stringify(courses));
}

const CoursesSection = async () => {
  const courses = await getData();

  return (
    <Section className={classes.CoursesSection} limit={null}>
      <h2 className="header header-title text-center color-orange">Courses</h2>
      <Courses courses={courses} />
    </Section>
  );
};

export default CoursesSection;
