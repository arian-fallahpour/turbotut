import React from "react";
import classes from "./Sidebar.module.scss";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";

const Sidebar = () => {
  return (
    <aside className={classes.Sidebar}>
      <header className={classes.SidebarHeader}>
        <h1 className="header header-section">dashboard</h1>
      </header>
      <main className={classes.SidebarMain}>
        <ul className={classes.SidebarList}>
          <li className={classes.SidebarListItem}>
            <Button className={classes.SidebarLink}>Courses</Button>
          </li>
          <li className={classes.SidebarListItem}>
            <Button className={join(classes.SidebarLink, classes.active)}>
              Orders
            </Button>
          </li>
          <li className={classes.SidebarListItem}>
            <Button className={classes.SidebarLink}>Users</Button>
          </li>
        </ul>
      </main>
    </aside>
  );
};

export default Sidebar;
