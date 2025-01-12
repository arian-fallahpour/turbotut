import React from "react";
import ContentManager from "../ContentManager";

const ContentRows = ({ style, contents }) => {
  return (
    <div className="rows" style={style}>
      {contents.map((content, i) => (
        <ContentManager key={i} {...content} />
      ))}
    </div>
  );
};

export default ContentRows;
