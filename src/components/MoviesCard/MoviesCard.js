import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard(props) {
  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <div>
          <h2 className="movies-card__title">{props.nameEN}</h2>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        <button className="movies-card__save-button"></button>
      </div>
      <Link 
        className="movies-card__link"
        to={{ pathname: props.trailerLink }}
        target="_blank"
      >
        <img 
          className="movies-card__image" 
          // src={`https://api.nomoreparties.co/beatfilm-movies${props.image.url}`} 
          src={props.image.url} 
          alt={props.nameEN} 
        />
      </Link>
    </li>
  );
}

export default MoviesCard;
