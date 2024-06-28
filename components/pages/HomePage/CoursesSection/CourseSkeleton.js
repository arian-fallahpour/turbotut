import React from "react";
import classes from "./CoursesSection.module.scss";

const CourseSkeleton = () => {
  return (
    <div className={classes.Courses}>
      <div className={classes.CoursesInner}>
        <div className={classes.CourseSkeleton} />
        <div className={classes.CourseSkeleton} />
        <div className={classes.CourseSkeleton} />
      </div>
    </div>
  );
};

export default CourseSkeleton;
