import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import data from '../../data';
import './MoviesCardList.css'

function MoviesCardList(props) {
  const cards = data.map(card => {
    return (
      <MoviesCard
        key={card.id}
        {...card}
      />
    )
  })

  return (
    <ul className="movies-card-list">
      {cards}
    </ul>
  );
}

export default MoviesCardList;
