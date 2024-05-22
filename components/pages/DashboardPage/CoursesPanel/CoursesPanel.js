import React from "react";
import classes from "./CoursesPanel.module.scss";
import dataTableClasses from "../DataTable.module.scss";
import { join } from "@/utils/helper";

import Course from "@/models/courseModel";
import Button from "@/components/Elements/Button/Button";
import Table, {
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/Elements/Table/Table";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { connectDB } from "@/utils/database";
import CourseMore from "./CourseMore";

async function getData() {
  await connectDB();

  const courses = await Course.find();

  return courses;
}

const Courses = async () => {
  const courses = await getData();

  return (
    <div className={classes.CoursesPanel}>
      <div className={dataTableClasses.Container}>
        <div className={dataTableClasses.Header}>
          <h2 className="header header-section">Courses</h2>
          <Button className={dataTableClasses.HeaderAdd}>
            <AddRoundedIcon fontSize="inherit" />
          </Button>
        </div>
        <Table className={dataTableClasses.Table}>
          <TableRow
            className={join(
              dataTableClasses.TableRow,
              dataTableClasses.TableRowHeader,
              classes.TableRow
            )}
          >
            <TableHeader>name</TableHeader>
            <TableHeader>subject</TableHeader>
            <TableHeader>lectures</TableHeader>
            <TableHeader>chapters</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>

          {courses.map((course) => (
            <TableRow
              key={course.slug}
              className={join(dataTableClasses.TableRow, classes.TableRow)}
            >
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.subject}</TableCell>
              <TableCell>{course.lecturesCount}</TableCell>
              <TableCell>{course.chaptersCount}</TableCell>
              <TableCell className={dataTableClasses.TableEnd}>
                {/* <CourseMore course={course} /> */}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Courses;
