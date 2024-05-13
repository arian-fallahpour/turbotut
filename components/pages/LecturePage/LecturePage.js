import React from "react";
import classes from "./LecturePage.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Sidebar from "./Sidebar/Sidebar";
import LectureContent from "./LectureContent/LectureContent";
import Overview from "./Overview/Overview";

// Added to prevent error
import Course from "@/models/courseModel";
import Chapter from "@/models/chapterModel";
import Lecture from "@/models/lectureModel";
import { connectDB } from "@/utils/database";

const getData = async (courseSlug) => {
  await connectDB();

  const course = await Course.findOne({ slug: courseSlug })
    .select({
      name: 1,
      subject: 1,
      image: 1,
      description: 1,
      chapters: 1,
      slug: 1,
    })
    .populate({
      path: "chapters",
      select: { name: 1, lectures: 1 },
      populate: {
        path: "lectures",
        select: { name: 1, slug: 1 },
      },
    });
  if (!course) throw new Error("Course not found");

  const data = JSON.parse(JSON.stringify(course));

  // TODO: Check if user has bought the course
  data.isBought = false; // placeholder for now

  return data;
};

const LecturePage = async ({ params, isOverview }) => {
  const course = await getData(params.courseSlug);
  const lecture = findLecture(course, params.lectureSlug);

  return (
    <Page background="flat">
      <Section limit={null} className={classes.LectureSection}>
        <div className={classes.LectureSectionSidebar}>
          <Sidebar course={course} lectureSlug={params.lectureSlug} />
        </div>
        <div className={classes.LectureSectionContent}>
          {isOverview ? (
            <Overview course={course} />
          ) : (
            <LectureContent lecture={lecture} />
          )}
        </div>
      </Section>
    </Page>
  );
};

function findLecture(course, lectureSlug) {
  let lecture;

  for (let i = 0; i < course.chapters.length; i++) {
    if (lecture) break;
    for (let j = 0; j < course.chapters[i].lectures.length; j++) {
      if (course.chapters[i].lectures[j].slug === lectureSlug) {
        lecture = course.chapters[i].lectures[j];
        break;
      }
    }
  }

  return lecture;
}

export default LecturePage;
