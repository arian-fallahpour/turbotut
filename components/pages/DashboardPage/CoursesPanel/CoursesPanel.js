import React from "react";
import classes from "./CoursesPanel.module.scss";
import classesDataTable from "../DataTable.module.scss";

import Course from "@/models/courseModel";
import CourseMore from "./CourseMore";
import Button from "@/components/Elements/Button/Button";
import Table, {
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/Elements/Table/Table";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { connectDB } from "@/utils/database";
import { join } from "@/utils/helper";

async function getData() {
  await connectDB();

  const courses = await Course.find();

  return JSON.parse(JSON.stringify(courses));
}

const Courses = async () => {
  const courses = await getData();

  return (
    <div className={classes.CoursesPanel}>
      <div className={classesDataTable.Container}>
        <div className={classesDataTable.Header}>
          <h2 className="header header-section">Courses</h2>
        </div>

        <Table className={classesDataTable.Table}>
          <TableRow
            className={join(
              classesDataTable.TableRow,
              classesDataTable.TableRowHeader,
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
              className={join(classesDataTable.TableRow, classes.TableRow)}
            >
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.subject}</TableCell>
              <TableCell>{course.lecturesCount}</TableCell>
              <TableCell>{course.chaptersCount}</TableCell>
              <TableCell className={classesDataTable.TableEnd}>
                <CourseMore course={course} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Courses;
