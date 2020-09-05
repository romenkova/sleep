import { useEffect, useState } from 'react';

/**
 * Subscribes on window width and height change
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
