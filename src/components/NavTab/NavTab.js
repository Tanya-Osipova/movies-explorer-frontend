import React from 'react';
import { Link } from 'react-scroll';

import './NavTab.css'

function NavTab() {
  return (
    <ul className="navtab">
      <li className="navtab__item">
        <Link 
          to="about-project" 
          className="navtab__link" 
          spy={true} 
          smooth={true}
          offset={50} 
          duration={500}
        >
          About Project
        </Link>
      </li>
      <li className="navtab__item">
        <Link to="techs" 
          className="navtab__link" 
          spy={true} 
          smooth={true}
          offset={50} 
          duration={600}
        >
          Technologies
        </Link>
      </li>
      <li className="navtab__item">
        <Link to="about-me" 
          className="navtab__link" 
          spy={true} 
          smooth={true}
          offset={50} 
          duration={700}
        >
          Student
        </Link>
      </li>
    </ul>
  );
}

export default NavTab;
