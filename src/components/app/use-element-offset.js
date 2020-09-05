import { useEffect, useState } from 'react';
import useWindowSize from './use-window-size';

/**
 * Calculates element offset from window size
 * @param {object} containerRef - ref of the element
 */
export default function useElementOffset(containerRef) {
  const { width, height } = useWindowSize();
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYoffset] = useState(0);

  useEffect(() => {
    const { x, y } = containerRef.current.getBoundingClientRect();
    setXOffset(x);
    setYoffset(y);
  }, [containerRef, width, height]);

  return { xOffset, yOffset };
}
