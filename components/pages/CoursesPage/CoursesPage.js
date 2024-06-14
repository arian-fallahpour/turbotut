import React, { useMemo } from "react";

import classes from "./CoursesPage.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import { join } from "@/utils/helper";
import Subject from "./Subject/Subject";
import Course from "./Course/Course";

// Organizes courses into an array of subjects
const organize = (courses) => {
  const subjects = {};

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    // Push course to end if comingSoon
    if (course.comingSoon && !course.moved) {
      course.moved = true;
      courses.splice(i, 1);
      courses.push(course);
      i -= 1;
    }

    // Create new subject and add course to it
    else if (!subjects[course.subject]) {
      subjects[course.subject] = [course];
    }

    // Add course to the subject
    else {
      subjects[course.subject].push(course);
    }
  }

  return subjects;
};

const CoursesPage = ({ courses }) => {
  const subjects = useMemo(() => organize(courses), [courses]);

  return (
    <Page>
      <Section className={classes.CoursesSection} limit={null}>
        <h1 className={join("header", "header-title", "text-center")}>
          Courses
        </h1>
        <div className={classes.Courses}>
          {courses.map((course) => (
            <Course key={"course-" + course.name} data={course} />
          ))}
        </div>

        {/* Math */}
        {/* <div className={classes.Subjects}>
          {Object.keys(subjects).map((subject) => (
            <Subject
              key={"subject-" + subject}
              courses={subjects[subject]}
              subject={subject}
            />
          ))}
        </div> */}
      </Section>
    </Page>
  );
};

export default CoursesPage;
