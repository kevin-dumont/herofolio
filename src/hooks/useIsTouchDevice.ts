import { useEffect, useState } from 'react';

const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in document.documentElement) {
      setIsTouchDevice(true);
    }
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;
