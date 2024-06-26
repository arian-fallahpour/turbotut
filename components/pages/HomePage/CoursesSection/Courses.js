"use client";

import React, { useState } from "react";
import classes from "./CoursesSection.module.scss";

import Course from "./Course";

const Courses = ({ courses }) => {
  const [activeCourse, setActiveCourse] = useState(0);

  return (
    <div className={classes.Courses}>
      <div className={classes.CoursesInner}>
        {courses.map((course, i) => (
          <Course
            key={course._id}
            course={course}
            isActive={i === activeCourse}
            setActiveCourse={() => setActiveCourse(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
