import React from 'react';

import './Button.css';

const Button = ({ label, disabled, callback }) => {
  return (
    <div className="btn-container">
      <button
        type="button"
        className="btn btn-primary"
        onClick={callback}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
