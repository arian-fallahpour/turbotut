import React from "react";
import ContentManager from "../ContentManager";

const ContentList = ({ Tag, content, contents, style, isChild }) => {
  return (
    <>
      {isChild && content}
      <Tag style={style}>
        {contents.map((content, i) => (
          <li key={i}>
            <ContentManager {...content} isChild />
          </li>
        ))}
      </Tag>
    </>
  );
};

export default ContentList;
