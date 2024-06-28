"use client";

import React, { useState } from "react";
import classes from "./Course.module.scss";
import { join } from "@/utils/helper";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Elements/Button/Button";
import Reveal from "@/components/Elements/Reveal/Reveal";

import PlayIcon from "@/components/Elements/Icons/PlayIcon";

const Course = ({ data }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Link
      href={`/courses/${data.slug}`}
      className={join(classes.Course, data.comingSoon ? classes.unreleased : null)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <article className={classes.CourseContainer}>
        <div className={classes.CourseHeader}>
          <div className={classes.CourseImage}>
            <Image src={data.image || `/images/courses/default.png`} alt="calculations" fill />
          </div>
          {data.comingSoon && (
            <div className={classes.CourseUnreleased}>
              <span>Coming soon!</span>
            </div>
          )}

          <div className={classes.Title}>
            <h3 className={join("header", "header-card", classes.TitleName)}>{data.name}</h3>
            {data.subject !== "none" && (
              <Reveal revealed={visible}>
                <h4 className={join("header", "header-text", classes.TitleSubject)}>{data.subject}</h4>
              </Reveal>
            )}
          </div>
        </div>
        <div className={classes.CourseContent}>
          <div className={classes.CourseInfo}>
            <span className={join("color-orange", classes.CourseCount)}>{data.chaptersCount || "0"}</span>
            <h4 className="header header-text">Chapters</h4>
          </div>
          <div className={classes.CourseInfo}>
            <span className={join("color-orange", classes.CourseCount)}>{data.lecturesCount || "0"}</span>
            <h4 className="header header-text">Lectures</h4>
          </div>

          <Button className={classes.CourseButton} styleName="shiny">
            <PlayIcon />
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default Course;
