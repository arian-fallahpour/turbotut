import React from "react";
import classes from "./ChaptersPanel.module.scss";
import dataTableClasses from "../DataTable.module.scss";

import Button from "@/components/Elements/Button/Button";
import Table, {
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/Elements/Table/Table";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { join } from "@/utils/helper";

import Chapter from "@/models/chapterModel";
import { connectDB } from "@/utils/database";

async function getData() {
  await connectDB();

  const chapters = await Chapter.find().populate({
    path: "course",
    select: { name: 1 },
  });

  return chapters;
}

const ChaptersPanel = async () => {
  const chapters = await getData();

  return (
    <div className={classes.ChaptersPanel}>
      <div className={dataTableClasses.Container}>
        <div className={dataTableClasses.Header}>
          <h2 className="header header-section">chapters</h2>
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
            <TableHeader>course</TableHeader>
            <TableHeader>lectures</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>

          {chapters.map((chapter) => (
            <TableRow
              key={chapter.slug}
              className={join(dataTableClasses.TableRow, classes.TableRow)}
            >
              <TableCell>{chapter.name}</TableCell>
              <TableCell>{chapter.course.name}</TableCell>
              <TableCell>{chapter.lectures.length}</TableCell>
              <TableCell className={dataTableClasses.TableEnd}>
                {/* <Button
                  className={dataTableClasses.TableMore}
                  styleName="glass"
                  variantName="white"
                >
                  <MoreVertRoundedIcon fontSize="inherit" />
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default ChaptersPanel;
