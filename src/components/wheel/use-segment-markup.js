import { useState, useEffect } from 'react';

/**
 * Creates svg d parameter with segmented circle
 */
export default function useSegmentMarkup({ x, y, radius, startAngle, endAngle }) {
  const [segment, setSegment] = useState('');

  useEffect(() => {
    const calculatedSegment = createDParam(x, y, radius, startAngle, endAngle);
    setSegment(calculatedSegment);
  }, [x, y, radius, startAngle, endAngle]);

  return segment;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function createDParam(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  return `M ${start.x} ${start.y}
          A ${radius} ${radius} 0 1 0 ${end.x} ${end.y}
          L ${x} ${y} 
          L ${start.x} ${start.y}`;
}
