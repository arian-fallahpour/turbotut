import React from "react";
import { join } from "@/utils/helper";

import classes from "./Lecture.module.scss";
import Button from "@/components/Elements/Button/Button";

import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const Lecture = ({ name, href, isActive, isViewable, isLocked }) => {
  return (
    <Button
      styleName="text"
      className={join(classes.Lecture, isActive ? classes.active : null)}
      href={href}
      isLink
      replace
    >
      {isLocked && <LockIcon fontSize="inherit" />}
      {isViewable && <RemoveRedEyeRoundedIcon fontSize="inherit" />}
      <span className={classes.LectureName}>{name}</span>
    </Button>
  );
};

export default Lecture;
