import React from "react";
import classes from "./CoursesSection.module.scss";

import Course from "./Course";

const Courses = ({ courses }) => {
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
