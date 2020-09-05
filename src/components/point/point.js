import React from 'react';
import { useDrag } from 'react-use-gesture';
import PropTypes from 'prop-types';

import './point.scss';

Point.propTypes = {
  value: PropTypes.number,
  step: PropTypes.number,
  stepOffset: PropTypes.number,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  active: PropTypes.bool,
  children: PropTypes.element.isRequired,
  setIsPressed: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

Point.defaultProps = {
  value: 0,
  step: 0,
  stepOffset: 0,
  xOffset: 0,
  yOffset: 0,
  active: false
};

const circleRadius = 300;
const pointRadius = 30;

export default function Point({
  value,
  step,
  stepOffset,
  xOffset,
  yOffset,
  active,
  setIsPressed,
  children,
  onChange
}) {
  const bind = useDrag(({ down, xy: [xVal, yVal] }) => {
    // Tell a parent that the current point is moving
    setIsPressed(down);

    // If the current point is not down, skip calculations
    if (!down) return;

    // Get coordinates
    const x = xVal - xOffset - (circleRadius / 2 + pointRadius / 2);
    const y = -(yVal - yOffset - (circleRadius / 2 + pointRadius / 2));

    // Get angle from coordinates
    const angle = -(Math.atan2(y, x) * 180) / Math.PI + 180 - 90;
    // There are no negative values on the clock face,
    // so we need to make them normalized
    const normalizedAngle = angle < 0 ? angle + 360 : angle;

    // If the current point is active, it moves smoothly.
    // If not, it moves by step.
    if (active) {
      onChange(normalizedAngle);
      return;
    }

    // The difference in degrees between step and real value
    const diff = Math.abs(normalizedAngle % step);

    // If there is no difference between real value and step,
    // move point to the next step
    if (diff === 0) {
      onChange(normalizedAngle + stepOffset);
      return;
    }

    // Define if the step is as small that we move point to minimal step value
    const toMin = diff < step / 2;

    // Move point on previous or next step value
    onChange(
      toMin ? normalizedAngle - diff - stepOffset : normalizedAngle - diff + step - stepOffset
    );
  });

  return (
    <div
      className={`start-dot ${active ? 'start-dot_active' : ''}`}
      // It's a usage example from documentation of react-use-gesture
      // performance is better with spreading
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      style={{
        transformOrigin: `25px 160px`,
        transform: `rotate(${value}deg)`
      }}
    >
      {children}
    </div>
  );
}
