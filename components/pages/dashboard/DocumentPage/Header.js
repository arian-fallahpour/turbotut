"use client";

import React from "react";
import classes from "./DocumentPage.module.scss";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Button from "@/components/Elements/Button/Button";

const Header = ({ document, collectionData }) => {
  const editDocumentHandler = (id) => {
    console.log("editing " + id);
  };

  const deleteDocumentHandler = (id) => {
    console.log("deleting " + id);
  };

  return (
    <div className={classes.Header}>
      <div className={classes.HeaderIcon}>{collectionData.icon}</div>
      <div className={classes.HeaderTitle}>
        <h1 className="header header-section">{document.name}</h1>
        <p className="paragraph">{document._id}</p>
      </div>
      <div className={classes.HeaderActions}>
        <Button
          className={classes.HeaderButton}
          styleName="glass"
          variantName="white"
          onClick={() => editDocumentHandler(document._id)}
        >
          <EditRoundedIcon fontSize="inherit" />
        </Button>
        <Button
          className={classes.HeaderButton}
          styleName="glass"
          variantName="red"
          onClick={() => deleteDocumentHandler(document._id)}
        >
          <DeleteRoundedIcon fontSize="inherit" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
