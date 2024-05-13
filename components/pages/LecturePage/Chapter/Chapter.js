import React from "react";
import classes from "./Chapter.module.scss";
import { join } from "@/utils/helper";

import Lecture from "../Lecture/Lecture";

const Chapter = ({ course, chapter, lectureSlug, color }) => {
  return (
    <div className={classes.Chapter}>
      <h2 className={join("header", "header-card", classes.ChapterHeader)}>
        {chapter.name}
      </h2>

      <ul className={join("ul", classes.Lectures)}>
        {chapter.lectures?.length > 0 &&
          chapter.lectures.map((lecture) => (
            <li
              key={"lecture-" + lecture.name}
              className={join("li", classes.Lecture)}
            >
              <Lecture
                name={lecture.name}
                href={`/courses/${course.slug}/lecture/${lecture.slug}`}
                isActive={lecture.slug === lectureSlug}
                color={color}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Chapter;
