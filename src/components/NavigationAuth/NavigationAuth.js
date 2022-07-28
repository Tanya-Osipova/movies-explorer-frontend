import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './NavigationAuth.css';

function NavigationAuth() {
  const [sidebarActive, setSidebarActive] = useState(false);
  
  return (
    <nav className="navigation-auth">
      <div className={sidebarActive ? "navigation-auth__overlay navigation-auth__overlay_active" : "navigation-auth__overlay"}></div>
      <div className="navigation-auth__content">
        <Logo />
        <button 
          className={sidebarActive ? "navigation-auth__hamburger navigation-auth__hamburger_active" : "navigation-auth__hamburger"}
          onClick={() => setSidebarActive(!sidebarActive)}
        >
        </button>
        <ul className={sidebarActive ? 'navigation-auth__list navigation-auth__list_active' : 'navigation-auth__list' }>
          <li className="navigation-auth__item navigation-auth__item_homepage">
            <Link 
              to="/" 
              className="navigation-auth__link" 
              onClick={() => setSidebarActive(!sidebarActive)}
            >
              Homepage
            </Link>
          </li>
          <li className="navigation-auth__item">
            <NavLink 
              to="/movies"
              className="navigation-auth__link" 
              activeClassName="navigation-auth__link_active"
              onClick={() => setSidebarActive(!sidebarActive)}
            >
              Movies
            </NavLink>
          </li>
          <li className="navigation-auth__item">
            <NavLink 
              to="/saved-movies"
              className="navigation-auth__link" 
              activeClassName="navigation-auth__link_active"
              onClick={() => setSidebarActive(!sidebarActive)}
            >
              Saved Movies
            </NavLink>
          </li>
          <li className="navigation-auth__item navigation-auth__item_account">
            <NavLink 
              to="/profile"
              className="navigation-auth__link" 
              activeClassName="navigation-auth__link_active"
              onClick={() => setSidebarActive(!sidebarActive)}
            >
              Account
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationAuth;