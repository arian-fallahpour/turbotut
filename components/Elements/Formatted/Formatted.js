"use client";

import "katex/dist/katex.min.css";

import React, { useEffect } from "react";
import classes from "./Formatted.module.scss";
import Latex from "react-latex-next";
import Image from "next/image";
import { join } from "@/utils/helper";

const Formatted = ({
  type,
  content,
  contents,
  rows,
  style,
  url,
  isChild,
  gridTemplateColumns,
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
  } else if (type === "image") {
    return (
      <figure style={style}>
        <Image
          src={url}
          width={1280}
          height={720}
          alt={content ? content : "No description"}
        />
        {content && (
          <figcaption>
            <Latex>{format(content)}</Latex>
          </figcaption>
        )}
      </figure>
    );
  } else if (type === "video") {
    return (
      <div className="video">
        <video
          width={1280}
          height={720}
          style={style}
          autoPlay
          muted
          loop
          controls
        >
          <source src={url} type="video/mp4" />
        </video>
        {content && (
          <figcaption>
            <Latex>{format(content)}</Latex>
          </figcaption>
        )}
      </div>
    );
  } else if (type === "latex") {
    return (
      <p className="latex" style={style}>
        <Latex>{format(content)}</Latex>
      </p>
    );
  } else if (type === "cols") {
    return (
      <div className="cols" style={style}>
        {contents.map((content, i) => (
          <div key={i} className="col">
            <Formatted {...content} />
          </div>
        ))}
      </div>
    );
  } else if (type === "table") {
    return (
      <table className="table" style={style}>
        <tbody className="table-content">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={join(
                "table-row",
                !!row.header ? "table-header" : null
              )}
              style={{ ...row.style, gridTemplateColumns }}
            >
              {row.cells.map((col, j) => (
                <td key={j} className={"table-cell"} style={col.style}>
                  {!col.content && <span>&nbsp;</span>}
                  {!!col.content && <Formatted {...col} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {content && (
          <tbody style={{ display: "grid", justifyContent: "center" }}>
            <tr>
              <td>
                <p>
                  <Latex>{format(content)}</Latex>
                </p>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    );
  } else if (type === "br") {
    return <br />;
  } else {
    return (
      <Tag style={style}>
        <Latex>{format(content)}</Latex>
      </Tag>
    );
  }
};

export default Formatted;

// TODO: add edit mode

export const FormattedContent = ({ children, ...otherProps }) => {
  useEffect(() => {
    // const content = document.getElementById("lecture-section");
    // window.scrollTo({
    //   top: content.getBoundingClientRect().top + window.scrollY,
    //   behavior: "instant",
    // });
  });
  return (
    <div className={classes.Formatted} {...otherProps}>
      {children}
    </div>
  );
};

function format(string) {
  const html = string.replace(/\*\*(.+?)\*\*(?!\*)/g, "<b>$1</b>");
  return html;
}
