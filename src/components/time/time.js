import React from 'react';
import PropTypes from 'prop-types';

import './time.scss';

Time.propTypes = {
  startTime: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  }),
  endTime: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  })
};

Time.defaultProps = {
  startTime: {
    hours: '',
    minutes: ''
  },
  endTime: {
    hours: '',
    minutes: ''
  }
};

export default function Time({ startTime, endTime }) {
  return (
    <div className="time">
      <div className="time__count">
        <span className="h">{startTime.hours}</span>
        <span className="m">{startTime.minutes}</span>
      </div>
      <div className="time__count">
        <span className="h">{endTime.hours}</span>
        <span className="m">{endTime.minutes}</span>
      </div>
    </div>
  );
}
