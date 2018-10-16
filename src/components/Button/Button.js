import React from 'react';

import './Button.css';

const Button = ({ label, disabled, toNextScreen }) => {
  return (
    <div className="btn-container">
      <button
        type="button"
        className="btn btn-primary"
        onClick={toNextScreen}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
