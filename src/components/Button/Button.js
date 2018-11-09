import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ label, disabled = false, callback }) => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary" onClick={callback} disabled={disabled}>
        {label}
      </button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};

export default Button;
