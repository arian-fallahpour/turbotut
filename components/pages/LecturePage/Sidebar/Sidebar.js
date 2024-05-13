import React from "react";
import classes from "./Sidebar.module.scss";
import Chapter from "../Chapter/Chapter";
import Button from "@/components/Elements/Button/Button";
import Lecture from "../Lecture/Lecture";

import WestRoundedIcon from "@mui/icons-material/WestRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { join } from "@/utils/helper";

const Sidebar = ({ course, lectureSlug }) => {
  const { prevUrl, nextUrl } = findAdjacentLectures(course, lectureSlug);

  return (
    <aside className={classes.Sidebar}>
      <div className={classes.SidebarHeader}>
        <h1 className={"header header-section text-center color-orange"}>
          {course.name}
        </h1>
      </div>

      <div className={classes.SidebarContent}>
        {/* Intro */}
        <div className={classes.SidebarIntro}>
          <ul className={join("ul", classes.Intro)}>
            <li className={join("li", classes.IntroItem)}>
              <Lecture
                name="overview"
                href={`/courses/${course.slug}`}
                isActive={!lectureSlug}
              />
            </li>
          </ul>
        </div>

        {/* Chapters */}

        <div className={classes.SidebarChapters}>
          <div className={classes.Chapters}>
            {course.chapters.length > 0 ? (
              course.chapters.map((chapter) => (
                <Chapter
                  key={"chapter-" + chapter.name}
                  course={course}
                  chapter={chapter}
                  lectureSlug={lectureSlug}
                />
              ))
            ) : (
              // TODO: Fix error message
              <div>No lectures so far!</div>
            )}
          </div>
        </div>
      </div>
      <nav className={classes.SidebarNav}>
        <Button
          styleName="Border"
          variantName="orange"
          href={prevUrl ? prevUrl : null}
          isLink={!!prevUrl}
          disabled={!prevUrl}
        >
          <WestRoundedIcon fontSize="inherit" />
        </Button>
        <Button
          styleName="Border"
          variantName="orange"
          href={nextUrl ? nextUrl : null}
          isLink={!!nextUrl}
          disabled={!nextUrl}
        >
          <EastRoundedIcon fontSize="inherit" />
        </Button>
      </nav>
    </aside>
  );
};

function findAdjacentLectures(course, lectureSlug) {
  const lectureUrls = [`/courses/${course.name}`]; // overview at index 0

  let count = 0,
    prevIndex,
    nextIndex;

  for (let i = 0; i < course.chapters.length; i++) {
    for (let j = 0; j < course.chapters[i].lectures.length; j++) {
      const lecture = course.chapters[i].lectures[j];
      lectureUrls.push(`/courses/${course.name}/lecture/${lecture.slug}`);
      count += 1;

      if (!lectureSlug) {
        nextIndex = 1;
        break;
      }

      if (lecture.slug === lectureSlug) {
        prevIndex = count - 1;
        nextIndex = count + 1;
      }
    }
  }

  return {
    prevUrl: lectureUrls[prevIndex],
    nextUrl: lectureUrls[nextIndex],
  };
}

export default Sidebar;
