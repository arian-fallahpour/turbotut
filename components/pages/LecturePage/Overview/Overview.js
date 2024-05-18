import React from "react";
import classes from "./Overview.module.scss";
import Image from "next/image";
import Button from "@/components/Elements/Button/Button";
const Overview = ({ course }) => {
  return (
    <div className={classes.Overview}>
      <div className={classes.OverviewImage}>
        <Image
          alt={course.name + " cover page"}
          src={`/images/courses/${course.image}`}
          fill
        />
      </div>

      <div className={classes.OverviewTitle}>
        <h2 className="header header-title text-center color-orange">
          {course.name}
        </h2>
        <h3 className="header header-card text-center">{course.subject}</h3>
      </div>

      <p className="paragraph text-center">
        {course.description || "No description"}
      </p>

      <div className={classes.Content}>
        <div className={classes.ContentHeader}>
          <h3 className="header header-section text-center">Course Content</h3>
        </div>
        <ul className={classes.ContentIntro}>
          <li className={classes.ContentIntroItem}>
            <Button styleName="text" href={`/courses/${course.slug}`} isLink>
              overview
            </Button>
          </li>
        </ul>
        <ul className={classes.ContentChapters}>
          {course.chapters.map((chp) => (
            <li key={chp.name} className={classes.ContentChapter}>
              <h4 className="header header-card">{chp.name}</h4>
              <ul className={classes.ContentLectures}>
                {chp.lectures.map((lec) => (
                  <li key={lec.name} className={classes.ContentLecture}>
                    <Button
                      styleName="text"
                      href={`/courses/${course.slug}/lecture/${lec.slug}`}
                      isLink
                    >
                      {lec.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={classes.OverviewCta}
        href="/checkout?pricing=premium"
        isLink
      >
        $14.99 per month
      </Button>
    </div>
  );
};

export default Overview;
