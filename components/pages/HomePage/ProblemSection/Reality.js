import React from "react";
import classes from "./ProblemSection.module.scss";
import { join } from "@/utils/helper";

const Reality = () => {
  return (
    <div className={join(classes.Reality, classes.Content)}>
      <h2 className="header header-section text-center">The reality</h2>
      <ul className={classes.RealityList}>
        <li className={classes.RealityListItem}>
          <span className="text-emoji">🕒</span>
          <p className="paragraph">You have a limited amount of time for in-depth learning</p>
        </li>
        <li className={classes.RealityListItem}>
          <span className="text-emoji">📚</span>
          <p className="paragraph">You are pressured to excel in too many subjects</p>
        </li>
        <li className={classes.RealityListItem}>
          <span className="text-emoji">📉</span>
          <p className="paragraph">You are unable to learn effectively through traditional methods</p>
        </li>
        <li className={classes.RealityListItem}>
          <span className="text-emoji">🪖</span>
          <p className="paragraph">You are not given the right material to prepare for tests</p>
        </li>
      </ul>
    </div>
  );
};

export default Reality;
