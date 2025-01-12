import "katex/dist/katex.min.css";

import React from "react";
import classes from "./ContentManager.module.scss";
import Latex from "react-latex-next";
import { join } from "@/utils/helper";
import ContentImage from "./ContentImage";
import ContentList from "./ContentList";
import ContentVideo from "./ContentVideo";
import ContentParagraph from "./ContentParagraph";

const ContentManager = ({ type, content, contents, rows, style, url, isChild, gridTemplateColumns }) => {
  const Tag = type;

  const loopTypes = ["ul", "ol"];
  if (loopTypes.includes(type)) {
    return <ContentList Tag={Tag} style={style} content={content} contents={contents} />;
  } else if (type === "image") {
    return <ContentImage src={url} style={style} content={content} />;
  } else if (type === "video") {
    return <ContentVideo src={url} style={style} content={content} />;
  } else if (type === "latex") {
    return <ContentParagraph style={style} content={content} />;
  } else if (type === "cols") {
    return (
      <div className="cols" style={style}>
        {contents.map((content, i) => (
          <ContentManager key={i} {...content} />
        ))}
      </div>
    );
  } else if (type === "rows") {
    return (
      <div className="rows" style={style}>
        {contents.map((content, i) => (
          <ContentManager key={i} {...content} />
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
              className={join("table-row", !!row.header ? "table-header" : null)}
              style={{ ...row.style, gridTemplateColumns }}
            >
              {row.cells.map((col, j) => (
                <td key={j} className={"table-cell"} style={col.style}>
                  {!col.content && <span>&nbsp;</span>}
                  {!!col.content && <ContentManager {...col} />}
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

export default ContentManager;

// const Wrapper = ({ className, children, ...otherProps }) => {
//   return (
//     <div className={join(className, classes.ContentManager)} {...otherProps}>
//       {children}
//     </div>
//   );
// };

export function format(string) {
  string = replaceBold(string);
  string = replaceLink(string);

  return string;
}

function replaceBold(string) {
  return string.replace(/\*\*(.+?)\*\*(?!\*)/g, "<b>$1</b>");
}

function replaceLink(inputString) {
  return inputString.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, `<a href="$2">$1</a>`);
}

// TODO: review type col to check if they are big enough
