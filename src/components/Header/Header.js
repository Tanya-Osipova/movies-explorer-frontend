import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  const [fixedHeader, setFixedHeader] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 100) {
        setFixedHeader(true);
      } else {
        setFixedHeader(false);
      }
    });
  }, []);

  return (
    <header className={fixedHeader ? 'header header_active' : 'header'}>
      <Navigation />
    </header>
  );
}

export default Header;