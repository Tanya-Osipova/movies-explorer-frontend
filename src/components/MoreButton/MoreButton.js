import React from 'react';
import './MoreButton.css';

const MoreButton = ({ type, children, onClick }) => {
  return (
    <button 
      className="more-button" 
      type={type} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MoreButton;