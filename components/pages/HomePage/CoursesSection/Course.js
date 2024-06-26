import React from "react";
import classes from "./CoursesSection.module.scss";
import Reveal from "@/components/Elements/Reveal/Reveal";
import { join } from "@/utils/helper";
import Image from "next/image";
import Button from "@/components/Elements/Button/Button";

const Course = ({ course, isActive, setActiveCourse }) => {
  return (
    <div
      className={join(classes.Course, isActive ? classes.active : null)}
      onMouseEnter={setActiveCourse}
      onFocus={setActiveCourse}
      aria-expanded={isActive}
      tabIndex="0"
    >
      <Image
        className={classes.CourseImage}
        src={course.image || "/images/courses/default.png"}
        alt={`${course.name} cover`}
        fill
      />
      <div className={classes.CourseContent}>
        <div className={classes.CourseName}>
          <h3 className={join("header", "header-section", classes.CourseName)}>{course.name}</h3>
        </div>
        <Reveal className={classes.CourseInfo} innerProps={{ className: classes.CourseInfoOuter }} revealed={isActive}>
          <div className={classes.CourseInfoInner}>
            <h4 className={join("header", "header-text", classes.CourseSubject)}>{course.subject}</h4>
            <p className="paragraph">{course.description}</p>
            <Button
              className={classes.CourseButton}
              styleName="glass"
              variantName="white"
              href={`/courses/${course.slug}`}
              isLink
            >
              View course
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Course;
