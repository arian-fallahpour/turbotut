import React from "react";
import classes from "./CoursesSection.module.scss";

import Course from "./Course";

import { connectDB } from "@/utils/database";
import CourseModel from "@/models/courseModel";
import APIQuery from "@/utils/APIQuery";
import queryString from "query-string";

async function getData() {
  await connectDB();

  const query = new APIQuery(
    CourseModel.find(),
    queryString.parse({ isArchived: false, sort: "comingSoon,-createdAt" })
  )
    .sort()
    .filter();
  const courses = await query.execute();

  return JSON.parse(JSON.stringify(courses));
}

const Courses = async () => {
  const courses = await getData();

  return (
    <div className={classes.Courses}>
      <div className={classes.CoursesInner}>
        {courses.map((course, i) => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
