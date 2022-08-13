import React from 'react';
import './Button.css';

const Button = ({ type = 'button', className, onClick, children }) => (
  <button
    // className='button'
    className={className}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;