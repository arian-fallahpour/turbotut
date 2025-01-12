import Image from "next/image";
import React from "react";
import Latex from "react-latex-next";
import { format } from "../ContentManager";

const ContentImage = ({ src, style, content }) => {
  return (
    <figure>
      <Image src={src} width={1280} height={720} style={style} alt={content ? content : "No description"} />
      {content && (
        <figcaption>
          <Latex>{format(content)}</Latex>
        </figcaption>
      )}
    </figure>
  );
};

export default ContentImage;
