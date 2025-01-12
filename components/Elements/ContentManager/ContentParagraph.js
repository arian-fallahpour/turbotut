import React from "react";
import Latex from "react-latex-next";
import { format } from "./ContentManager";

const ContentParagraph = ({ style, content }) => {
  return (
    <p className="latex" style={style}>
      <Latex>{format(content)}</Latex>
    </p>
  );
};

export default ContentParagraph;
