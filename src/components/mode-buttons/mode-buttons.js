import React from 'react';
import PropTypes from 'prop-types';

import './mode-buttons.scss';

ModeButtons.propTypes = {
  value: PropTypes.oneOf(['sleep', 'wake', '']),
  onChange: PropTypes.func.isRequired
};

ModeButtons.defaultProps = {
  value: ''
};

export default function ModeButtons({ value, onChange }) {
  return (
    <div className="buttons">
      <button
        className={`button ${value === 'sleep' ? 'button_active' : ''}`}
        onClick={() => onChange('sleep')}
        type="button"
      >
        fall asleep
      </button>
      <button
        className={`button ${value === 'wake' ? 'button_active' : ''}`}
        onClick={() => onChange('wake')}
        type="button"
      >
        wake up
      </button>
    </div>
  );
}
