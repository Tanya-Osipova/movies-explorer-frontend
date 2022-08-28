import React from 'react';
import './Button.css';

const Button = ({ type = 'button', className, onClick, children, ...props }) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default Button;