"use client";

import React, { useState } from "react";

import classes from "./Sidebar.module.scss";
import Chapter from "../Chapter/Chapter";
import Button from "@/components/Elements/Button/Button";
import Lecture from "../Lecture/Lecture";
import { join } from "@/utils/helper";

import { useParams } from "next/navigation";

import MenuIcon from "@/components/Elements/Icons/MenuIcon";
import WestIcon from "@/components/Elements/Icons/WestIcon";
import EastIcon from "@/components/Elements/Icons/EastIcon";

const Sidebar = ({ course }) => {
  const { lectureSlug } = useParams();
  const [expanded, setExpanded] = useState(false);

  const { prevUrl, nextUrl } = findAdjacentLectures(course, lectureSlug);

  const onExpandHandler = () => setExpanded((p) => !p);

  return (
    <aside
      className={join(classes.Sidebar, expanded ? classes.expanded : null)}
    >
      <div className={classes.SidebarHeader}>
        <h1 className={"header header-section color-orange"}>{course.name}</h1>
        <Button
          styleName="transparent"
          className={classes.SidebarExpand}
          onClick={onExpandHandler}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className={classes.SidebarContainer}>
        <div className={classes.SidebarContent}>
          <div className={classes.SidebarIntro}>
            <ul className={classes.Intro}>
              <li className={classes.IntroItem}>
                <Lecture
                  name="overview"
                  href={`/courses/${course.slug}`}
                  isActive={!lectureSlug}
                />
              </li>
            </ul>
          </div>

          <div className={classes.SidebarChapters}>
            <div className={classes.Chapters}>
              {course.chapters.length > 0 &&
                course.chapters.map((chapter) => (
                  <Chapter
                    key={"chapter-" + chapter.name}
                    course={course}
                    chapter={chapter}
                    lectureSlug={lectureSlug}
                  />
                ))}
            </div>
          </div>
        </div>

        <nav className={classes.SidebarNav}>
          <Button
            className={classes.SidebarNavButton}
            styleName="glass"
            variantName="white"
            href={prevUrl ? prevUrl : null}
            isLink={!!prevUrl}
            disabled={!prevUrl}
          >
            <WestIcon />
          </Button>
          <Button
            className={classes.SidebarNavButton}
            styleName="glass"
            variantName="white"
            href={nextUrl ? nextUrl : null}
            isLink={!!nextUrl}
            disabled={!nextUrl}
          >
            <EastIcon />
          </Button>
        </nav>
      </div>
    </aside>
  );
};

function findAdjacentLectures(course, lectureSlug) {
  const lectureUrls = [`/courses/${course.slug}`]; // overview at index 0

  let count = 0,
    prevIndex,
    nextIndex;

  for (let i = 0; i < course.chapters.length; i++) {
    for (let j = 0; j < course.chapters[i].lectures.length; j++) {
      const lecture = course.chapters[i].lectures[j];
      lectureUrls.push(`/courses/${course.slug}/lecture/${lecture.slug}`);
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
