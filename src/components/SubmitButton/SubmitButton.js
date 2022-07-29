import React from 'react';
import './SubmitButton.css';


const SubmitButton = ({ type = 'submit', children, onClick }) => {
  return (
    <button 
      className='submit-button' 
      type={type} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitButton;