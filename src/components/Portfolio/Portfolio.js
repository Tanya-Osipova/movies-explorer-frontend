import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">
        Portfolio
      </h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link
            className="portfolio__link" 
            to={{ pathname: "https://tanya-osipova.github.io/my-project-russian-travel/index.html" }}
            target="_blank"
          >
            Static site
          </Link>
        </li>
        <li className="portfolio__item">
          <Link 
            className="portfolio__link" 
            to={{ pathname: "https://tanya-osipova.github.io/my-project-russian-travel/index.html" }}
            target="_blank"
          >
            Responsive site
          </Link>
        </li>
        <li className="portfolio__item">
          <Link 
            className="portfolio__link" 
            to={{ pathname: "https://tanya-osipova.github.io/my-project-russian-travel/index.html" }}
            target="_blank"
          >
            Single page application
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
