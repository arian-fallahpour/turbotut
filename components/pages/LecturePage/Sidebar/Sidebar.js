"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import classes from "./Sidebar.module.scss";
import { join } from "@/utils/helper";

import Chapter from "../Chapter/Chapter";
import Button from "@/components/Elements/Button/Button";
import Lecture from "../Lecture/Lecture";

import MenuIcon from "@/components/Elements/Icons/MenuIcon";
import WestIcon from "@/components/Elements/Icons/WestIcon";
import EastIcon from "@/components/Elements/Icons/EastIcon";
import CloseIcon from "@/components/Elements/Icons/CloseIcon";

const Sidebar = ({ course, session }) => {
  const { lectureSlug } = useParams();
  const [expanded, setExpanded] = useState(false);

  const { prevUrl, nextUrl } = findAdjacentLectures(course, lectureSlug);

  const onExpandHandler = () => setExpanded((p) => !p);

  useEffect(() => setExpanded(false), []);

  return (
    <aside className={join(classes.Sidebar, expanded ? classes.expanded : null)}>
      <div className={classes.SidebarControls}>
        <Button
          className={classes.SidebarClose}
          styleName="transparent"
          size="large"
          onClick={onExpandHandler}
          aria-label="menu"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className={classes.SidebarContainer}>
        <div className={classes.SidebarHeader}>
          <h1 className={"header header-section color-orange"}>{course.name}</h1>
          <Button styleName="transparent" onClick={onExpandHandler}>
            <CloseIcon />
          </Button>
        </div>
        <div className={classes.SidebarContent}>
          <div className={classes.SidebarIntro}>
            <ul className={classes.Intro}>
              <li className={classes.IntroItem}>
                <Lecture
                  name="overview"
                  href={`/courses/${course.slug}`}
                  isActive={!lectureSlug}
                  setExpanded={setExpanded}
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
                    session={session}
                    chapter={chapter}
                    lectureSlug={lectureSlug}
                    setExpanded={setExpanded}
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
