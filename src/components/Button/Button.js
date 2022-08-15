import React from 'react';
import './Button.css';

const Button = ({ type = 'button', className, onClick, children, ...props }) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;