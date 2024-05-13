"use client";

import "katex/dist/katex.min.css";

import React from "react";
import classes from "./Formatted.module.scss";
import Latex from "react-latex-next";
import Image from "next/image";

const Formatted = ({
  type,
  content,
  contents,
  style,
  isCourseImage,
  filename,
  isChild,
}) => {
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
        <div>
          <Image
            alt={content}
            src={`/images/${
              isCourseImage ? "courses" : "lectures"
            }/${filename}`}
            fill
          />
        </div>
        {content && <figcaption>{content}</figcaption>}
      </figure>
    );
  } else if (type === "video") {
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
