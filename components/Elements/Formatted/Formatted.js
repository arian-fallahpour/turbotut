"use client";

import "katex/dist/katex.min.css";

import React from "react";
import classes from "./Formatted.module.scss";
import Latex from "react-latex-next";
import FormattedImage from "./FormattedImage/FormattedImage";

const Formatted = ({ type, content, contents, style, filename, isChild }) => {
  const Tag = type;

  const loopTypes = ["ul", "ol"];
  if (loopTypes.includes(type)) {
    return (
      <>
        {isChild && content}
        <Tag style={style}>
          {contents.map((content, i) => (
            <li key={i}>
              <Formatted {...content} isChild />
            </li>
          ))}
        </Tag>
      </>
    );
  } else if (type === "img") {
    return (
      <figure style={style}>
        <FormattedImage alt={content} src={`/images/lectures/${filename}`} />
        {content && <figcaption>{content}</figcaption>}
      </figure>
    );
  } else if (type === "video") {
  } else if (type === "latex") {
    return (
      <p className="latex">
        <Latex displayMode>{content}</Latex>
      </p>
    );
  } else {
    return (
      <Tag style={style}>
        <Latex displayMode>{content}</Latex>
      </Tag>
    );
  }
};

export default Formatted;

export const FormattedContent = ({ children }) => {
  return <div className={classes.Formatted}>{children}</div>;
};

function format(string) {}
