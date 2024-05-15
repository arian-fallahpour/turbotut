"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";

const FormattedImage = ({ src, ...otherProps }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const setImageSize = async () => {
      const img = await getImageRef(src);
      setSize({ width: img?.width || 0, height: img?.height || 0 });
    };

    setImageSize();
  });

  return (
    <NextImage
      {...otherProps}
      alt={otherProps.alt}
      src={src}
      width={size.width}
      height={size.height}
    />
  );
};

function getImageRef(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}

export default FormattedImage;
