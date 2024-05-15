import React from "react";
import classes from "./DashboardSection.module.scss";

import Section from "@/components/Elements/Section/Section";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

const DashboardSection = () => {
  return (
    <Section limit={null} className={classes.DashboardSection}>
      <Sidebar />
      <Main />
    </Section>
  );
};

export default DashboardSection;
