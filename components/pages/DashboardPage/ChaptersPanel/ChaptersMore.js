"use client";

import React from "react";
import More from "../More/More";

const ChaptersMore = ({ chapter }) => {
  const actions = [
    {
      key: "add lecture",
      onClick: () => {
        console.log("hi");
      },
    },
    {
      key: "update",
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

export default ChaptersMore;
