import "katex/dist/katex.min.css";

import React from "react";
import classes from "./ContentManager.module.scss";
import { join } from "@/utils/helper";

import Latex from "react-latex-next";
import ContentImage from "./Elements/ContentImage";
import ContentList from "./Elements/ContentList";
import ContentVideo from "./Elements/ContentVideo";
import ContentParagraph from "./Elements/ContentParagraph";
import ContentCols from "./Elements/ContentCols";
import ContentRows from "./Elements/ContentRows";
import ContentTable from "./Elements/ContentTable";

const ContentManager = ({ type, content, contents, rows, style, url, isChild, gridTemplateColumns }) => {
  const Tag = type;

  const loopTypes = ["ul", "ol"];
  if (loopTypes.includes(type)) {
    return <ContentList Tag={Tag} style={style} content={content} contents={contents} isChild={isChild} />;
  } else if (type === "image") {
    return <ContentImage src={url} style={style} content={content} />;
  } else if (type === "video") {
    return <ContentVideo src={url} style={style} content={content} />;
  } else if (type === "latex") {
    return <ContentParagraph style={style} content={content} />;
  } else if (type === "cols") {
    return <ContentCols style={style} contents={contents} />;
  } else if (type === "rows") {
    return <ContentRows style={style} contents={contents} />;
  } else if (type === "table") {
    return <ContentTable style={style} content={content} rows={rows} gridTemplateColumns={gridTemplateColumns} />;
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

const Wrapper = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.ContentManager)} {...otherProps}>
      {children}
    </div>
  );
};

ContentManager.Wrapper = Wrapper;
export default ContentManager;

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
