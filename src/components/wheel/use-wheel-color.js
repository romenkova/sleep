import { useState, useEffect } from 'react';

const badColor = '#ff9b8a';
const goodColor = '#8affa4';

/**
 * Get color from the amount of hours
 */
export default function useWheelColor(hours) {
  const [color, setColor] = useState();

  useEffect(() => {
    if (hours < 7.4 || hours > 10) {
      setColor(badColor);
      return;
    }

    setColor(goodColor);
  }, [hours]);

  return color;
}
