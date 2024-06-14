import React from "react";
import classes from "./Sidebar.module.scss";
import Button from "@/components/Elements/Button/Button";

const Sidebar = () => {
  return (
    <aside className={classes.Sidebar}>
      <div className={classes.SidebarHeader}>
        <h1 className="header header-section text-center color-orange">
          dashboard
        </h1>
      </div>
      <div className={classes.SidebarContent}>
        <ul className={classes.List}>
          <li className={classes.Item}>
            <Button
              className={classes.Link}
              styleName="text"
              href="/dashboard/courses"
              isLink
              replace
            >
              courses
            </Button>
          </li>
          <li className={classes.Item}>
            <Button
              className={classes.Link}
              styleName="text"
              href="/dashboard/chapters"
              isLink
              replace
            >
              chapters
            </Button>
          </li>
          <li className={classes.Item}>
            <Button
              className={classes.Link}
              styleName="text"
              href="/dashboard/lectures"
              isLink
              replace
            >
              lectures
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
