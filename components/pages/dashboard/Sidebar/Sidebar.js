"use client";

import React from "react";
import classes from "./Sidebar.module.scss";
import Button from "@/components/Elements/Button/Button";

import { join } from "@/utils/helper";

import collectionsData from "@/app/data/dashboard/collections";
import { useParams } from "next/navigation";

const Sidebar = () => {
  const params = useParams();

  return (
    <aside className={classes.Sidebar}>
      <div className={classes.SidebarHeader}>
        <h1 className="header header-section text-center color-orange">dashboard</h1>
      </div>
      <div className={classes.SidebarContent}>
        <ul className={classes.List}>
          {collectionsData.map((item) => (
            <li className={classes.Item} key={item.name}>
              <Button
                className={join(
                  classes.Link,
                  params.collection && params.collection === item.name ? classes.active : null
                )}
                href={`/dashboard/${item.name}`}
                isLink
                replace
              >
                <div className={classes.LinkIcon}>{item.icon}</div>
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
