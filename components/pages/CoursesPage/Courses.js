import React from "react";
import classes from "./CoursesPage.module.scss";

import Course from "./Course/Course";

import CourseModel from "@/models/courseModel";
import APIQuery from "@/utils/APIQuery";
import { connectDB } from "@/utils/database";

async function getData() {
  await connectDB();

  const query = new APIQuery(CourseModel.find(), { isArchived: false, sort: "comingSoon,-createdAt" }).sort();
  const courses = await query.execute();

  return JSON.parse(JSON.stringify(courses));
}

const Courses = async () => {
  const courses = await getData();

  return (
    <div className={classes.Courses}>
      {courses.map((course) => (
        <Course key={"course-" + course.name} data={course} />
      ))}
    </div>
  );
};

export default Courses;
