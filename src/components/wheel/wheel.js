import React from 'react';
import PropTypes from 'prop-types';
import useSegmentMarkup from './use-segment-markup';
import useWheelColor from './use-wheel-color';

import './wheel.scss';

Wheel.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  diffTime: PropTypes.number,
  diffTimeFormatted: PropTypes.string
};

Wheel.defaultProps = {
  start: 0,
  end: 0,
  diffTime: 0,
  diffTimeFormatted: ''
};

export default function Wheel({ start, end, diffTime, diffTimeFormatted }) {
  const segmentMarkup = useSegmentMarkup({
    x: 18,
    y: 18,
    radius: 17,
    startAngle: start,
    endAngle: end
  });

  const wheelColor = useWheelColor(diffTime);

  return (
    <div className="wheel">
      <svg viewBox="0 0 36 36" width={300}>
        <circle fill="#22272b" cx="18" cy="18" r="17" />
        <path className="wheel__segment" fill={wheelColor} d={segmentMarkup} />
        <circle fill="#32373c" cx="18" cy="18" r="14" />
        <circle fill="none" cx="18" cy="18" r="25" stroke="#32373c" strokeWidth="16" />
      </svg>
      <img className="wheel__clock-face" src="./assets/clock.svg" alt="Clock face" />
      <div className="wheel__diff-hours">{diffTimeFormatted}</div>
    </div>
  );
}
