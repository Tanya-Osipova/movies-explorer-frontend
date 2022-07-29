import React from 'react';
import './Button.css';

const Button = ({ type = 'button', onClick, children }) => (
  <button
    className='button'
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;