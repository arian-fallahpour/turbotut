"use client";

import React from "react";
import More from "../More/More";

const CourseMore = ({ course }) => {
  const actions = [
    {
      key: "add chapter",
      onClick: () => {
        console.log("hi");
      },
    },
    {
      key: "delete",
      color: "red",
      onClick: () => {
        console.log("hi");
      },
    },
  ];

  return <More actions={actions} />;
};

export default CourseMore;
