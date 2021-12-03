import { useState, useEffect } from 'react';

const getWitdh = () =>
  typeof window === 'undefined' ? 320 : window?.innerWidth;

const getHeight = () =>
  typeof window === 'undefined' ? 320 : window?.innerHeight;

const useSizes = () => {
  const [height, setHeight] = useState(getHeight);
  const [width, setWidth] = useState(getWitdh);

  const onResize = () => {
    setHeight(window?.innerHeight);
    setWidth(window?.innerWidth);
  };

  useEffect(() => {
    window?.addEventListener('resize', onResize);

    if ('onorientationchange' in window) {
      window?.addEventListener('orientationchange', onResize);
    }

    return () => {
      window?.removeEventListener('resize', onResize);

      if ('onorientationchange' in window) {
        window?.removeEventListener('orientationchange', onResize);
      }
    };
  }, []);

  return {
    height,
    width,
  };
};

export default useSizes;
