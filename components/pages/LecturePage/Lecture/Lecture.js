import React from "react";
import { join } from "@/utils/helper";

import classes from "./Lecture.module.scss";
import Button from "@/components/Elements/Button/Button";

const Lecture = ({ name, href, isActive }) => {
  return (
    <Button
      styleName="text"
      className={join(classes.Lecture, isActive ? classes.active : null)}
      href={href}
      isLink
      replace
    >
      <span className={classes.LectureName}>{name}</span>
    </Button>
  );
};

export default Lecture;
