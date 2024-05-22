import "katex/dist/katex.min.css";

import React from "react";
import classes from "./Formatted.module.scss";
import Latex from "react-latex-next";
import Image from "next/image";

const Formatted = ({ type, content, contents, style, url, isChild }) => {
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
  } else if (type === "image") {
    return (
      <figure style={style}>
        <Image alt={content} src={url} width={1280} height={720} />
        {content && <figcaption>{content}</figcaption>}
      </figure>
    );
  } else if (type === "video") {
    return (
      <div className="video">
        <video width={1280} height={720} autoPlay muted loop>
          <source src={url} type="video/mp4" />
        </video>
      </div>
    );
  } else if (type === "latex") {
    return (
      <p className="latex">
        <Latex>{content}</Latex>
      </p>
    );
  } else if (type === "test") {
    return (
      <div>
        <Latex>
          $3^{9} = {Math.pow(3, 9)}$
        </Latex>
      </div>
    );
  } else {
    return (
      <Tag style={style}>
        <Latex>{content}</Latex>
      </Tag>
    );
  }
};

export default Formatted;

// TODO: add edit mode

export const FormattedContent = ({ children, ...otherProps }) => {
  return (
    <div className={classes.Formatted} {...otherProps}>
      {children}
    </div>
  );
};

function format(string) {}
