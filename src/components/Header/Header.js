import React, {useState} from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  const [header, setHeader] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  window.addEventListener('scroll', changeBackground)

  return (
    <div className={header ? 'header header_active' : 'header'}>
      <Navigation />
    </div>
  );
}

export default Header;