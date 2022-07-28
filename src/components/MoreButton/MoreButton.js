import React from 'react';
import './MoreButton.css';

const MoreButton = ({ type, children }) => {
  return (
    <button className="more-button" type={type}>
      {children}
    </button>
  );
}

export default MoreButton;