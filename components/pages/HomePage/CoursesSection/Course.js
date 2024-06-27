import React from "react";
import classes from "./CoursesSection.module.scss";

import Image from "next/image";
import Button from "@/components/Elements/Button/Button";

const Course = ({ course }) => {
  return (
    <Button className={classes.Course} tabIndex="0" href={`/courses/${course.slug}`} isLink>
      <Image
        className={classes.CourseImage}
        src={course.image || "/images/courses/default.png"}
        alt={`${course.name} cover`}
        fill
      />
      <span className={classes.CourseGradient} />
      <div className={classes.CourseContent}>
        <p className="paragraph">{course.subject}</p>
        <h3 className="header header-section">{course.name}</h3>
        <ul className={classes.CourseList}>
          <li className={classes.CourseListItem}>{course.chaptersCount} chapters</li>
          <li className={classes.CourseListItem}>{course.lecturesCount} lectures</li>
        </ul>
      </div>
    </Button>
  );
};

export default Course;
