import React from "react";
import ContentManager from "./ContentManager";

const ContentCols = ({ style, contents }) => {
  return (
    <div className="cols" style={style}>
      {contents.map((content, i) => (
        <ContentManager key={i} {...content} />
      ))}
    </div>
  );
};

export default ContentCols;
