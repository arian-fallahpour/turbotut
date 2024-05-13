import React from "react";
import classes from "./Course.module.scss";

import Image from "next/image";
import { join } from "@/utils/helper";
import Link from "next/link";
import Button from "@/components/Elements/Button/Button";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const Course = ({ data, color }) => {
  return (
    <Link
      href={`/courses/${data.slug}`}
      className={join(
        classes.Course,
        data.unreleased ? classes.unreleased : null,
        classes[`Course--${color}`]
      )}
    >
      <article className={classes.CourseContainer}>
        <div className={classes.CourseHeader}>
          <div className={classes.CourseImage}>
            <Image
              src={`/images/courses/${data.image}`}
              alt="calculations"
              fill
            />
          </div>
          {data.unreleased && (
            <div className={classes.CourseUnreleased}>
              <span>Coming soon!</span>
            </div>
          )}
          <h3 className={join("header", "header-card", classes.CourseName)}>
            {data.name}
          </h3>
        </div>
        <div className={classes.CourseContent}>
          <div className={classes.CourseInfo}>
            <span className={join(`color-${color}`, classes.CourseCount)}>
              {data.chaptersCount || "0"}
            </span>
            <h4 className="header header-text">Chapters</h4>
          </div>
          <div className={classes.CourseInfo}>
            <span className={join(`color-${color}`, classes.CourseCount)}>
              {data.lecturesCount || "0"}
            </span>
            <h4 className="header header-text">Lectures</h4>
          </div>

          <Button
            className={classes.CourseButton}
            styleName="circle"
            variantName={color}
          >
            <PlayArrowRoundedIcon fontSize="inherit" />
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default Course;
