import "katex/dist/katex.min.css";

import React from "react";
import Latex from "react-latex-next";
import { format } from "./ContentManager";

const ContentVideo = ({ src, style, content }) => {
  return (
    <div className="video">
      <video width={1280} height={720} style={style} autoPlay muted loop controls>
        <source src={src} type="video/mp4" />
      </video>
      {content && (
        <figcaption>
          <Latex>{format(content)}</Latex>
        </figcaption>
      )}
    </div>
  );
};

export default ContentVideo;
