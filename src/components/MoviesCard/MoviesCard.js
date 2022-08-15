import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSemiPersistentState from '../../hooks/useSemiPersistentState';
import './MoviesCard.css'

function MoviesCard({ card, onClick, ...props }) {
  const [savedMovies, setSavedMovies] = useSemiPersistentState('savedMovies',[])
//useeffect?
// LEFT side checks all movies, right is true for saved-movies
  const isSaved = savedMovies.some(movie => movie.movieId === card.id ) || card.movieId // only saved cards have movieId

  const handleClick = (savedCard) => {
    onClick(savedCard)
  };

  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <div>
          <h2 className="movies-card__title">{card.nameEN}</h2>
          <p className="movies-card__duration">{card.duration}</p>
        </div>
        <button 
          className={`movies-card__save-button${isSaved ? props.icon : ""}`}
          type='button'
          onClick={() => handleClick(card)}
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
          src={card.id ? `https://api.nomoreparties.co/${card.image.url}` : `${card.image}`} 
          alt={card.nameEN} 
        />
      </Link>
    </li>
  );
}

export default MoviesCard;
