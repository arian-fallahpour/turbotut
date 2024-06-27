import React from "react";
import classes from "./Chapter.module.scss";
import { join } from "@/utils/helper";

import Lecture from "../Lecture/Lecture";

const Chapter = async ({ course, session, chapter, lectureSlug, color }) => {
  const hasPremium = session && session.user && session.user.subscription === "premium";

  return (
    <div className={classes.Chapter}>
      <h2 className={join("header", "header-card", classes.ChapterHeader)}>{chapter.name}</h2>

      <ul className={classes.Lectures}>
        {chapter.lectures?.length > 0 &&
          chapter.lectures.map((lecture) => (
            <li key={"lecture-" + lecture.name} className={classes.Lecture}>
              <Lecture
                name={lecture.name}
                href={`/courses/${course.slug}/lecture/${lecture.slug}#lecture-content`}
                isActive={lecture.slug === lectureSlug}
                color={color}
                isLocked={!hasPremium && lecture.type === "paid"}
                isViewable={!hasPremium && lecture.type === "free"}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Chapter;
