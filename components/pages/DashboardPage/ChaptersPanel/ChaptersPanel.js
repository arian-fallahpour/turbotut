import React from "react";
import classes from "./ChaptersPanel.module.scss";
import classesDataTable from "../DataTable.module.scss";

import ChaptersMore from "./ChaptersMore";
import Button from "@/components/Elements/Button/Button";
import Table, {
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/Elements/Table/Table";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Chapter from "@/models/chapterModel";
import { connectDB } from "@/utils/database";
import { join } from "@/utils/helper";

async function getData() {
  await connectDB();

  const chapters = await Chapter.find().populate({
    path: "course",
    select: { name: 1 },
  });

  return JSON.parse(JSON.stringify(chapters));
}

const ChaptersPanel = async () => {
  const chapters = await getData();

  return (
    <div className={classes.ChaptersPanel}>
      <div className={classesDataTable.Container}>
        <div className={classesDataTable.Header}>
          <h2 className="header header-section">chapters</h2>
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
            <TableHeader>course</TableHeader>
            <TableHeader>lectures</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>

          {chapters.map((chapter) => (
            <TableRow
              key={chapter.slug}
              className={join(classesDataTable.TableRow, classes.TableRow)}
            >
              <TableCell>{chapter.name}</TableCell>
              <TableCell>{chapter.course.name}</TableCell>
              <TableCell>{chapter.lectures.length}</TableCell>
              <TableCell className={classesDataTable.TableEnd}>
                <ChaptersMore chapter={chapter} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default ChaptersPanel;
