import React from 'react';

import './Button.css';

const Button = ({ label, toNextScreen }) => {
  return (
    <div className="btn-container">
      <button type="button" className="btn btn-primary" onClick={toNextScreen}>
        {label}
      </button>
    </div>
  );
};

export default Button;
