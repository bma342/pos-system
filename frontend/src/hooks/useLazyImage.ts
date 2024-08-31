import { useState, useEffect } from 'react';

export const useLazyImage = (src: string, placeholder: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return imageSrc;
};
