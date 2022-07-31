import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

const TopButton = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });
  }, []);

  const handleToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button 
      className={showTopButton ? 'top-button' : ''}
      onClick={handleToTopButton}
    >
      top
    </button> 
  );
}

export default TopButton;