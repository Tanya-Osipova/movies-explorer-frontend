import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ type = 'submit', children }) => {
  return (
    <button className="submit-button" type={type}>
      {children}
    </button>
  );
}

export default SubmitButton;