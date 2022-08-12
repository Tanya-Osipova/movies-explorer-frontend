import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({ card }) {
  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <div>
          <h2 className="movies-card__title">{card.nameEN}</h2>
          <p className="movies-card__duration">{card.duration}</p>
        </div>
        <button 
          className="movies-card__save-button"
          type='button'
        >
        </button>
      </div>
      <Link 
        className="movies-card__link"
        to={{ pathname: card.trailerLink }}
        target="_blank"
      >
        <img 
          className="movies-card__image" 
          src={`https://api.nomoreparties.co/${card.image.url}`} 
          alt={card.nameEN} 
        />
      </Link>
    </li>
  );
}

export default MoviesCard;
