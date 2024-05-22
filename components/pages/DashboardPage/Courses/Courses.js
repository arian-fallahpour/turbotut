import React from "react";
import classes from "./Courses.module.scss";
import Table from "../Table/Table";
import Course from "@/models/courseModel";

async function getData() {
  const courses = await Course.find();

  return courses;
}

const Courses = async () => {
  const courses = await getData();
  console.log(courses);

  const columns = [
    {
      key: "name",
      width: "10rem",
    },
    {
      key: "subject",
      width: "7rem",
    },
    {
      key: "chaptersCount",
      width: "3rem",
    },
    {
      key: "lecturesCount",
      width: "3rem",
    },
  ];

  return (
    <div className={classes.Courses}>
      <div className={classes.CoursesHeader}>
        <h1 className="header header-section">Courses</h1>
      </div>
      <Table name="courses" columns={["20rem"]} />
    </div>
  );
};

export default Courses;
