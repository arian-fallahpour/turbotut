import React from "react";
import { join } from "@/utils/helper";

import classes from "./Lecture.module.scss";
import Button from "@/components/Elements/Button/Button";

import EyeIcon from "@/components/Elements/Icons/EyeIcon";
import LockIcon from "@/components/Elements/Icons/LockIcon";

const Lecture = ({ name, href, isActive, isViewable, isLocked, setExpanded }) => {
  return (
    <Button
      styleName="text"
      className={join(classes.Lecture, isActive ? classes.active : null)}
      href={href}
      isLink
      replace
      onClick={() => setExpanded(false)}
    >
      {isLocked && <LockIcon />}
      {isViewable && <EyeIcon />}
      <span className={classes.LectureName}>{name}</span>
    </Button>
  );
};

export default Lecture;
