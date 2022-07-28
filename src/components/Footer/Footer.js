import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Educational project Yandex.Practicum х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright">
          &copy; <span>{new Date().getFullYear()}</span>
        </p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link 
              className="footer__link" 
              to={{ pathname: "https://practicum.yandex.ru" }}
              target='_blank'
            >
              Yandex.Practicum
            </Link>
          </li>
          <li className="footer__item">
            <Link 
              className="footer__link" 
              to={{ pathname: "https://github.com/Tanya-Osipova" }}
              target='_blank'
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;