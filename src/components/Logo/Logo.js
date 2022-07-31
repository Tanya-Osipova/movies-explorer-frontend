import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logos/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <div>
      <Link to="/">
        <img 
          className="logo" 
          src={logo} 
          alt="logo" 
        />
      </Link>
    </div>
  );
}

export default Logo;