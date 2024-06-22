import React from "react";

import LectureContent from "./LectureContent/LectureContent";
import Overview from "./Overview/Overview";
import { fetchCourse } from "@/utils/dataFetch";
import { redirect } from "next/navigation";

const LecturePage = async ({ params, isOverview }) => {
  const { courseSlug, lectureSlug } = params;

  const course = await fetchCourse(courseSlug);
  const lecture = findLecture(course, lectureSlug);

  // Redirect user if not overview and no lecture found
  if (!isOverview && !lecture) redirect(`/courses/${course.slug}`);

  if (isOverview) {
    return <Overview course={course} />;
  } else {
    return <LectureContent lecture={lecture} />;
  }
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
