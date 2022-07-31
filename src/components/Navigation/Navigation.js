import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__content">
        <Logo />
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link className="navigation__link" to="/signup">
              Sign up
            </Link>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link navigation__link_background" to="/signin">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;