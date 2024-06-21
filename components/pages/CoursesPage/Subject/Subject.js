import React from "react";
import classes from "./Subject.module.scss";

import { join } from "@/utils/helper";
import Course from "../Course/Course";

import subjects from "@/app/data/subjects.json";

const Subject = ({ subject, courses }) => {
  const { emoji, color } = subjects[subject];

  return (
    <div className={join(classes.Subject, classes[`Subject--${color}`])}>
      <div className={classes.SubjectHeader}>
        <h2 className={join("header", "header-section", classes.SubjectTitle)}>
          {`${subject} ${emoji}`}
        </h2>
      </div>
      <div className={classes.SubjectContainer}>
        <div className={classes.SubjectCourses}>
          {courses.map((course) => (
            <Course key={"course-" + course.name} data={course} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subject;
