import React from 'react';
import './MoviesCard.css'

function MoviesCard(props) {
  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <div>
          <h2 className="movies-card__title">{props.title}</h2>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        <button className={props.saved === 0 ? "movies-card__save-button" : "movies-card__save-button movies-card__save-button_active"}></button>
      </div>
      <img className="movies-card__image" src={props.imageUrl} alt={props.title} />
    </li>
  );
}

export default MoviesCard;
